import { useEffect } from 'react';
import { getFootballStatsRecord } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';
import NoData from '@/components/baseNoData/noData';
import SearchRecord from '../searchRecord/searchRecord';
import { useHandicapAnalysisFormStore } from '../../../formStore';
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
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const userInfo = useUserStore.use.userInfo();

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
