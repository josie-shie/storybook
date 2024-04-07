import type { GetPredicativeAnalysisMatchByIdResult } from 'data-center';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useUserStore } from '@/store/userStore';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface AnalyzeProps {
    match: GetPredicativeAnalysisMatchByIdResult;
    isHistory?: boolean;
    setIsOpenPayDrawer?: (isOpenPayDrawer: boolean) => void;
}

function Analyze({ match, isHistory = false, setIsOpenPayDrawer }: AnalyzeProps) {
    const isLogin = useUserStore.use.isLogin();
    const isShow = isHistory || (isLogin && match.isMemberPurchased);
    const onPay = () => {
        if (!isHistory && setIsOpenPayDrawer) {
            setIsOpenPayDrawer(true);
        }
    };
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
                        {match.homeStrategicAnalysis}
                    </div>
                    <LockMood onPay={onPay} />
                </div>
            )}
        </div>
    );
}

export default Analyze;
