'use client';
import type { GetPredicativeAnalysisMatch } from 'data-center';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import TeamLogo from '@/components/teamLogo/teamLogo';
import Draw from '@/public/resultIcon/bigDraw.svg';
import NoData from '@/components/baseNoData/noData';
import HomeWin from '../../(list)/img/homeWin.svg';
import AwayWin from '../../(list)/img/awayWin.svg';
import { useAiPredictStore } from '../../aiPredictStore';
import HistoryCard from '../../components/historyCard/historyCard';
import Ai from '../../components/analyzeContent/ai';
import Analyze from '../../components/analyzeContent/analyze';
import Cornor from '../../components/analyzeContent/cornor';
import style from './aiHistoryDetail.module.scss';
import Right from './img/right.svg';
import Left from './img/left.svg';
import backLeftArrowImg from './img/backLeftArrow.png';

function Header() {
    const router = useRouter();

    return (
        <div className={style.placeholder}>
            <div className={style.headerDetail}>
                <div className={style.headerTitle}>
                    <Image
                        alt=""
                        height={24}
                        onClick={() => {
                            router.back();
                        }}
                        src={backLeftArrowImg}
                        width={24}
                    />
                    <div className={style.text}>AI 历史预测</div>
                </div>
            </div>
        </div>
    );
}

function TargetMatchDetail({ target }: { target: GetPredicativeAnalysisMatch }) {
    const [activeTab, setActiveTab] = useState('ai');
    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    const tabList = [
        { title: 'AI 预测', value: 'ai' },
        { title: '战略分析', value: 'analyze' },
        { title: '战术角度', value: 'cornor' }
    ];

    const componentsMap = {
        ai: <Ai isHistory match={target} />,
        analyze: <Analyze isHistory match={target} />,
        cornor: <Cornor isHistory match={target} />
    };

    return (
        <>
            <div className={style.title}>
                <Right heigh="4px" width="28px" /> <span>AI 过往预测分析</span>{' '}
                <Left heigh="4px" width="28px" />
            </div>
            <div className={style.content}>
                <div className={style.analyze}>
                    <div className={style.teamTitle}>
                        <div
                            className={`${style.name} ${
                                [1, 0].includes(target.predictMatchResult) ? style.win : ''
                            } ${target.predictMatchResult === 0 ? style.active : ''}`}
                        >
                            {target.predictMatchResult === 1 ? (
                                <HomeWin className={style.icon} />
                            ) : null}
                            <TeamLogo
                                alt={target.homeChs}
                                height={30}
                                src={target.homeLogo}
                                width={30}
                            />
                            <span>{target.homeChs}</span>
                        </div>
                        {target.predictMatchResult === 0 ? <Draw className={style.draw} /> : null}
                        <div
                            className={`${style.name} ${
                                [2, 0].includes(target.predictMatchResult) ? style.win : ''
                            } ${target.predictMatchResult === 0 ? style.active : ''}`}
                        >
                            {target.predictMatchResult === 2 ? (
                                <AwayWin className={style.icon} />
                            ) : null}
                            <TeamLogo
                                alt={target.awayChs}
                                height={30}
                                src={target.awayLogo}
                                width={30}
                            />
                            <span>{target.awayChs}</span>
                        </div>
                    </div>
                    <div className={style.information}>
                        <div className={style.minTabBar}>
                            {tabList.map(tab => (
                                <motion.div
                                    animate={activeTab === tab.value ? tabActive : tabDefault}
                                    className={style.tab}
                                    key={tab.value}
                                    onClick={() => {
                                        setActiveTab(tab.value);
                                    }}
                                >
                                    {tab.title}
                                </motion.div>
                            ))}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                initial={{ opacity: 0, y: 4 }}
                                key={activeTab}
                                transition={{ duration: 0.16 }}
                            >
                                {componentsMap[activeTab]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}

function TargetMatch({ target }: { target: GetPredicativeAnalysisMatch }) {
    return (
        <div className={style.top}>
            <div className={style.rowBox}>
                <HistoryCard item={target} />
            </div>
        </div>
    );
}

function AiHistoryDetail({ matchId }: { matchId: number }) {
    const aiHistoryList = useAiPredictStore.use.aiHistoryList();
    const target = aiHistoryList.find(
        (item: GetPredicativeAnalysisMatch) => item.matchId === Number(matchId)
    );

    return (
        <>
            <Header />
            {target ? (
                <div className={style.detailContent}>
                    <TargetMatch target={target} />
                    <TargetMatchDetail target={target} />
                </div>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default AiHistoryDetail;
