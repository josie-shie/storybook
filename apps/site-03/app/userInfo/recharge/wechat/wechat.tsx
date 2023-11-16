'use client';
// import Image from 'next/image';
// import style from './recharge.module.scss';
// import Avatar from './img/avatar.png';
import Header from '@/components/header/headerTitleDetail';

function Wechat() {
    const headerProps = {
        title: '微信支付充值'
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

export default Wechat;
