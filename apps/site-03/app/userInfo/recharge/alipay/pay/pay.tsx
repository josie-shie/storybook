'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AlipayIcon from '../../img/alipay.png';
import Qrcode from '../../img/qrcode.png';
import Cricle from '../../img/cricle.png';
import Clock from '../../img/clock.png';
import Money from '../../img/money.png';
import backLeftArrowImg from '../../img/backLeftArrow.png';
import style from './pay.module.scss';

interface PayProps {
    amount: string;
    onClose?: () => void;
}

interface HeaderProps {
    title: string;
    onClose?: () => void;
}

function Header({ title, onClose }: HeaderProps) {
    return (
        <div className={style.headerDetail}>
            <div className={style.title}>
                <Image alt="" height={24} onClick={onClose} src={backLeftArrowImg} width={24} />
                <div className={style.text}>{title}</div>
            </div>
        </div>
    );
}

function Pay({ amount, onClose }: PayProps) {
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [timeLeft]);

    const formatTimeLeft = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Header onClose={onClose} title="支付宝充值" />
            <div className={style.pay}>
                <div className={style.payArea}>
                    <div className={style.title}>
                        <Image alt="usdt" height={32} src={AlipayIcon} width={32} />
                        <span>支付宝支付</span>
                    </div>
                    <div className={style.payDetail}>
                        <div className={style.qrcode}>
                            <Image
                                alt="Qrcode"
                                className={style.qrcodeImage}
                                height={124}
                                src={Qrcode}
                                width={124}
                            />
                            <Image
                                alt="Cricle"
                                className={style.cricle}
                                height={192}
                                src={Cricle}
                                width={192}
                            />
                        </div>
                        <div className={style.item}>
                            充值金额：<span>{amount}平台币</span>
                        </div>
                        <div className={style.detail}>
                            <div className={style.top}>
                                <span className={style.title}>支付金額：</span>
                                <span className={style.clock}>
                                    <Image alt="clock" height={16} src={Clock} width={16} />
                                    <span className={style.text}>{formatTimeLeft()}</span>
                                </span>
                            </div>
                            <div className={style.middle}>
                                <span className={style.amount}>
                                    <Image alt="money" height={24} src={Money} width={24} />
                                    <span className={style.text}>USDT {amount}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.attention}>
                    <div className={style.title}>注意事项</div>
                    <div className={style.text}>
                        <span>1. 你只能使用你的信用卡或借记卡，不能使用他人的信用卡支付</span>
                        <span>
                            2. 此外，如果是为他人支付，则需要身份认证，以确保信用卡不被他人盗用
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pay;
