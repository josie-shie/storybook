'use client';
import { Slick } from 'ui/stories/slickPro/slick';
import { type GetContestListResponse } from 'data-center';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import LongDragonResult from './longDragonResult';
import { useLongDragonStore } from './longDragonStore';
import Football from './football';
import ArrowIcon from './img/arrow.png';
import style from './list.module.scss';

function List({
    todayContest,
    pinnedContest
}: {
    todayContest: GetContestListResponse;
    pinnedContest: number[];
}) {
    const allRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const scheduleRef = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [secondRender, setSecondRender] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const setHandicapTips = useLongDragonStore.use.setHandicapTips();
    const setHintsSelectType = useLongDragonStore.use.setHintsSelectType();
    const showLongDragon = useLongDragonStore.use.showLongDragon();
    const setShowLongDragon = useLongDragonStore.use.setShowLongDragon();

    useEffect(() => {
        setSecondRender(true);
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

    const [currentStatus, setCurrentStatus] = useState(tabList[0].status);

    const onSlickEnd = (nowIndex: number) => {
        scrollTop();
        setCurrentStatus(tabList[nowIndex].status);
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        setShowScrollTop(window.scrollY > 600);
    };

    useEffect(() => {
        const onScroll = () => {
            handleScroll();
        };
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const isOpenLongDragon = () => {
        setShowLongDragon(true);
    };

    const closeLongDragon = () => {
        setShowLongDragon(false);
        setHandicapTips([]);
        setHintsSelectType('WIN');
    };

    return (
        <>
            <Slick
                autoHeight
                className={style.slick}
                fixedTabs
                initialSlide={0}
                onSlickEnd={onSlickEnd}
                resetHeightKey="contestList"
                styling="button"
                tabs={tabList}
            >
                <div className={style.largeGap}>
                    <Football
                        pinnedContest={pinnedContest}
                        ref={allRef}
                        status="all"
                        todayContest={todayContest}
                    />
                </div>
                <div className={style.largeGap}>
                    {secondRender ? (
                        <Football
                            pinnedContest={pinnedContest}
                            ref={progressRef}
                            status="progress"
                            todayContest={todayContest}
                        />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender ? (
                        <Football
                            pinnedContest={pinnedContest}
                            ref={scheduleRef}
                            status="schedule"
                            todayContest={todayContest}
                        />
                    ) : null}
                </div>
                <div className={`${style.largeGap} ${style.result}`}>
                    {secondRender ? (
                        <Football
                            pinnedContest={pinnedContest}
                            ref={resultRef}
                            status="result"
                            todayContest={todayContest}
                        />
                    ) : null}
                </div>
            </Slick>
            {(currentStatus === null || currentStatus === 'progress') && (
                <div className={`${style.longDragonTop} ${showScrollTop ? style.active : ''}`}>
                    <div className={style.longDragon} onClick={isOpenLongDragon}>
                        <span>今日长龙</span>
                    </div>
                    <div className={style.goTop} onClick={scrollTop}>
                        <Image alt="goTop" className={style.arrow} src={ArrowIcon} />
                    </div>
                </div>
            )}
            <BottomDrawer
                isOpen={showLongDragon}
                onClose={closeLongDragon}
                onOpen={() => {
                    setShowLongDragon(true);
                }}
                propsStyle={{
                    height: 'calc(100dvh - 54px)'
                }}
            >
                <LongDragonResult showLongDragon={showLongDragon} />
            </BottomDrawer>
        </>
    );
}

export default List;
