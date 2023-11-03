'use client';
import { useEffect, useRef } from 'react';
import style from './guessBar.module.scss';
import { useContestDetailStore } from './contestDetailStore';

function GuessBar() {
    const setCoveredType = useContestDetailStore.use.setCoveredType();
    const liveBarRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const currentRef = liveBarRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setCoveredType(entry.isIntersecting);
            },
            {
                threshold: 0.3
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [setCoveredType]);

    return (
        <div className={style.guessBar} ref={liveBarRef}>
            <div className={style.box}>
                <div className={style.team}>主</div>
                <div className={style.middle}>
                    <p className={style.lable}>半/ㄧ</p>
                    <div className={style.lineBar} />
                </div>
                <div className={style.team}>客</div>
            </div>
            <div className={style.box}>
                <div className={style.team}>主</div>
                <div className={style.middle}>
                    <p className={style.lable}>2/2.5</p>
                    <div className={style.lineBar} />
                </div>
                <div className={style.team}>客</div>
            </div>
        </div>
    );
}

export default GuessBar;
