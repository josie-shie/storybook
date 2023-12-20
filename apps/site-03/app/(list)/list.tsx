'use client';
import { Slick } from 'ui/stories/slickPro/slick';
import { type GetContestListResponse } from 'data-center';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import Football from './football';
import style from './list.module.scss';

function List({ todayContest }: { todayContest: GetContestListResponse }) {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const allRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const scheduleRef = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const tabList = [
        {
            label: '全部',
            href: '/',
            status: null
        },
        {
            label: '已开赛',
            href: '/?status=progress',
            status: 'progress'
        },
        {
            label: '赛程',
            href: '/?status=schedule',
            status: 'schedule'
        },
        {
            label: '完场',
            href: '/?status=result',
            status: 'result'
        }
    ];
    const initialSlide = status ? tabList.findIndex(tab => tab.status === status) : 0;

    const onSlickEnd = (nowIndex, prevIndex: number) => {
        const tabRef = [allRef, progressRef, scheduleRef, resultRef];
        const currentRef = tabRef[prevIndex].current;
        if (currentRef) {
            currentRef.scrollTop = 0;
        }
    };

    return (
        <Slick
            className={style.slick}
            initialSlide={initialSlide}
            onSlickEnd={onSlickEnd}
            styling="button"
            tabs={tabList}
        >
            <div className={style.largeGap}>
                <Football ref={allRef} status="all" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                <Football ref={progressRef} status="progress" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                <Football ref={scheduleRef} status="schedule" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                <Football ref={resultRef} status="result" todayContest={todayContest} />
            </div>
        </Slick>
    );
}

export default List;
