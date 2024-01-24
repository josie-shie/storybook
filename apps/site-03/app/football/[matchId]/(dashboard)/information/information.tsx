'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GetInformationResponse } from 'data-center';
import { resetSwiperHight } from 'ui/stories/slickPro/slick';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './information.module.scss';

type TeamType = 'home' | 'away' | 'neutral';

function Information({ information }: { information: GetInformationResponse }) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f3f3f3',
        color: '#8d8d8d'
    };
    const [team, setTeam] = useState<TeamType>('home');
    return (
        <div className={style.information}>
            <div className={style.tabBar}>
                <motion.div
                    animate={team === 'home' ? tabActive : tabDefault}
                    className={style.tab}
                    onAnimationComplete={() => {
                        resetSwiperHight();
                    }}
                    onClick={() => {
                        setTeam('home');
                    }}
                >
                    {matchDetail.homeChs}
                </motion.div>
                <motion.div
                    animate={team === 'neutral' ? tabActive : tabDefault}
                    className={style.tab}
                    onAnimationComplete={() => {
                        resetSwiperHight();
                    }}
                    onClick={() => {
                        setTeam('neutral');
                    }}
                >
                    中立
                </motion.div>
                <motion.div
                    animate={team === 'away' ? tabActive : tabDefault}
                    className={style.tab}
                    onAnimationComplete={() => {
                        resetSwiperHight();
                    }}
                    onClick={() => {
                        setTeam('away');
                    }}
                >
                    {matchDetail.awayChs}
                </motion.div>
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
                        <ul className={style.list}>
                            <li className={style.title}>
                                <div className={style.dot} />
                                中立情報（{information.neutral.length}）
                            </li>
                            {information.neutral.map((info, idx) => (
                                <li className={style.info} key={`neutral_${idx.toString()}`}>
                                    <div className={style.dot} />
                                    <div className={style.text}>{info.content}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <ul className={`${style.list} ${style.good}`}>
                                <li className={style.title}>
                                    <div className={style.dot} />
                                    有利情報（{information.good[team].length}）
                                </li>
                                {information.good[team].map((info, idx) => (
                                    <li className={style.info} key={`good_${idx.toString()}`}>
                                        <div className={style.dot} />
                                        <div className={style.text}>{info.content}</div>
                                    </li>
                                ))}
                            </ul>
                            <ul className={`${style.list} ${style.bed}`}>
                                <li className={style.title}>
                                    <div className={style.dot} />
                                    不利情報（{information.bad[team].length}）
                                </li>
                                {information.bad[team].map((info, idx) => (
                                    <li className={style.info} key={`bed_${idx.toString()}`}>
                                        <div className={style.dot} />
                                        <div className={style.text}>{info.content}</div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Information;
