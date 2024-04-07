import type { GetPredicativeAnalysisMatchByIdResult } from 'data-center';
import { useUserStore } from '@/store/userStore';
import IdeaIcon from '../../(list)/img/idea.svg';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface CornorProps {
    match: GetPredicativeAnalysisMatchByIdResult;
    isHistory?: boolean;
    setIsOpenPayDrawer?: (isOpenPayDrawer: boolean) => void;
}

function Cornor({ match, isHistory = false, setIsOpenPayDrawer }: CornorProps) {
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
                    <LockMood onPay={onPay} />
                </div>
            )}
        </div>
    );
}

export default Cornor;
