import type { GetPredicativeAnalysisMatchByIdResult } from 'data-center';
import { useUserStore } from '@/store/userStore';
import IdeaIcon from '../../(list)/img/idea.svg';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface CornorProps {
    match: GetPredicativeAnalysisMatchByIdResult;
    // onUnlockArticle: (matchId: number) => void;
}

function Cornor({ match }: CornorProps) {
    const isLogin = useUserStore.use.isLogin();
    const isShow = isLogin && match.isMemberPurchased;
    return (
        <div className={style.aiTab}>
            {isShow ? (
                <>
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
                </>
            ) : (
                <div className={style.info}>
                    <div className={style.titleLogo}>
                        <IdeaIcon />
                        <span>{match.homeChs}的策略</span>
                    </div>
                    <div className={`${style.content} ${style.ellipsis}`}>
                        {match.homeTacticalPerspective}
                    </div>
                    <LockMood />
                </div>
            )}
        </div>
    );
}

export default Cornor;
