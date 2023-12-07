'use client';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './subscribe.module.scss';
import background from './img/bg.png';
import Title from './img/title.png';
import PayTitle from './img/payTitle.png';
import Vip from './img/vip.png';
import Arrow from './img/arrow.png';
import ActiveArrow from './img/activeArrow.png';
import starIcon from './img/starIcon.png';
import checkbox from './img/checkbox.png';
import checkedbox from './img/checkedbox.png';
import { useSubscribeStore } from './subscribeStore';

function Subscribe() {
    const router = useRouter();
    const switchRef = useRef<HTMLDivElement | null>(null);
    const planList = useSubscribeStore.use.planList();
    const planId = useSubscribeStore.use.planId();
    const isVip = useSubscribeStore.use.isVip();
    const isChecked = useSubscribeStore.use.isChecked();
    const masterPlan = useSubscribeStore.use.masterPlan();
    const unlockArticle = useSubscribeStore.use.unlockArticle();
    const setPlanId = useSubscribeStore.use.setPlanId();
    const setIsVip = useSubscribeStore.use.setIsVip();
    const setIsChecked = useSubscribeStore.use.setIsChecked();
    const setMasterPlan = useSubscribeStore.use.setMasterPlan();
    const setUnlockArticle = useSubscribeStore.use.setUnlockArticle();
    const [indicatorStyle, setIndicatorStyle] = useState({ left: '0', width: '98px' });

    const handlePlanClick = (id: number, plan: number, unlock: number) => {
        setPlanId(id);
        setIsVip(false);
        setMasterPlan(plan);
        setUnlockArticle(unlock);
    };

    const handleVipClick = () => {
        setIsVip(!isVip);
        setPlanId(0);
    };

    const handleSubscribeButtonOnClick = () => {
        router.push('https://www.newebpay.com/');
    };

    const updateIndicator = () => {
        const switchElement = switchRef.current;
        if (switchElement) {
            const activeElement = switchElement.querySelector(`.${style.active}`);
            if (activeElement && activeElement instanceof HTMLElement) {
                setIndicatorStyle({
                    left: `${activeElement.offsetLeft}px`,
                    width: `${activeElement.offsetWidth}px`
                });
            }
        }
    };

    useEffect(updateIndicator, [planId]);

    return (
        <div className={style.subscribe}>
            <Image alt="" className={style.background} layout="fill" src={background} />
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.push('/userInfo');
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>開通訂閱</div>
                        <button className={style.publish} type="button">
                            说明
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.vipBlock}>
                <Image alt="" className={style.title} src={Title} />
                <Image alt="" className={style.vip} src={Vip} />
                <div className={style.block}>
                    <button
                        className={`${style.button} ${isVip ? style.active : ''}`}
                        onClick={handleVipClick}
                        type="button"
                    >
                        {isVip ? (
                            <Image alt="" height={6} src={ActiveArrow} width={9} />
                        ) : (
                            <Image alt="" height={6} src={Arrow} width={9} />
                        )}
                        <span>{isVip ? '选择VIP方案' : '选择'}</span>
                    </button>
                </div>
            </div>
            <div className={style.content}>
                <Image alt="" className={style.title} src={PayTitle} />
                <div className={style.planContainer} ref={switchRef}>
                    {planList.map(plan => (
                        <div
                            className={`${style.wrapper} ${
                                planId === plan.planId ? style.active : ''
                            }`}
                            key={plan.planId}
                        >
                            <div
                                className={`${style.plan} ${
                                    planId === plan.planId ? style.selectedPlan : ''
                                }`}
                                onClick={() => {
                                    handlePlanClick(plan.planId, plan.freePlan, plan.unlock);
                                }}
                            >
                                <div className={style.discount}>{plan.discount}</div>
                                <div className={style.text}>
                                    {planId === plan.planId && (
                                        <Image
                                            alt=""
                                            className={style.icon}
                                            height={16}
                                            src={starIcon}
                                            width={16}
                                        />
                                    )}
                                    <span className={style.bold}>{plan.period}</span>
                                    <span className={style.light}>平台币</span>
                                </div>
                                <div className={`${style.text} ${style.coin}`}>
                                    <span>{plan.price}</span> 元
                                </div>
                                <button className={style.selectedFlag} type="button">
                                    {planId === plan.planId && (
                                        <Image alt="" height={6} src={Arrow} width={9} />
                                    )}
                                    <span>选择</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    {!isVip ? (
                        <div className={`indicator ${style.indicator}`} style={indicatorStyle} />
                    ) : null}
                </div>
                <div
                    className={`${style.rights} ${planId === 1 ? style.firstRaduis : ''} ${
                        planId === 4 ? style.lastRaduis : ''
                    } `}
                >
                    <div className={style.descript}>充值金币可以购买以下内容</div>
                    <ul className={style.list}>
                        <li> - 所有赛事高手分配免费解锁</li>
                        <li> - 每日可免费查看{isVip ? '无限' : masterPlan}则高手方案</li>
                        <li> - 每日可免费解锁{isVip ? '无限' : unlockArticle}篇专家预测文章</li>
                        <li> - 不限次数使用盘路分析功能</li>
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
