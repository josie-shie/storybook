import Image from 'next/image';
import type { GetAiAnalyzeMatchResponse } from 'data-center';
import style from './aiTab.module.scss';
import Star from './img/star.png';
import TeamHomeIcom from './img/teamHome.svg';
import TeamAwayIcon from './img/teamAway.svg';
import { useAiPredictStore } from './aiPredictStore';

interface AnalyzeProps {
    match: GetAiAnalyzeMatchResponse;
    onUnlockArticle: (matchId: number) => void;
}

function Analyze({ match, onUnlockArticle }: AnalyzeProps) {
    const payLock = useAiPredictStore.use.payLock();

    return (
        <>
            {payLock ? (
                <div className={style.paidButton}>
                    <div className={style.content}>
                        <TeamHomeIcom />
                        <span>{match.homeChs}</span>
                    </div>
                    <div className={style.buttonArea}>
                        <div className={style.backDrop} />
                        <div className={style.text}>
                            Lorem ipsum dolor sit amet consectetur consect.
                        </div>
                    </div>
                    <div
                        className={style.button}
                        onClick={() => {
                            onUnlockArticle(match.matchId);
                        }}
                    >
                        <Image alt="" className={style.image} src={Star} width={14} />
                        <span className={style.text}>30 解锁本场预测</span>
                    </div>
                </div>
            ) : (
                <div className={style.aiTab}>
                    {/* <div className={style.detail}>
                    从像米克尔-阿尔特塔这样的战术思维角度来看，这场比赛对于双方来说都至关重要，特别是考虑到他们在比赛中的当前表现和排名。
                </div> */}
                    <div className={style.info}>
                        <div className={style.titleLogo}>
                            <TeamHomeIcom />
                            <span>{match.homeChs}</span>
                        </div>
                        <div className={style.content}>{match.homeStrategicAnalysis}</div>
                    </div>
                    <div className={style.info}>
                        <div className={style.titleLogo}>
                            <TeamAwayIcon />
                            <span>{match.awayChs}</span>
                        </div>
                        <div className={style.content}>{match.awayStrategicAnalysis}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Analyze;
