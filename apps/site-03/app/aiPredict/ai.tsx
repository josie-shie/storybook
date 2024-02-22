import type { GetAiAnalyzeMatchResponse } from 'data-center';
import Image from 'next/image';
import style from './aiTab.module.scss';
import Star from './img/star.png';
import { useAiPredictStore } from './aiPredictStore';

interface AiProps {
    match: GetAiAnalyzeMatchResponse;
    onUnlockArticle: (matchId: number) => void;
}

function Ai({ match, onUnlockArticle }: AiProps) {
    const payLock = useAiPredictStore.use.payLock();

    return (
        <>
            {payLock ? (
                <div className={style.paidButton}>
                    <div className={style.content}>
                        <div className={style.title}>预测</div>
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
                        <div className={style.title}>预测</div>
                        <div className={style.content}>{match.predict}</div>
                    </div>
                    <div className={style.info}>
                        <div className={style.title}>总结</div>
                        <div className={style.content}>{match.summery}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Ai;
