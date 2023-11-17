'use client';
import { IconFlame } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import Star from './img/star.png';
import BuyBag from './img/buyBag.png';
import MyFocus from './img/myFocus.png';
import MyFans from './img/myFans.png';
import MyGame from './img/myGame.png';
import MyAnalyze from './img/myAnalyze.png';
import style from './userInfo.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import Header from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';

function UserInfo() {
    const headerProps = {
        title: '我的',
        total: 0
    };

    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
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
                                <span className={style.button}>充值</span>
                            </div>
                            <div className={style.item}>
                                <span className={style.text}>
                                    <Image alt="" height={16} src={BuyBag} width={16} />
                                    <span>您的订阅状态：</span>尚未开通
                                </span>
                                <span className={style.button}>开通</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.myDetail}>
                    <div className={style.business}>
                        <div className={style.item}>
                            <Image alt="" height={32} src={MyFocus} width={32} />
                            <span className={style.text}>我的关注</span>
                        </div>
                        <div className={style.item}>
                            <Image alt="" height={32} src={MyFans} width={32} />
                            <span className={style.text}>我的粉絲</span>
                        </div>
                        <div className={style.item}>
                            <Image alt="" height={32} src={MyGame} width={32} />
                            <span className={style.text}>我的竟猜</span>
                        </div>
                        <div className={style.item}>
                            <Image alt="" height={32} src={MyAnalyze} width={32} />
                            <span className={style.text}>我的分析</span>
                        </div>
                    </div>
                    <div className={style.mySetting}>
                        <ul>
                            <li>申请成为专家</li>
                            <li>修改密码</li>
                            <li>推薦給朋友</li>
                            <li>聯繫客服</li>
                            <li>常見問題</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserInfo;
