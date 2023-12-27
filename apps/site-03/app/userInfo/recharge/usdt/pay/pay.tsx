'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import UsdtIcon from '../../img/usdt.png';
import Qrcode from '../../img/qrcode.png';
import Cricle from '../../img/cricle.png';
import Clock from '../../img/clock.png';
import Money from '../../img/money.png';
import Copy from '../../img/copy.png';
import backLeftArrowImg from '../../img/backLeftArrow.png';
import CustomModal from '../../components/customModal/customModal';
import style from './pay.module.scss';

interface PayProps {
    amount: string;
    chain: string;
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

function Pay({ amount, chain, onClose }: PayProps) {
    const [modalShow, setModalShow] = useState(false);
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

    const handleCopyClick = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setModalShow(true);
        } catch (err) {
            setModalShow(true);
        }
    };

    return (
        <>
            <Header onClose={onClose} title="虚拟货币(USDT)充值" />
            <div className={style.pay}>
                <div className={style.payArea}>
                    <div className={style.title}>
                        <Image alt="usdt" height={32} src={UsdtIcon} width={32} />
                        <span>虚拟货币(USDT)</span>
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
                        <div className={style.item}>
                            协议：<span>{chain}</span>
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
                            <div className={style.bottom}>
                                <span className={style.title}>錢包地址:</span>
                                <span className={style.address}>
                                    <span className={style.text}>
                                        0x12ej2iodwecewwcjdj12dijdi1odji1di12di12j09
                                    </span>
                                    <Image
                                        alt="copy"
                                        height={13}
                                        onClick={() =>
                                            handleCopyClick(
                                                '0x12ej2iodwecewwcjdj12dijdi1odji1di12di12j09'
                                            )
                                        }
                                        src={Copy}
                                        width={12}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.attention}>
                    <div className={style.title}>注意事项</div>
                    <div className={style.text}>
                        <span>1. 请使用正确协议充值</span>
                        <span>
                            2.
                            交易所转帐可能会收取手续费，请务必使USDT实际到帐数量和订单数量相符，否则无法完成充值
                        </span>
                    </div>
                </div>
            </div>
            <CustomModal
                message="复制成功"
                onHide={() => {
                    setModalShow(false);
                }}
                show={modalShow}
            />
        </>
    );
}

export default Pay;
