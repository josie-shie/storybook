'use client';
import { Slick } from 'ui';
import { type GetContestListResponse } from 'data-center';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import LongDragonResult from './longDragonResult';
import { useLongDragonStore } from './longDragonStore';
import Football from './football';
import ArrowIcon from './img/arrow.png';
import style from './list.module.scss';
import { createContestListStore } from './contestListStore';

type Status = 'all' | 'progress' | 'schedule' | 'result';

function FixedButton({
    currentStatus,
    scrollTop
}: {
    currentStatus: Status | null;
    scrollTop: () => void;
}) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const setHandicapTips = useLongDragonStore.use.setHandicapTips();
    const setHintsSelectType = useLongDragonStore.use.setHintsSelectType();
    const showLongDragon = useLongDragonStore.use.showLongDragon();
    const setShowLongDragon = useLongDragonStore.use.setShowLongDragon();

    const handleScroll = () => {
        setShowScrollTop(window.scrollY > 600);
    };

    const isOpenLongDragon = () => {
        setShowLongDragon(true);
    };

    const closeLongDragon = () => {
        setShowLongDragon(false);
        setHandicapTips([]);
        setHintsSelectType('WIN');
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

    return (
        <>
            {(currentStatus === null || currentStatus === 'progress') && (
                <div className={`${style.scrollWrapper} ${showScrollTop ? style.active : ''}`}>
                    <div className={style.longDragon} onClick={isOpenLongDragon}>
                        <span>今日长龙</span>
                    </div>
                    <div className={style.goTop} onClick={scrollTop}>
                        <Image alt="goTop" className={style.arrow} src={ArrowIcon} />
                    </div>
                </div>
            )}

            <div className={`${style.scrollWrapper} ${showScrollTop ? style.active : ''}`}>
                <div className={style.goTop} onClick={scrollTop}>
                    <Image alt="goTop" className={style.arrow} src={ArrowIcon} />
                </div>
            </div>

            <BottomDrawer
                isOpen={showLongDragon}
                onClose={closeLongDragon}
                onOpen={() => {
                    setShowLongDragon(true);
                }}
                propsStyle={{
                    height: 'calc(100dvh - 152px)'
                }}
            >
                <LongDragonResult showLongDragon={showLongDragon} />
            </BottomDrawer>
        </>
    );
}

function List({
    todayContest,
    pinnedContest
}: {
    todayContest: GetContestListResponse;
    pinnedContest: number[];
}) {
    createContestListStore({
        ...todayContest,
        ...{ pinnedContest }
    });

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
    const allRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const scheduleRef = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [secondRender, setSecondRender] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<Status | null>(null);

    useEffect(() => {
        if (!secondRender) {
            setSecondRender(true);
        }
    }, []);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSlickEnd = (nowIndex: number) => {
        scrollTop();
        setCurrentStatus(tabList[nowIndex].status as Status);
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
                    <Football ref={allRef} status="all" />
                </div>
                <div className={style.largeGap}>
                    {secondRender ? <Football ref={progressRef} status="progress" /> : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender ? <Football ref={scheduleRef} status="schedule" /> : null}
                </div>
                <div className={`${style.largeGap} ${style.result}`}>
                    {secondRender ? <Football ref={resultRef} status="result" /> : null}
                </div>
            </Slick>
            <FixedButton currentStatus={currentStatus} scrollTop={scrollTop} />
        </>
    );
}

export default List;
