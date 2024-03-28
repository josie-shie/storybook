import type { GetPredicativeAnalysisMatch } from 'data-center';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useUserStore } from '@/store/userStore';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface AnalyzeProps {
    match: GetPredicativeAnalysisMatch;
    // onUnlockArticle: (matchId: number) => void;
}

function Analyze({ match }: AnalyzeProps) {
    const isLogin = useUserStore.use.isLogin();
    // const isRead = false;
    // 還要判斷是否已讀
    const isShow = isLogin;
    return (
        <div className={style.aiTab}>
            {isShow ? (
                <>
                    <div className={style.info}>
                        <div className={style.titleLogo}>
                            <TeamLogo
                                alt={match.homeChs}
                                height={24}
                                src={match.homeLogo}
                                width={24}
                            />
                            <span>{match.homeChs}</span>
                        </div>
                        <div className={style.content}>{match.homeStrategicAnalysis}</div>
                    </div>
                    <div className={style.info}>
                        <div className={style.titleLogo}>
                            <TeamLogo
                                alt={match.awayChs}
                                height={24}
                                src={match.awayLogo}
                                width={24}
                            />
                            <span>{match.awayChs}</span>
                        </div>
                        <div className={style.content}>{match.awayStrategicAnalysis}</div>
                    </div>
                </>
            ) : (
                <div className={style.info}>
                    <div className={style.titleLogo}>
                        <TeamLogo alt={match.homeChs} height={24} src={match.homeLogo} width={24} />
                        <span>{match.homeChs}</span>
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

export default Analyze;
