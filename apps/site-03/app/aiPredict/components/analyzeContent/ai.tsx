import type { GetPredicativeAnalysisMatchByIdResult } from 'data-center';
import { useUserStore } from '@/store/userStore';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface AiProps {
    match: GetPredicativeAnalysisMatchByIdResult;
    // onUnlockArticle: (matchId: number) => void;
}

function Ai({ match }: AiProps) {
    const isLogin = useUserStore.use.isLogin();
    const isShow = isLogin && match.isMemberPurchased;

    return (
        <div className={style.aiTab}>
            {isShow ? (
                <>
                    <div className={style.info}>
                        <div className={style.future}>
                            <span className={style.text}>FutureAI</span> 预测
                        </div>
                        <div className={style.content}>{match.predict}</div>
                    </div>
                    <div className={style.info}>
                        <div className={style.title}>总结</div>
                        <div className={style.content}>{match.summary}</div>
                    </div>
                </>
            ) : (
                <div className={style.info}>
                    <div className={style.future}>
                        <span className={style.text}>FutureAI</span> 预测
                    </div>
                    <div className={`${style.content} ${style.ellipsis}`}>{match.predict}</div>
                    <LockMood />
                </div>
            )}
        </div>
    );
}

export default Ai;
