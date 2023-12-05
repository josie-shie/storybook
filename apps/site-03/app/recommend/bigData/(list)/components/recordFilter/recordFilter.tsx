import { useEffect } from 'react';
import SearchRecord from '../searchRecord/searchRecord';
import { useDiscSelectStore } from '../../discSelectStore';
import style from './recordFilter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function RecordFilter({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const setRecordList = useDiscSelectStore.use.setRecordList();
    const recordList = useDiscSelectStore.use.recordList();

    useEffect(() => {
        setRecordList([
            {
                recordId: 1,
                recordTime: 1701771917,
                handicap: 'home',
                odds: '1',
                overUnder: '1',
                startDate: 1701771917,
                endDate: 1701771917,
                state: 0
            },
            {
                recordId: 2,
                recordTime: 1701771917,
                handicap: 'away',
                odds: '4+',
                overUnder: '1',
                startDate: 1701771917,
                endDate: 1701771917,
                state: 1
            }
        ]);
    }, [setRecordList]);

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
