'use client';
import Image from 'next/image';
import UsdtIcon from '../img/usdt.png';
import style from './usdt.module.scss';
import Header from '@/components/header/headerTitleDetail';

function Usdt() {
    const headerProps = {
        title: '虚拟货币(USDT)充值'
    };

    return (
        <>
            <Header title={headerProps.title} />
            <div className={style.usdt}>
                <div className={style.payArea}>
                    <div className={style.title}>
                        <Image alt="usdt" height={32} src={UsdtIcon} width={32} />
                        <span>虚拟货币(USDT)</span>
                    </div>
                    <div className={style.pay}>
                        <div className={style.title}>充值金額:</div>
                        <div className={style.amount}>
                            <Image alt="usdt" height={32} src={UsdtIcon} width={32} />
                            <input placeholder="USDT 1~99999平台幣" type="number" />
                        </div>
                        <div className={style.tip}>USDT: 1 : 99999平台幣</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Usdt;
