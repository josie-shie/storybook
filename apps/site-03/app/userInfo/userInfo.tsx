'use client';
import { IconFlame } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useAuthStore } from '../(auth)/authStore';
import { useUserStore } from '../userStore';
import userInfoBg from './img/userInfoBg.png';
import Star from './img/star.png';
import BuyBag from './img/buyBag.png';
import MyFocus from './img/myFocus.png';
import MyFans from './img/myFans.png';
import MyGame from './img/myGame.png';
import VipTip from './img/vipTip.png';
import MyAnalyze from './img/myAnalyze.png';
import style from './userInfo.module.scss';
import defaultAvatar from './img/avatar.png';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerTitleNoBg';
import Tag from '@/components/tag/tag';
import { useNotificationStore } from '@/app/notificationStore';

function UserInfo() {
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();
    const tags = useUserStore.use.tags();
    const memberSubscribeStatus = useUserStore.use.memberSubscribeStatus();
    const openChangePasswordDrawer = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsLogin = useUserStore.use.setIsLogin();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    const headerProps = {
        title: '我的'
    };

    const back = () => {
        router.push('/');
    };

    const editAccount = () => {
        router.push('/userInfo/account');
    };

    // const goRecharge = () => {
    //     router.push('/userInfo/recharge');
    // };

    const goSubscribe = () => {
        router.push('/userInfo/subscribe');
    };

    const logout = () => {
        Cookies.remove('access');
        setIsVisible('登出成功', 'success');
        setIsLogin(false);
        setTimeout(() => {
            router.push('/?auth=login');
        }, 500);
    };

    return (
        <div className={style.wrapper} style={{ backgroundImage: `url(${userInfoBg.src})` }}>
            <Header back={back} title={headerProps.title} />
            <div className={style.userInfo}>
                <div className={style.container}>
                    <div
                        className={style.outer}
                        onClick={() => {
                            editAccount();
                        }}
                    >
                        <div className={style.detail}>
                            <Image
                                alt="大头贴"
                                className={style.avatar}
                                height={54}
                                src={
                                    userInfo.avatarPath && userInfo.avatarPath !== '0'
                                        ? userInfo.avatarPath
                                        : defaultAvatar
                                }
                                width={54}
                            />
                            <div className={style.content}>
                                <div className={style.top}>
                                    <span className={style.name}>{userInfo.username}</span>
                                    <div className={style.tags}>
                                        {tags.winHistoryMaxWinStreak >= 3 ? (
                                            <Tag
                                                icon={<IconFlame size={10} />}
                                                text={`${tags.winHistoryMaxWinStreak}连红`}
                                            />
                                        ) : null}
                                        {tags.weekHistoryMaxWinStreak >= 3 ? (
                                            <Tag
                                                background="#fff"
                                                color="#4489ff"
                                                text={`周榜 ${tags.weekHistoryMaxWinStreak}`}
                                            />
                                        ) : null}
                                        {tags.monthHistoryMaxWinStreak >= 3 ? (
                                            <Tag
                                                background="#fff"
                                                color="#4489ff"
                                                text={`月榜 ${tags.monthHistoryMaxWinStreak}`}
                                            />
                                        ) : null}
                                        {tags.quarterHistoryMaxWinStreak >= 3 ? (
                                            <Tag
                                                background="#fff"
                                                color="#4489ff"
                                                text={`季榜 ${tags.quarterHistoryMaxWinStreak}`}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className={style.middle}>{userInfo.mobileNumber}</div>
                                <div className={style.bottom}>
                                    {userInfo.fans > 0 && <span>粉丝: {userInfo.fans}</span>}
                                    {userInfo.unlocked > 0 && (
                                        <span>解鎖: {userInfo.unlocked}</span>
                                    )}
                                    {tags.quarterHitRate > 0 ? (
                                        <span>猜球胜率: {tags.quarterHitRate}%</span>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className={style.introduction}>{userInfo.description}</div>
                    </div>

                    <div className={style.trade}>
                        <button className={style.tradeDetail} type="button">
                            <Link href="/userInfo/tradeDetail">我的交易明细</Link>
                        </button>
                        <div className={style.list}>
                            <div className={style.item}>
                                <span className={style.text}>
                                    <Image alt="" height={14} src={Star} width={14} />
                                    <span>可用馀额：</span>
                                    {userInfo.balance}
                                </span>
                                {/* <span
                                    className={style.button}
                                    onClick={() => {
                                        goRecharge();
                                    }}
                                >
                                    充值
                                </span> */}
                            </div>
                            <div className={style.item}>
                                <span className={style.text}>
                                    <Image alt="" height={16} src={BuyBag} width={16} />
                                    <span>您的订阅状态：</span>
                                    <span className={style.status}>
                                        {memberSubscribeStatus.planName
                                            ? memberSubscribeStatus.planName
                                            : '未开通'}
                                        {memberSubscribeStatus.planId === 1 ? (
                                            <Image alt="" height={16} src={VipTip} width={40} />
                                        ) : null}
                                    </span>
                                </span>
                                {memberSubscribeStatus.planId === 0 ? (
                                    <span
                                        className={style.button}
                                        onClick={() => {
                                            goSubscribe();
                                        }}
                                    >
                                        开通VIP
                                    </span>
                                ) : (
                                    <span
                                        className={style.button}
                                        onClick={() => {
                                            goSubscribe();
                                        }}
                                    >
                                        續約
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.myDetail}>
                    <div className={style.business}>
                        <div className={style.item}>
                            <Link className={style.text} href="/userInfo/myFocus">
                                <ButtonBase>
                                    <Image alt="" height={32} src={MyFocus} width={32} />
                                    <span>我的关注</span>
                                </ButtonBase>
                            </Link>
                        </div>
                        <div className={style.item}>
                            <Link className={style.text} href="/userInfo/myFans">
                                <ButtonBase>
                                    <Image alt="" height={32} src={MyFans} width={32} />
                                    <span>我的粉丝</span>
                                </ButtonBase>
                            </Link>
                        </div>
                        <div className={style.item}>
                            <Link className={style.text} href="/userInfo/myGuess">
                                <ButtonBase>
                                    <Image alt="" height={32} src={MyGame} width={32} />
                                    <span>我的竟猜</span>
                                </ButtonBase>
                            </Link>
                        </div>
                        <div className={style.item}>
                            <Link className={style.text} href="/userInfo/myAnalysis?status=unlock">
                                <ButtonBase>
                                    <Image alt="" height={32} src={MyAnalyze} width={32} />
                                    <span>我的解锁</span>
                                </ButtonBase>
                            </Link>
                        </div>
                    </div>
                    <div className={style.mySetting}>
                        <ul>
                            {/* <li>
                                <ButtonBase>
                                    <Link href="/userInfo/applyExpert">申请成为专家</Link>
                                </ButtonBase>
                            </li> */}
                            <li>
                                <ButtonBase
                                    onClick={() => {
                                        setAuthQuery('changePassword');
                                        openChangePasswordDrawer(true);
                                    }}
                                >
                                    <div className={style.changePassword}>修改密码</div>
                                </ButtonBase>
                            </li>
                            <li>
                                <ButtonBase>
                                    <Link href="/userInfo/invite">推荐给朋友</Link>
                                </ButtonBase>
                            </li>
                            {/* <li>
                                <ButtonBase>
                                    <Link href="">联系客服</Link>
                                </ButtonBase>
                            </li> */}
                            <li>
                                <ButtonBase>
                                    <Link href="">常见问题</Link>
                                </ButtonBase>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={style.logout} onClick={logout}>
                    登出帐号
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserInfo;
