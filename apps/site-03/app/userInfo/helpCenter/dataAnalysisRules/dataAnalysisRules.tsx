'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from '../helpCenter.module.scss';

function DataAnalysisRules() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/helpCenter');
    };

    return (
        <>
            <Header back={back} title="數據分析規則說明" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>讓球</h2>
                    <div className={style.dot}>
                        在指定球賽中，預測經過讓球調整後的兩隊比賽結果，選擇主隊勝出或客隊勝出的投注方式。
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>大小</h2>
                    <div className={style.dot}>
                        在指定球賽中，預測兩隊的總進球數是大於或小於預設的球盤。若總進球數超過設定的“大球盤”，則下注大球盤勝出；若總進球數少於設定的“小球盤”，則下注小球盤勝出。
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>15分鐘進球</h2>
                    <div className={style.dot}>
                        在指定球賽中，預測特定15分鐘時間段內是否會有進球。{' '}
                    </div>
                    <div className={style.dot}>可以提供您參考，以便作出更加明智的競猜決策。</div>
                </div>
                <div className={style.zoon}>
                    <h2>進球數區間</h2>
                    <div className={style.dot}>
                        在指定球賽中，預測比賽的最終總進球數落入哪個特定的區間內。
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>全場波膽</h2>
                    <div className={style.dot}>
                        在指定球賽中，預測最終的正確比分，選擇最終主隊勝出比分、客隊勝出比分或和局比分的投注方式。
                    </div>
                </div>
            </div>
        </>
    );
}

export default DataAnalysisRules;
