import { useEffect, useState, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getPostList } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import PredictCard from './predictCard';
import { usePredictStore } from './predictStore';
import style from './predict.module.scss';

function LastPlaceHolder({ matchId }: { matchId: number }) {
    const pageCount = usePredictStore.use.pageCount();
    const pushPredictList = usePredictStore.use.pushPredictList();
    const [lastCoveredType, setLastCoveredType] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLast, setIsLast] = useState<boolean>(false);
    const [nowPage, setNowPage] = useState<number>(1);
    const lastPredictRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentRef = lastPredictRef.current;
        const observer = new IntersectionObserver(([entry]) => {
            setLastCoveredType(entry.isIntersecting);
        });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [setLastCoveredType]);

    useEffect(() => {
        void handlePagination();
        return () => {
            setIsLast(false);
        };
    }, [lastCoveredType]);

    const handlePagination = async () => {
        if (isLoading || !lastCoveredType) {
            return;
        } else if (pageCount <= nowPage) {
            setIsLast(true);
            return;
        }

        setIsLoading(true);
        setNowPage(page => page + 1);

        const predictData = await getPostList({
            memberId: 1,
            filterId: [matchId],
            postFilter: ['match'],
            pagination: {
                currentPage: nowPage + 1,
                perPage: 10
            }
        });

        if (predictData.success) {
            pushPredictList(predictData.data.posts);
            if (pageCount <= nowPage) {
                setIsLast(true);
            }
        }

        setIsLoading(false);
    };

    return (
        <div className={style.isLast} ref={lastPredictRef}>
            {isLast ? '已滑到底啰' : null}
            {isLoading ? <CircularProgress size={24} /> : null}
        </div>
    );
}

function PredictList({ matchId }: { matchId: number }) {
    const predictList = usePredictStore.use.predictList();

    return (
        <>
            {predictList.length > 0 ? (
                <div className={style.predictList}>
                    {predictList.map(predict => {
                        return (
                            <PredictCard
                                key={`${predict.id}_${predict.mentorId}`}
                                predictInfo={predict}
                            />
                        );
                    })}
                    <LastPlaceHolder matchId={matchId} />
                </div>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default PredictList;
