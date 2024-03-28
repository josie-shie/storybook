import type { GetPredicativeAnalysisMatch } from 'data-center';
import { useUserStore } from '@/store/userStore';
import IdeaIcon from '../../(list)/img/idea.svg';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface CornorProps {
    match: GetPredicativeAnalysisMatch;
    // onUnlockArticle: (matchId: number) => void;
}

function Cornor({ match }: CornorProps) {
    const isLogin = useUserStore.use.isLogin();
    // const isRead = false;
    const isShow = isLogin;
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
                        考虑到伯恩利在本赛季的出色表现以及伯恩茅斯的不稳定状态，加之比赛地将在伯恩利的主场进行
                    </div>
                    <LockMood />
                </div>
            )}
        </div>
    );
}

export default Cornor;
