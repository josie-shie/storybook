'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from '../helpCenter.module.scss';

function RankingRules() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/helpCenter');
    };

    return (
        <>
            <Header back={back} title="榜單規則說明" />
            <div className={style.detail}>
                <span>
                    排行榜分為【周】【月】【季】【連紅】，所有榜單於每日中午12:00更新，根據勝率或連紅次數排名（只統計已結算的方案）。
                </span>
                <div className={style.zoon}>
                    <h2>周榜</h2>
                    <div className={style.dot}>本榜單統計至當天起前7日內的競猜方案。</div>
                    <div className={style.dot}>
                        上榜條件：需發布超過15場（含）方案，勝率高於50％（含）以上。
                    </div>
                    <div className={style.dot}>排序標準：按照胜率高低進行排行。</div>
                </div>
                <div className={style.zoon}>
                    <h2>月榜</h2>
                    <div className={style.dot}>本榜單統計至當天起前30日內的競猜方案</div>
                    <div className={style.dot}>
                        上榜條件：需發布超過30場（含）方案，勝率高於50％（含）以上。
                    </div>
                    <div className={style.dot}>排序標準：按照胜率高低進行排行。</div>
                </div>
                <div className={style.zoon}>
                    <h2>周榜</h2>
                    <div className={style.dot}>本榜單統計至當天起前90日內的競猜方案。</div>
                    <div className={style.dot}>
                        上榜條件：需發布超過90場（含）方案，勝率高於50％（含）以上。
                    </div>
                    <div className={style.dot}>排序標準：按照胜率高低進行排行。</div>
                </div>
                <div className={style.zoon}>
                    <h2>連紅榜</h2>
                    <div className={style.dot}>本榜單統計至當天起前7日內的競猜方案。</div>
                    <div className={style.dot}>上榜條件：連續競猜正確≥3場。</div>
                </div>
            </div>
        </>
    );
}

export default RankingRules;
