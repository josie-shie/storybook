import { useEffect } from 'react';
import { getBigDataRecordList } from 'data-center';
import { mqttService } from 'lib';
import SearchRecord from '../searchRecord/searchRecord';
import { useHandicapAnalysisFormStore } from '../../handicapAnalysisFormStore';
import style from './recordFilter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';

interface AnalysisResponse {
    mission: string;
    memberId: number;
    ticket_id: number;
    handicap_side: string;
    handicap_values: string;
    overUnder_values: string;
    time_ranges: string;
}

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

    const fetchRecordList = async () => {
        const res = await getBigDataRecordList();

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
            if (message.memberId === userInfo.uid && message.mission === 'done') {
                const record = recordList.find(item => item.recordId === message.ticket_id);
                if (record) {
                    updateRecord(record.recordId);
                }
            }
        };

        mqttService.getAnalysis(syncAnalysisStore);
    }, []);

    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.recordFilter}>
                {recordList.map((record, idx) => {
                    return (
                        <SearchRecord
                            index={recordList.length - idx}
                            key={record.recordId}
                            recordData={record}
                        />
                    );
                })}
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;
