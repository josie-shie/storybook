'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FullBg from '../img/fullbg.png';
import backLeftArrowImg from '../img/backLeftArrow.png';
import Cricle from '../img/cricle.png';
import Banner from '../img/banner.png';
import { createExpertApplyStore, useExpertApplyStore } from './applyExpertStore';
import style from './applyExpert.module.scss';

function ApplyExpert() {
    const router = useRouter();

    createExpertApplyStore({
        applicationProgress: {
            fanCount: 10,
            weeklyWinRate: 80,
            monthlyWinRate: 80,
            seasonWinRate: 80
        }
    });

    const apply = useExpertApplyStore.use.applicationProgress();

    // 計算勝率是否有達成判斷
    const isEligibleToSubmit =
        apply.fanCount >= 100 &&
        (apply.weeklyWinRate >= 80 || apply.monthlyWinRate >= 80 || apply.seasonWinRate >= 80);

    return (
        <div className={style.wrapper} style={{ backgroundImage: `url(${FullBg.src})` }}>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.back();
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>专家申请</div>
                    </div>
                </div>
            </div>
            <div className={style.applyExpert}>
                <div className={style.check}>
                    <Image alt="check" height={70} src={Cricle} width={168} />
                    <div className={style.text}>
                        <span>完成以下任一条件即可提交申请</span>
                        <span>订阅即可享受以下权益</span>
                    </div>
                </div>

                <div className={style.process}>
                    <Image alt="banner" height={115} src={Banner} width={366} />

                    <div className={style.column}>
                        <div className={style.title}>粉丝数达到100人</div>
                        <div className={style.content}>當前進度 100/{apply.fanCount}</div>
                    </div>
                    <div className={style.column}>
                        <div className={style.title}>周榜胜率达80%(含)以上</div>
                        <div className={style.content}>当前胜率 {apply.weeklyWinRate}%</div>
                    </div>
                    <div className={style.column}>
                        <div className={style.title}>月榜胜率达80%(含)以上</div>
                        <div className={style.content}>当前胜率 {apply.monthlyWinRate}%</div>
                    </div>
                    <div className={style.column}>
                        <div className={style.title}>季榜胜率达80%(含)以上</div>
                        <div className={style.content}>当前胜率 {apply.seasonWinRate}%</div>
                    </div>
                </div>

                <button
                    className={`${style.submit} ${isEligibleToSubmit ? style.active : ''}`}
                    disabled={!isEligibleToSubmit}
                    type="button"
                >
                    提交申请
                </button>
            </div>
        </div>
    );
}

export default ApplyExpert;
