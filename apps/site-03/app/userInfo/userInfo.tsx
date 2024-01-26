'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMemberInfo } from 'data-center';
import { ButtonBase } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { formatNumberWithCommas } from 'lib';
import { useNotificationStore } from '@/store/notificationStore';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Header from '@/components/header/headerTransparent';
import Fire from '@/app/img/fire.png';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import userInfoBg from './img/userInfoBg.png';
import Star from './img/star.png';
import BuyBag from './img/buyBag.png';
import MyFocus from './img/myFocus.png';
import MyFans from './img/myFans.png';
import MyGame from './img/myGame.png';
import VipTip from './img/vipTip.png';
import MyAnalyze from './img/myAnalyze.png';
import UserIcon from './img/user.svg';
import UnlockIcon from './img/unlock.svg';
import EditIcon from './img/edit.svg';
import style from './userInfo.module.scss';
import defaultAvatar from './img/avatar.png';

function UserInfo() {
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();
    const tags = useUserStore.use.tags();
    const memberSubscribeStatus = useUserStore.use.memberSubscribeStatus();
    const openChangePasswordDrawer = useAuthStore.use.setIsDrawerOpen();
    const setUserInfo = useUserStore.use.setUserInfo();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsLogin = useUserStore.use.setIsLogin();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const [loading, setLoading] = useState(true);

    const headerProps = {
        title: '我的'
    };

    const back = () => {
        router.push('/');
    };

    const getUserInfo = async () => {
        const res = await getMemberInfo();
        if (res.success) {
            setUserInfo(res.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        void getUserInfo();
    }, []);

    const editAccount = () => {
        router.push('/userInfo/account');
    };

    const goRecharge = () => {
        router.push('/userInfo/recharge');
    };

    const goSubscribe = () => {
        router.push('/userInfo/subscribe');
    };

    const logout = () => {
        Cookies.remove('access');
        setIsVisible('登出成功', 'success');
        setIsLogin(false);
        void getUserInfo();
        setTimeout(() => {
            router.push('/?auth=login');
        }, 1000);
    };

    return (
        <div className={style.wrapper} style={{ backgroundImage: `url(${userInfoBg.src})` }}>
            <Header backHandler={back} title={headerProps.title} />
            <div className={style.userInfo}>
                <div className={style.container}>
                    <div className={style.outer}>
                        <div className={style.detail}>
                            {!loading ? (
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
                            ) : (
                                <Skeleton
                                    animation="wave"
                                    height={54}
                                    variant="circular"
                                    width={54}
                                />
                            )}
                            <div className={style.content}>
                                <div className={style.top}>
                                    {!loading ? (
                                        <span className={style.name}>会员 {userInfo.username}</span>
                                    ) : (
                                        <Skeleton
                                            animation="wave"
                                            height={20}
                                            variant="text"
                                            width={74}
                                        />
                                    )}
                                    <div className={style.edit} onClick={editAccount}>
                                        <EditIcon />
                                        编辑
                                    </div>
                                </div>
                                {!loading ? (
                                    <div className={style.middle}>
                                        会员号 {userInfo.mobileNumber}
                                    </div>
                                ) : (
                                    <Skeleton
                                        animation="wave"
                                        height={20}
                                        variant="text"
                                        width={74}
                                    />
                                )}
                                {!loading ? (
                                    <div className={style.tags}>
                                        {tags.winMaxAccurateStreak >= 3 ? (
                                            <Tag
                                                icon={<Image alt="fire" src={Fire} />}
                                                text={`${tags.winMaxAccurateStreak} 连红`}
                                            />
                                        ) : null}
                                        {tags.quarterRanking > 0 && (
                                            <TagSplit
                                                isBlueBg
                                                number={tags.quarterRanking}
                                                text="季"
                                            />
                                        )}
                                        {tags.monthRanking > 0 && (
                                            <TagSplit
                                                isBlueBg
                                                number={tags.monthRanking}
                                                text="月"
                                            />
                                        )}
                                        {tags.weekRanking > 0 && (
                                            <TagSplit
                                                isBlueBg
                                                number={tags.weekRanking}
                                                text="周"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className={style.tags}>
                                        <Skeleton
                                            animation="wave"
                                            height={20}
                                            variant="text"
                                            width={136}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {!loading ? (
                            <div className={style.bottom}>
                                {userInfo.fans > 0 && (
                                    <span className={style.item}>
                                        <UserIcon className={style.icon} />
                                        <span>粉丝</span>
                                        <span>{userInfo.fans}</span>
                                    </span>
                                )}
                                {userInfo.unlocked > 0 && (
                                    <span className={style.item}>
                                        <UnlockIcon className={style.icon} />
                                        <span>解鎖</span>
                                        <span>{userInfo.unlocked}</span>
                                    </span>
                                )}
                                {tags.quarterHitRate > 0 ? (
                                    <span className={style.item}>
                                        <span>猜球胜率</span>
                                        <span>{tags.quarterHitRate}%</span>
                                    </span>
                                ) : null}
                            </div>
                        ) : (
                            <div className={style.bottom}>
                                <Skeleton animation="wave" height={20} variant="text" width={162} />
                            </div>
                        )}
                        {!loading ? (
                            <div className={style.introduction}>{userInfo.description}</div>
                        ) : (
                            <div className={style.introduction}>
                                <Skeleton
                                    animation="wave"
                                    height={54}
                                    variant="rounded"
                                    width={366}
                                />
                            </div>
                        )}
                    </div>

                    <div className={style.trade}>
                        <button className={style.tradeDetail} type="button">
                            <Link href="/userInfo/tradeDetail">我的交易明细</Link>
                        </button>
                        <div className={style.list}>
                            {/* 保留等充值開放時再開啟 */}
                            {/* <div className={style.item}>
                                <span className={style.text}>
                                    <Image alt="" height={14} src={Star} width={14} />
                                    <span>可用馀额：</span>
                                    {!loading ? (
                                        <>{formatNumberWithCommas(userInfo.balance)}</>
                                    ) : (
                                        <Skeleton
                                            animation="wave"
                                            height={20}
                                            variant="text"
                                            width={42}
                                        />
                                    )}
                                </span>
                                <span
                                    className={style.button}
                                    onClick={() => {
                                        goRecharge();
                                    }}
                                >
                                    充值
                                </span>
                            </div> */}
                            <div className={`${style.item} ${style.second}`}>
                                <span className={style.text}>
                                    <Image alt="" height={16} src={BuyBag} width={16} />
                                    <span>您的订阅状态：</span>
                                    <span className={style.status}>
                                        {!loading ? (
                                            <>
                                                {memberSubscribeStatus.planName
                                                    ? memberSubscribeStatus.planName
                                                    : '未开通'}
                                                {memberSubscribeStatus.planId === 1 ? (
                                                    <Image
                                                        alt=""
                                                        height={16}
                                                        src={VipTip}
                                                        width={40}
                                                    />
                                                ) : null}
                                            </>
                                        ) : (
                                            <Skeleton
                                                animation="wave"
                                                height={20}
                                                variant="text"
                                                width={42}
                                            />
                                        )}
                                    </span>
                                </span>
                                {memberSubscribeStatus.planId === 0 && (
                                    <span
                                        className={style.button}
                                        onClick={() => {
                                            goSubscribe();
                                        }}
                                    >
                                        开通VIP
                                    </span>
                                )}
                                {memberSubscribeStatus.planId === 1 && (
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
                                    <span>解锁纪录</span>
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
        </div>
    );
}

export default UserInfo;
