import { useEffect } from 'react';
import { getFootballStatsRecord } from 'data-center';
import { mqttService } from 'lib';
import type { AnalysisResponse } from 'lib';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';
import NoData from '@/components/baseNoData/noData';
import SearchRecord from '../searchRecord/searchRecord';
import { useHandicapAnalysisFormStore } from '../../../formStore';
import { useDiscSelectStore } from '../../discSelectStore';
import style from './recordFilter.module.scss';

function RecordFilter({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const setRecordList = useHandicapAnalysisFormStore.use.setRecordList();
    const recordList = useHandicapAnalysisFormStore.use.recordList();
    const updateRecord = useHandicapAnalysisFormStore.use.updateRecord();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const userInfo = useUserStore.use.userInfo();
    const setDialogContentType = useDiscSelectStore.use.setDialogContentType();
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

    const fetchRecordList = async () => {
        const res = await getFootballStatsRecord({ memberId: userInfo.uid });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        setRecordList(res.data);
    };

    useEffect(() => {
        if (isOpen) {
            void fetchRecordList();
        }
    }, [isOpen]);

    // 監聽MQTT是否推送已經有處理完成的分析結果
    useEffect(() => {
        const syncAnalysisStore = (message: Partial<AnalysisResponse>) => {
            const currentRecordList = useHandicapAnalysisFormStore.getState().recordList;
            // eslint-disable-next-line no-console -- MQTT response
            console.dir(message);
            if (message.memberId !== userInfo.uid) return;

            const currentRecord = currentRecordList.find(
                item => item.ticketId === message.ticketId
            );

            if (message.mission === 'done') {
                if (currentRecord) {
                    updateRecord(currentRecord.ticketId, message.mission);
                }
            } else if (message.mission === 'error') {
                let dialogType = 'system';
                switch (message.message) {
                    case '0':
                        dialogType = 'system'; // 系統錯誤
                        break;
                    case '1':
                        dialogType = 'parameter'; // 參數錯誤
                        break;
                    case '2':
                        dialogType = 'empty'; //沒有資料
                        break;
                    case '3':
                        dialogType = 'balance'; // 餘額不足
                        break;
                    default:
                        break;
                }
                setDialogContentType(dialogType);
                setOpenNormalDialog(true);
            }
        };

        mqttService.getAnalysis(syncAnalysisStore);
    }, []);

    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.recordFilter}>
                {recordList.length ? (
                    recordList.map((record, idx) => {
                        return (
                            <SearchRecord
                                index={recordList.length - idx}
                                key={record.ticketId + idx.toString()}
                                recordData={record}
                            />
                        );
                    })
                ) : (
                    <NoData text="暂无资料" />
                )}
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;
