'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import ScrollTop from '@/components/scrollTop/scrollTop';
import backLeftArrowImg from '../img/backLeftArrow.png';
import GuessRecord from './guessRecord/guessRecord';
import style from './myGuess.module.scss';
import RecentPerformance from './myGuessRecentPerformance';
import MyGuessMyPlans from './myGuessMyPlans';

function MyGuess() {
    const router = useRouter();
    const scrollGuessRef = useRef<HTMLDivElement>(null);
    const [isOpenRecord, setIsOpenRecord] = useState(false);

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.push('/userInfo');
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的猜球</div>
                    </div>
                </div>
            </div>

            <div className={style.myGuess} ref={scrollGuessRef}>
                <RecentPerformance />
                <MyGuessMyPlans setIsOpenRecord={setIsOpenRecord} />
            </div>
            <GuessRecord isOpenRecord={isOpenRecord} setIsOpenRecord={setIsOpenRecord} />
            <ScrollTop hasFooter={false} scrollContainerRef={scrollGuessRef} />
        </>
    );
}

export default MyGuess;
