import type { GetPredicativeAnalysisMatchByIdResult } from 'data-center';
import { useUserStore } from '@/store/userStore';
import LockMood from '../lockMood/lockMood';
import style from './aiTab.module.scss';

interface AiProps {
    match: GetPredicativeAnalysisMatchByIdResult;
    isHistory?: boolean;
    setIsOpenPayDrawer?: (isOpenPayDrawer: boolean) => void;
    setPurchaseId?: (id: number) => void;
}
function Ai({ match, isHistory = false, setIsOpenPayDrawer, setPurchaseId }: AiProps) {
    const isLogin = useUserStore.use.isLogin();
    const isShow = isHistory || (isLogin && match.isMemberPurchased);
    const onPay = () => {
        if (!isHistory && setIsOpenPayDrawer && setPurchaseId) {
            setIsOpenPayDrawer(true);
            setPurchaseId(match.id);
        }
    };
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
                    <LockMood onPay={onPay} />
                </div>
            )}
        </div>
    );
}

export default Ai;
