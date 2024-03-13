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
            <Header back={back} title="榜单规则说明" />
            <div className={style.detail}>
                <span>
                    排行榜分为【周】【月】【季】【连红】，所有榜单于每日中午12:00更新，根据胜率或连红次数排名（只统计已结算的方案）。
                </span>
                <div className={style.zoon}>
                    <h2>周榜</h2>
                    <div className={style.dot}>本榜单统计至当天起前7日内的竞猜方案。</div>
                    <div className={style.dot}>
                        上榜条件：需发布超过15场（含）方案，胜率高于50％（含）以上。
                    </div>
                    <div className={style.dot}>排序标准：按照胜率高低进行排行。</div>
                </div>
                <div className={style.zoon}>
                    <h2>月榜</h2>
                    <div className={style.dot}>本榜单统计至当天起前30日内的竞猜方案</div>
                    <div className={style.dot}>
                        上榜条件：需发布超过30场（含）方案，胜率高于50％（含）以上。
                    </div>
                    <div className={style.dot}>排序标准：按照胜率高低进行排行。</div>
                </div>
                <div className={style.zoon}>
                    <h2>周榜</h2>
                    <div className={style.dot}>本榜单统计至当天起前90日内的竞猜方案。</div>
                    <div className={style.dot}>
                        上榜条件：需发布超过90场（含）方案，胜率高于50％（含）以上。
                    </div>
                    <div className={style.dot}>排序标准：按照胜率高低进行排行。</div>
                </div>
                <div className={style.zoon}>
                    <h2>连红榜</h2>
                    <div className={style.dot}>本榜单统计至当天起前7日内的竞猜方案。</div>
                    <div className={style.dot}>上榜条件：连续竞猜正确≥3场。</div>
                </div>
            </div>
        </>
    );
}

export default RankingRules;
