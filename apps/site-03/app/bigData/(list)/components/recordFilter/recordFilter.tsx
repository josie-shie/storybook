import { useEffect } from 'react';
import { getFootballStatsRecord } from 'data-center';
import { mqttService } from 'lib';
import type { AnalysisResponse } from 'lib';
import SearchRecord from '../searchRecord/searchRecord';
import { useHandicapAnalysisFormStore } from '../../handicapAnalysisFormStore';
import { useDiscSelectStore } from '../../discSelectStore';
import style from './recordFilter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';
import NoData from '@/components/baseNoData/noData';

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
            if (message.memberId !== userInfo.uid) return;

            if (message.mission === 'done') {
                const record = recordList.find(item => item.ticketId === message.ticketId);
                if (record) {
                    updateRecord(record.ticketId);
                }
            } else if (message.mission === 'error') {
                setDialogContentType('system');
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
                    <NoData />
                )}
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;
