'use client';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTitle } from '@mui/material';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './subscribe.module.scss';
import background from './img/bg.png';
import Title from './img/title.png';
import PayTitle from './img/payTitle.png';
import Vip from './img/vip.png';
import Arrow from './img/arrow.png';
import ActiveArrow from './img/activeArrow.png';
import starIcon from './img/starIcon.png';
import checkbox from './img/checkbox.png';
import checkedbox from './img/checkedbox.png';
import { useSubscribeStore } from './subscribeStore';

function Subscribe() {
    const router = useRouter();
    const switchRef = useRef<HTMLDivElement | null>(null);
    const [intro, setIntro] = useState(false);
    const [protocol, setProtocol] = useState(false);
    const planList = useSubscribeStore.use.planList();
    const planId = useSubscribeStore.use.planId();
    const isVip = useSubscribeStore.use.isVip();
    const isChecked = useSubscribeStore.use.isChecked();
    const masterPlan = useSubscribeStore.use.masterPlan();
    const unlockArticle = useSubscribeStore.use.unlockArticle();
    const setPlanId = useSubscribeStore.use.setPlanId();
    const setIsVip = useSubscribeStore.use.setIsVip();
    const setIsChecked = useSubscribeStore.use.setIsChecked();
    const setMasterPlan = useSubscribeStore.use.setMasterPlan();
    const setUnlockArticle = useSubscribeStore.use.setUnlockArticle();
    const [indicatorStyle, setIndicatorStyle] = useState({ left: '0', width: '98px' });

    const handlePlanClick = (id: number, plan: number, unlock: number) => {
        setPlanId(id);
        setIsVip(false);
        setMasterPlan(plan);
        setUnlockArticle(unlock);
    };

    const handleVipClick = () => {
        setIsVip(!isVip);
        setPlanId(0);
    };

    const handleSubscribeButtonOnClick = () => {
        router.push('https://www.newebpay.com/');
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

    const updateIndicator = () => {
        const switchElement = switchRef.current;
        if (switchElement) {
            const activeElement = switchElement.querySelector(`.${style.active}`);
            if (activeElement && activeElement instanceof HTMLElement) {
                setIndicatorStyle({
                    left: `${activeElement.offsetLeft}px`,
                    width: `${activeElement.offsetWidth}px`
                });
            }
        }
    };

    useEffect(updateIndicator, [planId]);

    return (
        <>
            <div className={style.subscribe}>
                <Image alt="" className={style.background} layout="fill" src={background} />
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
                            <div className={style.text}>開通訂閱</div>
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
                </div>
                <div className={style.content}>
                    <Image alt="" className={style.title} src={PayTitle} />
                    <div className={style.planContainer} ref={switchRef}>
                        {planList.map(plan => (
                            <div
                                className={`${style.wrapper} ${
                                    planId === plan.planId ? style.active : ''
                                }`}
                                key={plan.planId}
                            >
                                <div
                                    className={`${style.plan} ${
                                        planId === plan.planId ? style.selectedPlan : ''
                                    }`}
                                    onClick={() => {
                                        handlePlanClick(plan.planId, plan.freePlan, plan.unlock);
                                    }}
                                >
                                    <div className={style.discount}>{plan.discount}</div>
                                    <div className={style.text}>
                                        {planId === plan.planId && (
                                            <Image
                                                alt=""
                                                className={style.icon}
                                                height={16}
                                                src={starIcon}
                                                width={16}
                                            />
                                        )}
                                        <span className={style.bold}>{plan.period}</span>
                                        <span className={style.light}>平台币</span>
                                    </div>
                                    <div className={`${style.text} ${style.coin}`}>
                                        <span>{plan.price}</span> 元
                                    </div>
                                    <button className={style.selectedFlag} type="button">
                                        {planId === plan.planId && (
                                            <Image alt="" height={6} src={Arrow} width={9} />
                                        )}
                                        <span>选择</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {!isVip ? (
                            <div
                                className={`indicator ${style.indicator}`}
                                style={indicatorStyle}
                            />
                        ) : null}
                    </div>
                    <div
                        className={`${style.rights} ${planId === 1 ? style.firstRaduis : ''} ${
                            planId === 4 ? style.lastRaduis : ''
                        } `}
                    >
                        <div className={style.descript}>充值金币可以购买以下内容</div>
                        <ul className={style.list}>
                            <li> - 所有赛事高手分配免费解锁</li>
                            <li> - 每日可免费查看{isVip ? '无限' : masterPlan}则高手方案</li>
                            <li> - 每日可免费解锁{isVip ? '无限' : unlockArticle}篇专家预测文章</li>
                            <li> - 不限次数使用盘路分析功能</li>
                        </ul>
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
                                會員服務協議
                            </span>
                        </div>
                    </div>
                    <button
                        className={style.submit}
                        disabled={!isChecked}
                        onClick={handleSubscribeButtonOnClick}
                        type="button"
                    >
                        立即开通
                    </button>
                </div>
            </div>
            <Dialog onClose={handleIntroClose} open={intro}>
                <DialogTitle>说明</DialogTitle>
                <div className={style.dialogContent}>
                    <p>
                        所有赛事高手分配免费解锁
                        <br />
                        每日可免費查看高手方案
                        <br />
                        每日可免費解鎖專家預測文章
                        <br />
                        不限次數使用盤路分析功能
                    </p>
                </div>
            </Dialog>

            <Dialog onClick={handleProtocolClose} open={protocol}>
                <DialogTitle>会员服务协议</DialogTitle>
                <div className={style.dialogContent}>
                    <p>
                        欢迎您使用腾讯体育会员服务！
                        为使用腾讯体育会员服务（简称为：本服务），您应当阅读并遵守《腾讯体育会员服务协议》（简称为：本协议）。请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。免除或限制责任条款可能以加粗等形式提示您注意。
                        除非您已阅读并接受本协议所有条款，否则您无权使用本服务。您对本服务的任何购买或接受赠与等获取行为及登录、查看等任何使用行为即视为您已阅读并同意本协议的约束。
                        如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。
                        一、【协议的范围】 1.1【协议适用主体范围】
                        本协议是您与腾讯之间关于您使用本服务所订立的协议 1.2【本服务内容】
                        本协议视为《腾讯服务协议》（链接地址：http://www.qq.com/contract.shtml，若链接地址变更的，则以变更后的链接地址所对应的内容为准；其他链接地址变更的情形，均适用前述约定。）、《QQ号码规则》（链接地址：http://zc.qq.com/chs/agreement1_chs.html）的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。
                        本协议内容同时包括腾讯可能不断发布的关于本服务的相关协议、业务规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。
                        二、【关于本服务】
                        包月增值服务，指按照腾讯指定的方式支付一定包月服务费用之后，用户可以享有由腾讯或第三方提供的在腾讯产品、音乐、游戏、生活等方面特权的服务，简称为：本服务。
                        腾讯可能会根据不同的产品及服务类型，推出不同的包月增值服务，目前，腾讯提供QQ会员、超级会员、黄钻、绿钻、红钻等不同种类的包月增值服务，同时，腾讯也可能会根据用户的需求、产品及服务类型的变化等，对现有包月增值服务种类进行调整以及不断推出新的包月增值服务种类。腾讯也可能会在不同时间推出具体不同的服务内容，以不断完善、优化本服务。具体包月增值服务种类及服务内容以相关服务页面公布、实际提供的内容为准。您可以自行根据需要选择相应服务。
                        您所享有的本服务的具体内容可能会因为级别、是否年费、开通期限、您选择的具体服务类别等因素而有不同，通常高级别、开通年费服务、开通期限较长等情况下，您将会享有更多的服务，具体以相关服务页面公布、实际提供的内容为准。
                        您理解并同意：您通过腾讯指定渠道开通本服务后，可能会由于您使用的软件版本、设备、操作系统等不同以及其他第三方原因等导致您实际可使用的具体服务有差别，由此可能给您带来的不便，您表示理解，并不会因此向腾讯提出任何主张或追究腾讯的任何责任。
                        三、权利义务 3.1 【关于收费】
                        本服务是腾讯提供的收费服务，您须在按照本服务的收费标准支付相应费用后，方可使用本服务。此外，您可能也可以通过接受好友赠送等腾讯认可的其他方式享有、使用本服务。
                        腾讯可能会根据本服务的整体规划，对本服务相关权益细则、收费标准、方式等进行修改和变更，前述修改、变更，腾讯将在相应服务页面进行展示。您若需要获取、使用本服务，请先提前了解清楚当时关于本服务的收费标准、方式等信息。
                        3.2【服务开通】
                        3.2.1您应该通过腾讯指定的包括但不限于银行卡、财付通、QQ卡、手机充值卡、Q币、Q点等现有方式或今后腾讯指定方式，在依约支付一定费用后开通本服务。本服务开通之后，不可进行转让或退订。
                        您理解并同意：对于通过手机短信方式开通本服务的用户，为了保护QQ用户和手机用户的帐户安全、保障用户权益，腾讯有权对手机用户的交易及使用行为进行独立判断。如果腾讯根据一般的常识判断认为可能存在风险，您将无法完成重复开通的操作，请您改用腾讯其他渠道（如Q点Q币、网银、财付通等）开通本服务。为了保障手机用户帐户安全，手机用户当月开通腾讯业务数量或绑定QQ数量不能超过腾讯规定的上限，上限由腾讯根据正常用户需求独立确定，已超过上限后将不再支持通过手机短信方式开通本服务，请您改用腾讯其他渠道（如Q点Q币、网银、财付通等）开通本服务。对于前述由于腾讯采取的相关措施导致您可能无法开通本服务或可能给您造成损失的，您同意自行承担相关责任和损失。
                        3.2.2您应该通过腾讯指定的包括但不限于银行卡、财付通、QQ卡、手机充值卡、Q币或Q点等现有方式或今后腾讯指定方式，在依约支付一定费用后开通本服务。本服务开通之后，不可进行转让。
                        同时，您不得通过以下任何方式为自己或他人开通本服务：
                        （1）以营利、经营等非个人使用的目的为自己或他人开通本服务；
                        （2）通过任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件等任何程序、软件方式为自己或他人开通本服务；
                        （3）通过任何不正当手段或以违反诚实信用原则的方式为自己或他人开通本服务；
                        （4）通过非腾讯指定的方式为自己或他人开通本服务；
                        （5）通过侵犯腾讯或他人合法权益的方式为自己或他人开通本服务；
                        （6）通过其他违反相关法律、行政法规、国家政策等的方式为自己或他人开通本服务。
                        3.3 【服务期限】
                        3.3.1本服务的服务期限以您自行选择并支付相应服务费用的期限为准，您也可以登陆腾讯充值中心或者本服务的相应页面查询。
                        3.3.2 本服务的服务开通最高期限会受到一定限制，具体以腾讯制定的的规则为准。
                        3.4 【行为规范】 3.4.1【五不准】
                        您在使用本服务时不得利用本服务从事以下行为，包括但不限于：
                        （1）发布、传送、传播、储存违反国家法律、危害国家安全统一、社会稳定、公序良俗、社会公德以及侮辱、诽谤、淫秽、暴力的内容；
                        （2）发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
                        （3）虚构事实、隐瞒真相以误导、欺骗他人；
                        （4）发表、传送、传播广告信息及垃圾信息；
                        （5）从事其他违反法律法规、政策及公序良俗、社会公德等的行为。
                        3.4.2【用户禁止行为】
                        本服务仅供您个人使用，除非经腾讯书面许可，您不得进行以下行为：
                        （1）通过任何方式搜集本服务中其他用户的用户名、电子邮件等相关信息，并以发送垃圾邮件、连锁邮件、垃圾短信、即时消息等方式干扰、骚扰其他用户；
                        （2）通过本服务发布包含广告、宣传、促销等内容的信息；
                        （3）将本服务再次许可他人使用； （4）其他未经腾讯书面许可的行为。
                        3.4.3【对自己行为负责】
                        您充分了解并同意，您必须为自己注册帐号下的一切行为负责，包括但不限于您所发表的任何内容以及由此产生的任何后果。您应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。
                        3.5【服务的变更、中止或终止】
                        您充分了解并同意，由于互联网服务的特殊性，腾讯可能会按照相关法规、双方约定或在其他必要时，中止或终止向您提供本服务，届时，腾讯会依法保护您的合法权益。
                        四、【违约责任】 4.1
                        如果腾讯发现或收到他人举报您有违反本协议任何行为的，腾讯有权依法进行独立判断并采取技术手段予以删除、屏蔽或断开相关的信息。同时，腾讯有权视您的行为性质，对您采取包括但不限于暂停或终止部分或全部本服务、中止或终止您对QQ号码使用、追究您法律责任等措施，腾讯也无需向您退还任何费用，而由此给您带来的损失（包括但不限于通信中断、相关数据清空、未使用的服务费用作为违约金而归腾讯所有等），由您自行承担，造成腾讯损失的，您也应予以赔偿。
                        4.2 【对第三方损害的处理】 五、【其他】 5.1 【协议的生效】
                        您使用本服务即视为您已阅读并同意受本协议的约束。 5.2 【协议签订地】
                        本协议签订地为中华人民共和国广东省深圳市南山区。 5.3 【适用法律】
                        本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。
                        5.4 【争议解决】
                        若您和腾讯之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。
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
