'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getInvitationCode, getInvitationActivityRewardInfo } from 'data-center';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import FullBg from '../img/fullbg.png';
import RightLine from '../img/rightLine.png';
import LeftLine from '../img/leftLine.png';
import backLeftArrowImg from '../img/backLeftArrow.png';
import Friend from '../img/friend.png';
import { useInviteStore } from './inviteStore';
import CustomModal from './components/customModal/customModal';
import style from './invite.module.scss';

function Invite() {
    const router = useRouter();
    const [modalShow, setModalShow] = useState(false);
    const [inviteCode, setInviteCode] = useState<string>();
    const userInfo = useUserStore.use.userInfo();
    const invitedCount = useInviteStore.use.invitedCount();
    const totalCoins = useInviteStore.use.totalCoins();
    const setInvitedCount = useInviteStore.use.setInvitedCount();
    const setTotalCoins = useInviteStore.use.setTotalCoins();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    useEffect(() => {
        const getInviteCode = async () => {
            const res = await getInvitationCode();
            if (res.success) {
                setInviteCode(res.data.invitation_code);
            }
        };

        const getRewardInfo = async () => {
            const res = await getInvitationActivityRewardInfo();
            if (res.success) {
                setInvitedCount(res.data.inviterCount);
                setTotalCoins(res.data.inviterReward);
            } else {
                setIsVisible(res.error, 'error');
            }
        };

        void getInviteCode();
        void getRewardInfo();
    }, []);

    const copyLink = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setModalShow(true);
        } catch (err) {
            setModalShow(true);
        }
    };

    return (
        <>
            <div className={style.wrapper} style={{ backgroundImage: `url(${FullBg.src})` }}>
                <div className={style.placeholder}>
                    <div className={style.headerDetail}>
                        <div className={style.title}>
                            <Image
                                alt=""
                                height={24}
                                onClick={() => {
                                    router.push('/userInfo');
                                }}
                                src={backLeftArrowImg}
                                width={24}
                            />
                            <div className={style.text}>推荐给朋友</div>
                        </div>
                    </div>
                </div>
                <div className={style.invite}>
                    <div className={style.bonusArea}>
                        <Image alt="friend" height={104} src={Friend} width={260} />
                        <div className={style.title}>
                            <span className={style.friend}>
                                <Image alt="line" height={4} src={LeftLine} width={28} />
                                <span>邀请好友领福利</span>
                                <Image alt="line" height={4} src={RightLine} width={28} />
                            </span>
                            <span>多邀多得无上限</span>
                            <span>
                                每邀请一人，最高获得<span className={style.money}>200</span>
                                平台币
                            </span>
                        </div>
                        <div className={style.success}>
                            <div className={style.item}>
                                <span>成功邀请</span>
                                <span>
                                    <span className={style.number}>{invitedCount}</span>人
                                </span>
                            </div>
                            <div className={style.item}>
                                <span>累积获得</span>
                                <span>
                                    <span className={style.number}>{totalCoins}</span>
                                    金币
                                </span>
                            </div>
                        </div>
                        <div
                            className={style.copy}
                            onClick={() => {
                                const protocol = window.location.protocol;
                                const host = window.location.host;
                                const baseUrl = `${protocol}//${host}`;
                                void copyLink(
                                    `${userInfo.username}邀请您一起获得<未来体育平台(站名)>200元红包,点击网址后注册加入即可获得最新赛事预测、赛事数据分析服务: ${baseUrl}/?auth=register&inviteCode=${inviteCode}`
                                );
                            }}
                        >
                            复制邀请连结
                        </div>
                        <div className={style.text}>
                            请使用连结邀请朋友注册，更改连结将导致邀请失效
                        </div>
                    </div>

                    <div className={style.directions}>
                        <div className={style.title}>活动规则</div>

                        <div className={style.rule}>
                            <div className={style.title}>[ 奖励规则 ]</div>
                            <ol className={style.text}>
                                <li>
                                    每成功邀请一位朋友注册成为本平台用户，您将获得200平台币奖励，上不封顶
                                </li>
                                <li>邀请奖励将于注册成功后，自动发放至您的帐户中</li>
                            </ol>
                        </div>
                        <div className={style.rule}>
                            <div className={style.title}>[ 其他规则 ]</div>
                            <ol className={style.text}>
                                <li>
                                    每个用户仅限使用一个帐号参与活动（同一帐号、手机号、移动设备均视为同一帐号），本活动限制虚拟运营商手机号参与，详细请咨询客服
                                </li>
                                <li>
                                    若出现不正当手段获取奖励，经核实后，本平台有权取消该用户参与本活动的资格，并对其帐号进行封禁；同时有权收回活动中所发放的奖励，拒绝赋予其今后参加本公司任何活动的权利，并追究相关法律责任
                                </li>
                                <li>本活动规则最终解释权归本平台运营团队所有</li>
                            </ol>
                        </div>
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

export default Invite;
