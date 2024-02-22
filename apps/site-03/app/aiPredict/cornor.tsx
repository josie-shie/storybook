import Image from 'next/image';
import type { GetAiAnalyzeMatchResponse } from 'data-center';
import style from './aiTab.module.scss';
import Star from './img/star.png';
import IdeaIcon from './img/idea.svg';
import { useAiPredictStore } from './aiPredictStore';

interface CornorProps {
    match: GetAiAnalyzeMatchResponse;
    onUnlockArticle: (matchId: number) => void;
}

function Cornor({ match, onUnlockArticle }: CornorProps) {
    const payLock = useAiPredictStore.use.payLock();
    return (
        <>
            {payLock ? (
                <div className={style.paidButton}>
                    <div className={style.content}>
                        <IdeaIcon />
                        <span>{match.homeChs}的策略</span>
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
                    <div className={style.info}>
                        <div className={style.titleLogo}>
                            <IdeaIcon />
                            <span>{match.homeChs}的策略</span>
                        </div>
                        <div className={style.content}>{match.homeTacticalPerspective}</div>
                    </div>
                    <div className={style.info}>
                        <div className={style.titleLogo}>
                            <IdeaIcon />
                            <span>{match.awayChs}的策略</span>
                        </div>
                        <div className={style.content}>{match.awayTacticalPerspective}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cornor;
