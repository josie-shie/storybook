'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/header/headerTitleDetail';
import WechatIcon from '../img/wechat.png';
import Pay from './pay/pay';
import style from './wechat.module.scss';

function Wechat() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/recharge');
    };
    const headerProps = {
        title: '微信支付充值'
    };

    const [pay, setPay] = useState(false);
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.valueAsNumber;

        if (value) {
            if (value < 1) {
                value = 1;
            } else if (value > 99999) {
                value = 99999;
            }
            setAmount(value.toString());
        } else {
            setAmount('');
        }
    };

    const handleClose = () => {
        setPay(false);
        setAmount('');
    };

    return (
        <>
            {!pay ? (
                <>
                    <Header back={back} title={headerProps.title} />
                    <div className={style.wechat}>
                        <div className={style.payArea}>
                            <div className={style.title}>
                                <Image alt="wechat" height={32} src={WechatIcon} width={32} />
                                <span>微信支付</span>
                            </div>
                            <div className={style.pay}>
                                <div className={style.title}>充值金额:</div>
                                <div className={style.amount}>
                                    <Image alt="wechat" height={32} src={WechatIcon} width={32} />
                                    <input
                                        onChange={handleAmountChange}
                                        placeholder="1~99999平台币"
                                        type="number"
                                        value={amount}
                                    />
                                </div>
                            </div>
                            <button
                                className={`${style.send} ${
                                    amount.trim() !== '' ? style.active : ''
                                }`}
                                onClick={() => {
                                    setPay(true);
                                }}
                                type="button"
                            >
                                确认送出
                            </button>
                        </div>
                        <div className={style.attention}>
                            <div className={style.title}>注意事项</div>
                            <div className={style.text}>
                                <span>
                                    1. 你只能使用你的信用卡或借记卡，不能使用他人的信用卡支付
                                </span>
                                <span>
                                    2.
                                    此外，如果是为他人支付，则需要身份认证，以确保信用卡不被他人盗用
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Pay amount={amount} onClose={handleClose} />
            )}
        </>
    );
}

export default Wechat;
