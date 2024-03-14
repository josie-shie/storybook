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
            <Header back={back} title="猜球规则说明" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>每日竞猜机会</h2>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>每位用户每天拥有五次参与猜球的机会。</div>
                    </div>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div> 猜球的次数会在每天的中午12:00重置。</div>
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>竞猜玩法</h2>
                    <div className={style.pl2}>1. 猜胜负：预测比赛的胜方或是否平局。</div>
                    <div className={style.pl2}>2. 猜总进球：预测比赛的总进球数量。</div>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>每场比赛的个别玩法限竞猜一次。</div>
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>解锁高胜率玩家风向比例</h2>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>完成至少一次竞猜后，将可查看高胜率玩家的竞猜选择比例及人数。</div>
                    </div>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>可以提供您参考，以便作出更加明智的竞猜决策。</div>
                    </div>
                </div>
                <div className={style.zoon}>
                    <h2>其他注意事项</h2>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div> 请于比赛开始前完成竞猜。</div>
                    </div>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div> 当日未使用的竞猜机会将不会累积至隔日。</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BettingRules;
