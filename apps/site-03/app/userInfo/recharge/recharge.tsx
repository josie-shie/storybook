'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getRechargeOptionList } from 'data-center';
import Header from '@/components/header/headerTitleDetail';
import { useNotificationStore } from '@/app/notificationStore';
import { useRechargeStore } from './rechargeStore';
import style from './recharge.module.scss';
import Usdt from './img/usdt.png';
import Wechat from './img/wechat.png';
import Alipay from './img/alipay.png';
import lineLeft from './img/lineLeft.png';
import lineRight from './img/lineRight.png';
import Arrow from './img/arrow.png';

function Recharge() {
    const router = useRouter();
    const planList = useRechargeStore.use.planList();
    const planId = useRechargeStore.use.planId();

    const setPlanList = useRechargeStore.use.setPlanList();
    const setPlanId = useRechargeStore.use.setPlanId();
    const setAmount = useRechargeStore.use.setAmount();

    const setIsVisible = useNotificationStore.use.setIsVisible();

    const headerProps = {
        title: '请选择充值方式'
    };
    const back = () => {
        router.push('/userInfo');
    };

    useEffect(() => {
        const getRechargeList = async () => {
            const res = await getRechargeOptionList({ currencyCode: 'cny' });

            if (!res.success) {
                if ('error' in res) {
                    const errorMessage = res.error;
                    setIsVisible(errorMessage, 'error');
                } else {
                    const errorMessage = '取得充值礼包失败';
                    setIsVisible(errorMessage, 'error');
                }
                return;
            }
            setPlanList(res.data);
            if (res.data.length > 0) {
                const { id, paymentAmount } = res.data[0];
                handlePlanClick(id, paymentAmount);
            }
        };
        void getRechargeList();
    }, [setPlanList]);

    const handlePlanClick = (id: number, cash: number) => {
        setPlanId(id);
        setAmount(cash.toString());
    };

    const planPrices = {
        1: '48元/1次分析',
        2: '40元/1次分析',
        3: '36元/1次分析',
        4: '36元/1次分析'
    };

    return (
        <>
            <Header back={back} title={headerProps.title} />
            <div className={style.layout}>
                <div className={style.title}>
                    <Image alt="" height={4} src={lineLeft} width={28} />
                    充值方案
                    <Image alt="" height={4} src={lineRight} width={28} />
                </div>
                <div className={style.planContainer}>
                    {planList.map(plan => (
                        <div className={`${style.wrapper}`} key={plan.id}>
                            <div
                                className={`${style.plan} ${
                                    planId === plan.id ? style.selectedPlan : ''
                                }`}
                                onClick={() => {
                                    handlePlanClick(plan.id, plan.paymentAmount);
                                }}
                            >
                                <div
                                    className={`${style.discount} ${
                                        plan.id === 1 ? style.newGuy : ''
                                    }`}
                                >
                                    {plan.titleDesc}
                                </div>
                                <div className={style.text}>
                                    <span className={style.bold}>{plan.rechargeAmount}</span>
                                    <span className={style.light}>平台币</span>
                                </div>
                                <div className={style.text}>
                                    <span>{plan.paymentAmount}</span> 元
                                </div>
                                <div className={style.intro}>{planPrices[plan.id]}</div>
                                <button className={style.selectedFlag} type="button">
                                    {planId === plan.id && (
                                        <Image alt="" height={6} src={Arrow} width={9} />
                                    )}
                                    <span>选择</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.title}>
                    <Image alt="" height={4} src={lineLeft} width={28} />
                    支付方式
                    <Image alt="" height={4} src={lineRight} width={28} />
                </div>
                <div className={style.recharge}>
                    <ul>
                        <li>
                            <span className={style.recommend}>推荐</span>
                            <Link href="/userInfo/recharge/usdt">
                                <Image alt="usdt" height={32} src={Usdt} width={32} />
                                <span>虚拟货币(USDT)</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/userInfo/recharge/wechat">
                                <Image alt="wechat" height={32} src={Wechat} width={32} />
                                <span>微信支付</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/userInfo/recharge/alipay">
                                <Image alt="alipay" height={32} src={Alipay} width={32} />
                                <span>支付宝支付</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Recharge;
