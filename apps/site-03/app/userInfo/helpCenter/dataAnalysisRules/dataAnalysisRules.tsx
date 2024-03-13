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
            <Header back={back} title="数据分析规则说明" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>让球</h2>
                    <div className={style.dot}>
                        在指定球赛中，预测经过让球调整后的两队比赛结果，选择主队胜出或客队胜出的投注方式。
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>大小</h2>
                    <div className={style.dot}>
                        在指定球赛中，预测两队的总进球数是大于或小于ｓ预设的球盘。若总进球数超过设定的“大球盘”，则下注大球盘胜出；若总进球数少于设定的“小球盘”，则下注小球盘胜出。
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>15分钟进球</h2>
                    <div className={style.dot}>
                        在指定球赛中，预测特定15分钟时间段内是否会有进球。{' '}
                    </div>
                    <div className={style.dot}>可以提供您参考，以便作出更加明智的竞猜决策。</div>
                </div>
                <div className={style.zoon}>
                    <h2>进球数区间</h2>
                    <div className={style.dot}>
                        在指定球赛中，预测比赛的最终总进球数落入哪个特定的区间内。
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>全场波胆</h2>
                    <div className={style.dot}>
                        在指定球赛中，预测最终的正确比分，选择最终主队胜出比分、客队胜出比分或和局比分的投注方式。
                    </div>
                </div>
            </div>
        </>
    );
}

export default DataAnalysisRules;
