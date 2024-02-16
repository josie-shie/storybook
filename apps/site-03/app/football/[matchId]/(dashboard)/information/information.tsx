'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GetInformationResponse } from 'data-center';
import { slickOption } from 'ui';
import NoData from '@/components/baseNoData/noData';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './information.module.scss';

type TeamType = 'home' | 'away' | 'neutral';

function Neutral({ data }: { data: { content: string; importance: number }[] }) {
    if (data.length === 0) return <NoData text="暂无资料" />;

    return (
        <ul className={style.list}>
            <li className={style.title}>
                <div className={style.dot} />
                中立情報（{data.length}）
            </li>
            {data.map((info, idx) => (
                <li className={style.info} key={`neutral_${idx.toString()}`}>
                    <div className={style.dot} />
                    <div className={style.text}>{info.content}</div>
                </li>
            ))}
        </ul>
    );
}

function Information({ information }: { information: GetInformationResponse }) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const [informationData, setInformationData] = useState<GetInformationResponse>(information);
    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    useEffect(() => {
        setInformationData(information);
    }, [information]);

    const tabList = [
        { title: matchDetail.homeChs, value: 'home' },
        { title: '中立', value: 'neutral' },
        { title: matchDetail.awayChs, value: 'away' }
    ];

    const [team, setTeam] = useState<TeamType>('home');

    const handleResetHeight = () => {
        slickOption.contestInfoResetHeight();
    };

    return (
        <div className={style.information}>
            <div className="minTabBar">
                {tabList.map(tab => (
                    <motion.div
                        animate={team === tab.value ? tabActive : tabDefault}
                        className="tab"
                        key={tab.value}
                        onAnimationComplete={() => {
                            handleResetHeight();
                        }}
                        onClick={() => {
                            setTeam(tab.value as TeamType);
                        }}
                    >
                        {tab.title}
                    </motion.div>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={style.content}
                    exit={{ opacity: 0, y: -4 }}
                    initial={{ opacity: 0, y: 4 }}
                    key={team}
                    transition={{ duration: 0.16 }}
                >
                    {team === 'neutral' ? (
                        <Neutral data={informationData.neutral} />
                    ) : (
                        <>
                            {informationData.good[team].length === 0 &&
                            informationData.bad[team].length === 0 ? (
                                <NoData text="暂无资料" />
                            ) : (
                                <>
                                    <ul className={`${style.list} ${style.good}`}>
                                        <li className={style.title}>
                                            <div className={style.dot} />
                                            有利情報（{informationData.good[team].length}）
                                        </li>
                                        {informationData.good[team].map((info, idx) => (
                                            <li
                                                className={style.info}
                                                key={`good_${idx.toString()}`}
                                            >
                                                <div className={style.dot} />
                                                <div className={style.text}>{info.content}</div>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className={`${style.list} ${style.bed}`}>
                                        <li className={style.title}>
                                            <div className={style.dot} />
                                            不利情報（{informationData.bad[team].length}）
                                        </li>
                                        {informationData.bad[team].map((info, idx) => (
                                            <li
                                                className={style.info}
                                                key={`bed_${idx.toString()}`}
                                            >
                                                <div className={style.dot} />
                                                <div className={style.text}>{info.content}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Information;
