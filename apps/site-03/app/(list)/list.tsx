'use client';
import { Slick } from 'ui/stories/slickPro/slick';
import { type GetContestListResponse } from 'data-center';
import { useSearchParams } from 'next/navigation';
import Football from './football';
import style from './list.module.scss';

function List({ todayContest }: { todayContest: GetContestListResponse }) {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

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

    return (
        <Slick className={style.slick} initialSlide={initialSlide} styling="button" tabs={tabList}>
            <div className={style.largeGap}>
                <Football status="all" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                <Football status="progress" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                <Football status="schedule" todayContest={todayContest} />
            </div>
            <div className={style.largeGap}>
                <Football status="result" todayContest={todayContest} />
            </div>
        </Slick>
    );
}

export default List;
