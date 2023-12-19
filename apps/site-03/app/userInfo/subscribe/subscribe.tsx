'use client';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTitle } from '@mui/material';
import { getSubscriptionPlanList, subscribePlan, getRechargeOptionList } from 'data-center';
import { timestampToString } from 'lib';
import { useUserStore } from '@/app/userStore';
import { useNotificationStore } from '@/app/notificationStore';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './subscribe.module.scss';
import background from './img/bg.png';
import Title from './img/title.png';
import PayTitle from './img/payTitle.png';
import SubTitle from './img/subTitle.png';
import Vip from './img/vip.png';
import Arrow from './img/arrow.png';
import ActiveArrow from './img/activeArrow.png';
import starIcon from './img/starIcon.png';
import checkbox from './img/checkbox.png';
import checkedbox from './img/checkedbox.png';
import VipIcon from './img/vipIcon.png';
import { useSubscribeStore } from './subscribeStore';

function Subscribe({ backHistory }: { backHistory: boolean }) {
    const router = useRouter();
    const switchRef = useRef<HTMLDivElement | null>(null);
    const [intro, setIntro] = useState(false);
    const [protocol, setProtocol] = useState(false);
    const userInfo = useUserStore.use.userInfo();
    const memberSubscribeStatus = useUserStore.use.memberSubscribeStatus();
    const planList = useSubscribeStore.use.planList();
    const yearPlanList = useSubscribeStore.use.yearPlanList();
    const planId = useSubscribeStore.use.planId();
    const isVip = useSubscribeStore.use.isVip();
    const isChecked = useSubscribeStore.use.isChecked();
    const setPlanId = useSubscribeStore.use.setPlanId();
    const setIsVip = useSubscribeStore.use.setIsVip();
    const setIsChecked = useSubscribeStore.use.setIsChecked();
    const setYearPlanList = useSubscribeStore.use.setYearPlanList();
    const setPlanList = useSubscribeStore.use.setPlanList();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    useEffect(() => {
        const getYearSubscribe = async () => {
            const res = await getSubscriptionPlanList();
            if (res.success) {
                setYearPlanList(res.data);
            }
        };

        const getRechargeList = async () => {
            const res = await getRechargeOptionList({ currencyCode: 'cny' });

            if (res.success) {
                setPlanList(res.data.list);
            }
        };

        void getYearSubscribe();
        void getRechargeList();
    }, [setYearPlanList, setPlanList]);

    const back = () => {
        if (backHistory) {
            router.back();
        } else {
            router.push('/userInfo');
        }
    };

    const handlePlanClick = (id: number) => {
        setPlanId(id);
        setIsVip(false);
    };

    const handleVipClick = () => {
        setIsVip(true);
        setPlanId(0);
    };

    const handleSubscribeButtonOnClick = async () => {
        if (isVip || memberSubscribeStatus.planId === 1) {
            const res = await subscribePlan({ memberId: userInfo.uid, planId: yearPlanList[0].id });
            if (res.success) {
                setIsVisible(
                    `您的年卡訂閱已開通\n生效期間: ${timestampToString(
                        res.data.planStartAt,
                        'YYYY-MM-DD'
                    )}~${timestampToString(res.data.planEndAt, 'YYYY-MM-DD')}`,
                    'success'
                );
                setTimeout(() => {
                    router.push('/userInfo');
                }, 2000);
            } else {
                setIsVisible('余额不足!', 'error');
            }
        }

        if (!isVip) {
            setIsVisible('充值成功!', 'success');
            setTimeout(() => {
                router.push('/userInfo');
            }, 2000);
        }
    };

    const handleIntroOpen = () => {
        setIntro(true);
    };

    const handleIntroClose = () => {
        setIntro(false);
    };

    const handleProtocolOpen = () => {
        setProtocol(true);
    };

    const handleProtocolClose = () => {
        setProtocol(false);
    };

    return (
        <>
            <div className={style.subscribe}>
                <Image alt="" className={style.background} src={background} />
                <div className={style.placeholder}>
                    <div className={style.headerDetail}>
                        <div className={style.title}>
                            <Image
                                alt=""
                                height={24}
                                onClick={back}
                                src={backLeftArrowImg}
                                width={24}
                            />
                            <div className={style.text}>开通订阅</div>
                            <button
                                className={style.publish}
                                onClick={handleIntroOpen}
                                type="button"
                            >
                                说明
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.vipBlock}>
                    <Image alt="" className={style.title} src={Title} />
                    <Image alt="" className={style.vip} src={Vip} />
                    {memberSubscribeStatus.planId !== 1 && (
                        <div className={style.block}>
                            <button
                                className={`${style.button} ${isVip ? style.active : ''}`}
                                onClick={handleVipClick}
                                type="button"
                            >
                                {isVip ? (
                                    <Image alt="" height={6} src={ActiveArrow} width={9} />
                                ) : (
                                    <Image alt="" height={6} src={Arrow} width={9} />
                                )}
                                <span>{isVip ? '选择VIP方案' : '选择'}</span>
                            </button>
                        </div>
                    )}
                </div>
                <div
                    className={`${style.content} ${
                        memberSubscribeStatus.planId === 1 ? style.subscribeState : ''
                    }`}
                >
                    <div className={style.layout}>
                        {memberSubscribeStatus.planId !== 1 ? (
                            <>
                                <Image alt="" className={style.title} src={PayTitle} />
                                <div className={style.planContainer} ref={switchRef}>
                                    {planList.map(plan => (
                                        <div className={`${style.wrapper}`} key={plan.id}>
                                            <div
                                                className={`${style.plan} ${
                                                    planId === plan.id ? style.selectedPlan : ''
                                                }`}
                                                onClick={() => {
                                                    handlePlanClick(plan.id);
                                                }}
                                            >
                                                <div className={style.discount}>
                                                    {plan.titleDesc}
                                                </div>
                                                <div className={style.text}>
                                                    {planId === plan.id && (
                                                        <Image
                                                            alt=""
                                                            className={style.icon}
                                                            height={16}
                                                            src={starIcon}
                                                            width={16}
                                                        />
                                                    )}
                                                    <span className={style.bold}>
                                                        {plan.rechargeAmount}
                                                    </span>
                                                    <span className={style.light}>平台币</span>
                                                </div>
                                                <div className={`${style.text} ${style.coin}`}>
                                                    <span>{plan.paymentAmount}</span> 元
                                                </div>
                                                <button
                                                    className={style.selectedFlag}
                                                    type="button"
                                                >
                                                    {planId === plan.id && (
                                                        <Image
                                                            alt=""
                                                            height={6}
                                                            src={Arrow}
                                                            width={9}
                                                        />
                                                    )}
                                                    <span>选择</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={`${style.rights} ${
                                        planId === 1 ? style.firstRaduis : ''
                                    } ${planId === 4 ? style.lastRaduis : ''} `}
                                >
                                    <div className={style.descript}>充值金币可以购买以下内容</div>
                                    <ul className={style.list}>
                                        <li>- 赛事高手，球赛群众风向指引</li>
                                        <li>- 专家致富猜球文章</li>
                                        <li>- 智能运算全球赛事大数据分析图表</li>
                                        <li>- 智能运算全球赛事盘路玩法提示</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className={style.block}>
                                <Image alt="" className={style.title} src={SubTitle} />
                                <span className={style.text}>
                                    <Image alt="" height={14} src={VipIcon} width={18} />
                                    无限畅享 VIP （年卡365天）
                                </span>
                                <span className={style.time}>
                                    到期日{' '}
                                    {timestampToString(
                                        memberSubscribeStatus.planEndAt,
                                        'YYYY-MM-DD'
                                    )}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={style.agreement}>
                        {isChecked ? (
                            <Image
                                alt=""
                                height={16}
                                onClick={() => {
                                    setIsChecked(false);
                                }}
                                src={checkedbox}
                                width={16}
                            />
                        ) : (
                            <Image
                                alt=""
                                height={16}
                                onClick={() => {
                                    setIsChecked(true);
                                }}
                                src={checkbox}
                                width={16}
                            />
                        )}
                        <div>
                            已同意
                            <span className={style.protocol} onClick={handleProtocolOpen}>
                                会员服务协议
                            </span>
                        </div>
                    </div>
                    <button
                        className={style.submit}
                        disabled={!isChecked}
                        onClick={handleSubscribeButtonOnClick}
                        type="button"
                    >
                        {memberSubscribeStatus.planId === 1 ? '续约' : '立即开通'}
                    </button>
                </div>
            </div>
            <Dialog onClose={handleIntroClose} open={intro}>
                <DialogTitle>说明</DialogTitle>
                <div className={style.dialogContent}>
                    <p>
                        赛事高手，球赛群众风向指引
                        <br />
                        专家致富猜球文章
                        <br />
                        智能运算全球赛事大数据分析图表
                        <br />
                        智能运算全球赛事盘路玩法提示
                    </p>
                </div>
            </Dialog>

            <Dialog onClick={handleProtocolClose} open={protocol}>
                <DialogTitle>会员服务协议</DialogTitle>
                <div className={style.dialogContent}>
                    <p>
                        欢迎您使用未來体育会员服务！
                        为使用未來体育会员服务（简称为：本服务），您应当阅读并遵守《未來体育会员服务协议》（简称为：本协议）。请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。免除或限制责任条款可能以加粗等形式提示您注意。
                        除非您已阅读并接受本协议所有条款，否则您无权使用本服务。您对本服务的任何购买或接受赠与等获取行为及登录、查看等任何使用行为即视为您已阅读并同意本协议的约束。
                        如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。
                        一、【协议的范围】 1.1【协议适用主体范围】
                        本协议是您与未來之间关于您使用本服务所订立的协议 1.2【本服务内容】
                        本协议视为《未來服务协议》（链接地址：http://www.qq.com/contract.shtml，若链接地址变更的，则以变更后的链接地址所对应的内容为准；其他链接地址变更的情形，均适用前述约定。）、《QQ号码规则》（链接地址：http://zc.qq.com/chs/agreement1_chs.html）的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。
                        本协议内容同时包括未來可能不断发布的关于本服务的相关协议、业务规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。
                        二、【关于本服务】
                        包月增值服务，指按照未來指定的方式支付一定包月服务费用之后，用户可以享有由未來或第三方提供的在未來产品、音乐、游戏、生活等方面特权的服务，简称为：本服务。
                        未來可能会根据不同的产品及服务类型，推出不同的包月增值服务，目前，未來提供QQ会员、超级会员、黄钻、绿钻、红钻等不同种类的包月增值服务，同时，未來也可能会根据用户的需求、产品及服务类型的变化等，对现有包月增值服务种类进行调整以及不断推出新的包月增值服务种类。未來也可能会在不同时间推出具体不同的服务内容，以不断完善、优化本服务。具体包月增值服务种类及服务内容以相关服务页面公布、实际提供的内容为准。您可以自行根据需要选择相应服务。
                        您所享有的本服务的具体内容可能会因为级别、是否年费、开通期限、您选择的具体服务类别等因素而有不同，通常高级别、开通年费服务、开通期限较长等情况下，您将会享有更多的服务，具体以相关服务页面公布、实际提供的内容为准。
                        您理解并同意：您通过未來指定渠道开通本服务后，可能会由于您使用的软件版本、设备、操作系统等不同以及其他第三方原因等导致您实际可使用的具体服务有差别，由此可能给您带来的不便，您表示理解，并不会因此向未來提出任何主张或追究未來的任何责任。
                        三、权利义务 3.1 【关于收费】
                        本服务是未來提供的收费服务，您须在按照本服务的收费标准支付相应费用后，方可使用本服务。此外，您可能也可以通过接受好友赠送等未來认可的其他方式享有、使用本服务。
                        未來可能会根据本服务的整体规划，对本服务相关权益细则、收费标准、方式等进行修改和变更，前述修改、变更，未來将在相应服务页面进行展示。您若需要获取、使用本服务，请先提前了解清楚当时关于本服务的收费标准、方式等信息。
                        3.2【服务开通】
                        3.2.1您应该通过未來指定的包括但不限于银行卡、财付通、QQ卡、手机充值卡、Q币、Q点等现有方式或今后未來指定方式，在依约支付一定费用后开通本服务。本服务开通之后，不可进行转让或退订。
                        您理解并同意：对于通过手机短信方式开通本服务的用户，为了保护QQ用户和手机用户的帐户安全、保障用户权益，未來有权对手机用户的交易及使用行为进行独立判断。如果未來根据一般的常识判断认为可能存在风险，您将无法完成重复开通的操作，请您改用未來其他渠道（如Q点Q币、网银、财付通等）开通本服务。为了保障手机用户帐户安全，手机用户当月开通未來业务数量或绑定QQ数量不能超过未來规定的上限，上限由未來根据正常用户需求独立确定，已超过上限后将不再支持通过手机短信方式开通本服务，请您改用未來其他渠道（如Q点Q币、网银、财付通等）开通本服务。对于前述由于未來采取的相关措施导致您可能无法开通本服务或可能给您造成损失的，您同意自行承担相关责任和损失。
                        3.2.2您应该通过未來指定的包括但不限于银行卡、财付通、QQ卡、手机充值卡、Q币或Q点等现有方式或今后未來指定方式，在依约支付一定费用后开通本服务。本服务开通之后，不可进行转让。
                        同时，您不得通过以下任何方式为自己或他人开通本服务：
                        （1）以营利、经营等非个人使用的目的为自己或他人开通本服务；
                        （2）通过任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件等任何程序、软件方式为自己或他人开通本服务；
                        （3）通过任何不正当手段或以违反诚实信用原则的方式为自己或他人开通本服务；
                        （4）通过非未來指定的方式为自己或他人开通本服务；
                        （5）通过侵犯未來或他人合法权益的方式为自己或他人开通本服务；
                        （6）通过其他违反相关法律、行政法规、国家政策等的方式为自己或他人开通本服务。
                        3.3 【服务期限】
                        3.3.1本服务的服务期限以您自行选择并支付相应服务费用的期限为准，您也可以登陆未來充值中心或者本服务的相应页面查询。
                        3.3.2 本服务的服务开通最高期限会受到一定限制，具体以未來制定的的规则为准。
                        3.4 【行为规范】 3.4.1【五不准】
                        您在使用本服务时不得利用本服务从事以下行为，包括但不限于：
                        （1）发布、传送、传播、储存违反国家法律、危害国家安全统一、社会稳定、公序良俗、社会公德以及侮辱、诽谤、淫秽、暴力的内容；
                        （2）发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
                        （3）虚构事实、隐瞒真相以误导、欺骗他人；
                        （4）发表、传送、传播广告信息及垃圾信息；
                        （5）从事其他违反法律法规、政策及公序良俗、社会公德等的行为。
                        3.4.2【用户禁止行为】
                        本服务仅供您个人使用，除非经未來书面许可，您不得进行以下行为：
                        （1）通过任何方式搜集本服务中其他用户的用户名、电子邮件等相关信息，并以发送垃圾邮件、连锁邮件、垃圾短信、即时消息等方式干扰、骚扰其他用户；
                        （2）通过本服务发布包含广告、宣传、促销等内容的信息；
                        （3）将本服务再次许可他人使用； （4）其他未经未來书面许可的行为。
                        3.4.3【对自己行为负责】
                        您充分了解并同意，您必须为自己注册帐号下的一切行为负责，包括但不限于您所发表的任何内容以及由此产生的任何后果。您应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。
                        3.5【服务的变更、中止或终止】
                        您充分了解并同意，由于互联网服务的特殊性，未來可能会按照相关法规、双方约定或在其他必要时，中止或终止向您提供本服务，届时，未來会依法保护您的合法权益。
                        四、【违约责任】 4.1
                        如果未來发现或收到他人举报您有违反本协议任何行为的，未來有权依法进行独立判断并采取技术手段予以删除、屏蔽或断开相关的信息。同时，未來有权视您的行为性质，对您采取包括但不限于暂停或终止部分或全部本服务、中止或终止您对QQ号码使用、追究您法律责任等措施，未來也无需向您退还任何费用，而由此给您带来的损失（包括但不限于通信中断、相关数据清空、未使用的服务费用作为违约金而归未來所有等），由您自行承担，造成未來损失的，您也应予以赔偿。
                        4.2 【对第三方损害的处理】 五、【其他】 5.1 【协议的生效】
                        您使用本服务即视为您已阅读并同意受本协议的约束。 5.2 【协议签订地】
                        本协议签订地为中华人民共和国广东省深圳市南山区。 5.3 【适用法律】
                        本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。
                        5.4 【争议解决】
                        若您和未來之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。
                        5.5 【条款标题】
                        本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。
                        5.6 【条款效力】
                        本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
                    </p>
                </div>
            </Dialog>
        </>
    );
}

export default Subscribe;
