'use client';
// import Image from 'next/image';
// import style from './recharge.module.scss';
// import Avatar from './img/avatar.png';
import Header from '@/components/header/headerTitleDetail';

function Alipay() {
    const headerProps = {
        title: '支付宝支付充值'
    };

    return (
        <>
            <Header title={headerProps.title} />
            {/* <div className={style.usdt}>
                微信
            </div> */}
        </>
    );
}

export default Alipay;
