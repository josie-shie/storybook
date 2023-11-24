'use client';
import { IconFlame } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import userInfoBg from './img/userInfoBg.png';
import Star from './img/star.png';
import BuyBag from './img/buyBag.png';
import MyFocus from './img/myFocus.png';
import MyFans from './img/myFans.png';
import MyGame from './img/myGame.png';
import MyAnalyze from './img/myAnalyze.png';
import style from './userInfo.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import Header from '@/components/header/headerTitleNoBg';
import Footer from '@/components/footer/footer';

function UserInfo() {
    const router = useRouter();

    const headerProps = {
        title: '我的'
    };

    const goRecharge = () => {
        router.push('/userInfo/recharge');
    };

    const goSubscribe = () => {
        router.push('/userInfo/subscribe');
    };

    return (
        <div className={style.wrapper} style={{ backgroundImage: `url(${userInfoBg.src})` }}>
            <Header title={headerProps.title} />
            <div className={style.userInfo}>
                <div className={style.container}>
                    <div className={style.detail}>
                        <Avatar borderColor="#fff" size={54} />
                        <div className={style.content}>
                            <div className={style.top}>
                                <span className={style.name}>老梁聊球</span>
                                <div className={style.tags}>
                                    <Tag icon={<IconFlame size={10} />} text="9連紅" />
                                    <Tag background="#fff" color="#4489ff" text="月榜 10" />
                                </div>
                            </div>
                            <div className={style.middle}>132****789</div>
                            <div className={style.bottom}>
                                <span>粉絲: 34713</span>
                                <span>点赞: 2355</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.introduction}>
                        资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！对各个赛事都有涉足。长期关注！对各个赛事都有涉足。长期关注！
                    </div>

                    <div className={style.trade}>
                        <button className={style.tradeDetail} type="button">
                            <Link href="/userInfo/tradeDetail">我的交易明細</Link>
                        </button>
                        <div className={style.list}>
                            <div className={style.item}>
                                <span className={style.text}>
                                    <Image alt="" height={14} src={Star} width={14} />
                                    <span>可用馀额：</span>100
                                </span>
                                <span
                                    className={style.button}
                                    onClick={() => {
                                        goRecharge();
                                    }}
                                >
                                    充值
                                </span>
                            </div>
                            <div className={style.item}>
                                <span className={style.text}>
                                    <Image alt="" height={16} src={BuyBag} width={16} />
                                    <span>您的订阅状态：</span>尚未开通
                                </span>
                                <span
                                    className={style.button}
                                    onClick={() => {
                                        goSubscribe();
                                    }}
                                >
                                    开通
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.myDetail}>
                    <div className={style.business}>
                        <div className={style.item}>
                            <ButtonBase>
                                <Image alt="" height={32} src={MyFocus} width={32} />
                                <Link className={style.text} href="/userInfo/myFocus">
                                    我的关注
                                </Link>
                            </ButtonBase>
                        </div>
                        <div className={style.item}>
                            <ButtonBase>
                                <Image alt="" height={32} src={MyFans} width={32} />
                                <Link className={style.text} href="/userInfo/myFans">
                                    我的粉絲
                                </Link>
                            </ButtonBase>
                        </div>
                        <div className={style.item}>
                            <ButtonBase>
                                <Image alt="" height={32} src={MyGame} width={32} />
                                <Link className={style.text} href="/userInfo/myGuess">
                                    我的竟猜
                                </Link>
                            </ButtonBase>
                        </div>
                        <div className={style.item}>
                            <ButtonBase>
                                <Image alt="" height={32} src={MyAnalyze} width={32} />
                                <Link
                                    className={style.text}
                                    href="/userInfo/myAnalysis?status=unlock"
                                >
                                    我的分析
                                </Link>
                            </ButtonBase>
                        </div>
                    </div>
                    <div className={style.mySetting}>
                        <ul>
                            <li>
                                <ButtonBase>
                                    <Link href="/userInfo/applyExpert">申请成为专家</Link>
                                </ButtonBase>
                            </li>
                            <li>
                                <ButtonBase>
                                    <Link href="">修改密码</Link>
                                </ButtonBase>
                            </li>
                            <li>
                                <ButtonBase>
                                    <Link href="/userInfo/invite">推荐给朋友</Link>
                                </ButtonBase>
                            </li>
                            <li>
                                <ButtonBase>
                                    <Link href="">联系客服</Link>
                                </ButtonBase>
                            </li>
                            <li>
                                <ButtonBase>
                                    <Link href="">常见问题</Link>
                                </ButtonBase>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserInfo;
