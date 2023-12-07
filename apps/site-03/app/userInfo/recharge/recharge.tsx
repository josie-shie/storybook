'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import style from './recharge.module.scss';
import Usdt from './img/usdt.png';
import Wechat from './img/wechat.png';
import Alipay from './img/alipay.png';
import Header from '@/components/header/headerTitleDetail';

function Recharge() {
    const router = useRouter();
    const headerProps = {
        title: '请选择充值方式'
    };
    const back = () => {
        router.push('/userInfo');
    };

    return (
        <>
            <Header back={back} title={headerProps.title} />
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
        </>
    );
}

export default Recharge;
