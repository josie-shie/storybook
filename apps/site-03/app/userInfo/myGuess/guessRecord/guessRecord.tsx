import { useEffect, useState } from 'react';
import { getMemberGuessViewingRecords } from 'data-center';
import { InfiniteScroll } from 'ui';
import { CircularProgress } from '@mui/material';
import NoData from '@/components/baseNoData/noData';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import Loading from '@/components/loading/loading';
import { useMyGuessStore } from '../myGuessStore';
import RecordCard from '../components/recordCard/recordCard';
import style from './guessRecord.module.scss';

interface ContentProps {
    setPage: (arg: number) => void;
    page: number;
}

function RecordContent({ setPage, page }: ContentProps) {
    const guessRecordList = useMyGuessStore.use.myGuess().guessRecordList.recordList;
    const pagination = useMyGuessStore.use.myGuess().guessRecordList.pagination;
    const setGuessRecordList = useMyGuessStore.use.setGuessRecordList();

    const loadMoreList = async () => {
        const records = await getMemberGuessViewingRecords({
            currentPage: page + 1,
            pageSize: 20
        });
        if (records.success) {
            setPage(page + 1);
            setGuessRecordList({
                recordList: guessRecordList.concat(records.data.memberGuessViewingRecordList),
                pagination
            });
        }
    };

    return (
        <div className={style.guessRecord}>
            <div className={style.title}>
                <span>竞猜浏览纪录</span>
            </div>
            {guessRecordList.length > 0 ? (
                <>
                    {guessRecordList.map(item => (
                        <RecordCard key={item.matchId} recordItem={item} />
                    ))}
                    {guessRecordList.length < pagination.totalCount ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div className={style.listEnd}>
                            <p>以顯示全部資料</p>
                        </div>
                    )}
                </>
            ) : (
                <NoData />
            )}
        </div>
    );
}

interface GuessRecordProps {
    isOpenRecord: boolean;
    setIsOpenRecord: (arg: boolean) => void;
}

function GuessRecord({ isOpenRecord, setIsOpenRecord }: GuessRecordProps) {
    const setGuessRecordList = useMyGuessStore.use.setGuessRecordList();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchListData = async () => {
            setIsLoading(true);
            const viewingRecords = await getMemberGuessViewingRecords({
                currentPage: 1,
                pageSize: 20
            });
            if (viewingRecords.success) {
                setGuessRecordList({
                    recordList: viewingRecords.data.memberGuessViewingRecordList,
                    pagination: viewingRecords.data.pagination
                });
            }
            setIsLoading(false);
        };
        void fetchListData();
    }, [setGuessRecordList]);

    return (
        <BottomDrawer
            isOpen={isOpenRecord}
            onClose={() => {
                setIsOpenRecord(false);
            }}
            onOpen={() => {
                setIsOpenRecord(true);
            }}
        >
            {isLoading ? (
                <div className={style.loderBox}>
                    <Loading />
                </div>
            ) : (
                <RecordContent page={page} setPage={setPage} />
            )}
        </BottomDrawer>
    );
}

export default GuessRecord;
