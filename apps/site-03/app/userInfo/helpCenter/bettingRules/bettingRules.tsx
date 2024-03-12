'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from '../helpCenter.module.scss';

function BettingRules() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/helpCenter');
    };

    return (
        <>
            <Header back={back} title="猜球規則說明" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>每日競猜機會</h2>
                    <div className={style.dot}>每位用戶每天擁有五次參與猜球的機會。</div>
                    <div className={style.dot}>猜球的次數會在每天的中午12:00重置。 </div>
                </div>
                <div className={style.zoon}>
                    <h2>競猜玩法</h2>
                    <div className={style.dot}>猜勝負：預測比賽的勝方或是否平局。</div>
                    <div className={style.dot}>猜總進球：預測比賽的總進球數量。</div>
                    <div className={style.dot}>每場比賽的個別玩法限競猜一次。</div>
                </div>
                <div className={style.zoon}>
                    <h2>解鎖高勝率玩家風向比例</h2>
                    <div className={style.dot}>
                        完成至少一次競猜後，將可查看高勝率玩家的競猜選擇比例及人數。
                    </div>
                    <div className={style.dot}>可以提供您參考，以便作出更加明智的競猜決策。</div>
                </div>
                <div className={style.zoon}>
                    <h2>其他注意事項</h2>
                    <div className={style.dot}>請於比賽開始前完成競猜。</div>
                    <div className={style.dot}>當日未使用的競猜機會將不會累積至隔日。</div>
                </div>
            </div>
        </>
    );
}

export default BettingRules;
