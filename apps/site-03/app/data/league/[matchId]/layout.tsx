'use client';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import headBg from './img/detailbg.png';
import backLeftArrowImg from './img/backLeftArrow.png';
import teamLogo from './img/teamLogo.png';
import down from './img/down.png';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';

function DetailLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const params = useParams();
    const matchId = params.matchId as string;

    return (
        <div className={style.layout}>
            <div className={style.header} style={{ backgroundImage: `url(${headBg.src})` }}>
                <Image
                    alt=""
                    className={style.backIcon}
                    height={24}
                    onClick={() => {
                        router.back();
                    }}
                    src={backLeftArrowImg}
                    width={24}
                />
                <div className={style.info}>
                    <section>
                        <Image alt="" src={teamLogo} width={64} />
                        斯洛文尼亚
                    </section>
                    <div className={style.select}>
                        2022-2023
                        <Image alt="" src={down} width={24} />
                    </div>
                </div>
            </div>
            <div className={style.tabsContainer}>
                <Tabs
                    labels={['積分', '賽程', '讓球', '總進球', '射手榜']}
                    paths={[
                        `/data/league/${matchId}`,
                        `/data/league/${matchId}/schedule`,
                        `/data/league/${matchId}/handicap`,
                        `/data/league/${matchId}/totalGoals`,
                        `/data/league/${matchId}/topScorers`
                    ]}
                />
            </div>
            {children}
        </div>
    );
}

export default DetailLayout;
