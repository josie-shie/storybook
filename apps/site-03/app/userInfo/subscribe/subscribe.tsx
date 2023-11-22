'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './subscribe.module.scss';
import background from './img/bg.png';
import starIcon from './img/starIcon.png';
import recommendMark from './img/recommendMark.png';
import selected from './img/selected.png';
import checkbox from './img/checkbox.png';
import checkedbox from './img/checkedbox.png';
import BaseDialog from '@/components/baseDialog/baseDialog';

const plansMap = [
    { planId: 1, period: '年', days: 365, price: 888 },
    { planId: 2, period: '季', days: 120, price: 288 },
    { planId: 3, period: '双月', days: 60, price: 188 },
    { planId: 4, period: '月', days: 30, price: 88 }
];

type DialogStatus = 'confirm' | 'completed' | 'deficiency';

function Subscribe() {
    const router = useRouter();
    const [planId, setPlanId] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [dialogOpend, setDialogOpend] = useState(false);
    const [dialogStatus, setDialogStatus] = useState<DialogStatus>('confirm');

    const periodLabel = plansMap.find(el => el.planId === planId)?.period;

    const handleSubscribeButtonOnClick = () => {
        setDialogOpend(true);
    };

    const handleConfirmOnClick = () => {
        setDialogStatus('completed');
    };

    const handleDialogContent = () => {
        switch (dialogStatus) {
            case 'confirm':
                return (
                    <>
                        <section className={style.dialogSection}>
                            <div className={style.title}>
                                支付
                                <Image alt="" height={16} src={starIcon} width={16} />
                                <span className={style.coin}>10</span>
                            </div>
                            <div className={style.title}>開通{periodLabel}卡訂閱</div>
                            <div className={style.subTitle}>我的餘額: 1000金幣</div>
                        </section>
                        <div className={style.buttonContainer}>
                            <button
                                onClick={() => {
                                    setDialogOpend(false);
                                }}
                                type="button"
                            >
                                取消
                            </button>
                            <button onClick={handleConfirmOnClick} type="button">
                                確認支付
                            </button>
                        </div>
                    </>
                );
            case 'completed':
                return (
                    <>
                        <section className={style.dialogSection}>
                            <div className={style.title}>您的{periodLabel}卡訂閱已開通</div>
                            <div className={style.subTitle}>生效期間: 2023-8-30~2023-12-31</div>
                        </section>
                        <div className={style.buttonContainer}>
                            <button
                                onClick={() => {
                                    setDialogOpend(false);
                                }}
                                type="button"
                            >
                                確認
                            </button>
                        </div>
                    </>
                );
            case 'deficiency':
                return (
                    <>
                        <section className={style.dialogSection}>
                            <div className={style.title}>餘額不足，請充值</div>
                        </section>
                        <div className={style.buttonContainer}>
                            <button
                                onClick={() => {
                                    setDialogOpend(false);
                                }}
                                type="button"
                            >
                                取消
                            </button>
                            <button onClick={handleConfirmOnClick} type="button">
                                去充值
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={style.subscribe}>
            <Image alt="" className={style.background} layout="fill" src={background} />
            <BaseDialog
                onClose={() => {
                    setDialogOpend(false);
                }}
                open={dialogOpend}
            >
                {handleDialogContent()}
            </BaseDialog>
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
                        <div className={style.text}>開通訂閱</div>
                        <button className={style.publish} type="button">
                            關於訂閱
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.planContainer}>
                    {plansMap.map(plan => (
                        <div
                            className={`${style.plan} ${
                                planId === plan.planId ? style.selectedPlan : ''
                            }`}
                            key={plan.planId}
                            onClick={() => {
                                setPlanId(plan.planId);
                            }}
                        >
                            <div className={style.text}>
                                {plan.period}卡 {plan.days} 天
                            </div>
                            <div className={`${style.text} ${style.coin}`}>
                                <Image alt="" height={16} src={starIcon} width={16} />
                                <span>{plan.price}</span> 金幣
                            </div>
                            {planId === plan.planId && (
                                <Image alt="" className={style.selectedFlag} src={selected} />
                            )}
                            {plan.planId === 1 && (
                                <Image alt="" className={style.recommendMark} src={recommendMark} />
                            )}
                        </div>
                    ))}
                </div>
                <div className={style.rights}>
                    <div className={style.currentPlan}>
                        你選擇 <span className={style.plan}>{periodLabel}卡方案</span>
                    </div>
                    <div className={style.descript}>訂閱期間可享受以下權益</div>
                    <ul className={style.list}>
                        <li>所有賽事高手分布免費解鎖</li>
                        <li>每日可免費查看2則高手方案</li>
                        <li>每日可免費解鎖1篇專家預測文章</li>
                        <li>不限次數使用盤路分析功能</li>
                    </ul>
                </div>
                <div className={style.agreement}>
                    {isChecked ? (
                        <Image
                            alt=""
                            height={16}
                            onClick={() => {
                                setIsChecked(false);
                            }}
                            src={checkedbox}
                            width={16}
                        />
                    ) : (
                        <Image
                            alt=""
                            height={16}
                            onClick={() => {
                                setIsChecked(true);
                            }}
                            src={checkbox}
                            width={16}
                        />
                    )}
                    <div>
                        已同意<a href="./">會員服務協議</a>
                    </div>
                </div>
                <button
                    className={style.submit}
                    disabled={!isChecked}
                    onClick={handleSubscribeButtonOnClick}
                    type="button"
                >
                    立即開通
                </button>
            </div>
        </div>
    );
}

export default Subscribe;
