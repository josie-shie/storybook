'use client';
import { Slick } from 'ui/stories/slickPro/slick';
import { type GetContestListResponse } from 'data-center';
import { useEffect, useRef, useState } from 'react';
import Football from './football';
import style from './list.module.scss';

function List({ todayContest }: { todayContest: GetContestListResponse }) {
    const allRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const scheduleRef = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [secendRender, setSecendRender] = useState(false);

    useEffect(() => {
        setSecendRender(true);
    }, []);

    const tabList = [
        {
            label: '全部',
            status: null
        },
        {
            label: '已开赛',
            status: 'progress'
        },
        {
            label: '赛程',
            status: 'schedule'
        },
        {
            label: '完场',
            status: 'result'
        }
    ];

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
            initialSlide={0}
            onSlickEnd={onSlickEnd}
            styling="button"
            tabs={tabList}
        >
            <div className={style.largeGap}>
                <Football ref={allRef} status="all" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                {secendRender ? (
                    <Football ref={progressRef} status="progress" todayContest={todayContest} />
                ) : null}
            </div>
            <div className={style.largeGap}>
                {secendRender ? (
                    <Football ref={scheduleRef} status="schedule" todayContest={todayContest} />
                ) : null}
            </div>
            <div className={style.largeGap}>
                {secendRender ? (
                    <Football ref={resultRef} status="result" todayContest={todayContest} />
                ) : null}
            </div>
        </Slick>
    );
}

export default List;
