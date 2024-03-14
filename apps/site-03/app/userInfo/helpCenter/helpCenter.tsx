'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from './helpCenter.module.scss';
import Right from './img/right.svg';

interface ItemProps {
    display: string;
    key: string;
}

function SelectRow({ item }: { item: ItemProps }) {
    return (
        <Link className={style.row} href={`/userInfo/helpCenter/${item.key}`}>
            <div>{item.display}</div>
            <Right />
        </Link>
    );
}

function HelpCenter() {
    const helpCenterList = {
        loginAndRegistration: [
            {
                display: '帐号相关',
                key: 'loginAndResign'
            }
        ],
        userGuide: [
            {
                display: '榜单规则说明',
                key: 'rankingRules'
            },
            {
                display: '数据分析规则说明',
                key: 'dataAnalysisRules'
            },
            {
                display: '猜球规则说明',
                key: 'bettingRules'
            }
        ],
        policiesAndAgreements: [
            {
                display: '用户服务协议',
                key: 'userServiceAgreement'
            },
            {
                display: '隐私权',
                key: 'privacyPolicy'
            },
            {
                display: '免责声明',
                key: 'disclaimer'
            }
        ],
        FAQ: [
            {
                display: '其他FAQ',
                key: 'otherFAQ'
            }
        ]
    };

    const router = useRouter();
    const back = () => {
        router.push('/userInfo');
    };

    return (
        <>
            <Header back={back} title="说明中心" />
            <div className={style.container}>
                <div className={style.box}>
                    <h2>註冊及登入</h2>
                    {helpCenterList.loginAndRegistration.map((item: ItemProps) => (
                        <SelectRow item={item} key={item.key} />
                    ))}
                </div>
                <div className={style.box}>
                    <h2>使用指南</h2>
                    {helpCenterList.userGuide.map((item: ItemProps) => (
                        <SelectRow item={item} key={item.key} />
                    ))}
                </div>
                <div className={style.box}>
                    <h2>政策及协议</h2>
                    {helpCenterList.policiesAndAgreements.map((item: ItemProps) => (
                        <SelectRow item={item} key={item.key} />
                    ))}
                </div>
                <div className={style.box}>
                    <h2>常见问题</h2>
                    {helpCenterList.FAQ.map((item: ItemProps) => (
                        <SelectRow item={item} key={item.key} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HelpCenter;
