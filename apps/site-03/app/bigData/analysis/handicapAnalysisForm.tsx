import Image from 'next/image';
import { useHandicapAnalysisFormStore } from '../formStore';
import style from './disSelect.module.scss';
import bulbIcon from './img/bulb.png';
import contentImage from './img/content.png';

function Tips() {
    const openTips = useHandicapAnalysisFormStore.use.openTips();
    const setOpenTips = useHandicapAnalysisFormStore.use.setOpenTips();
    const isTipsOpened = useHandicapAnalysisFormStore.use.isTipsOpened();
    const setIsTipsOpened = useHandicapAnalysisFormStore.use.setIsTipsOpened();

    const showTips = () => {
        setOpenTips(true);

        if (!isTipsOpened) {
            setIsTipsOpened(true);
        }
    };

    const hideTips = () => {
        setOpenTips(false);

        if (!isTipsOpened) {
            setIsTipsOpened(true);
        }
    };

    return (
        <div className={style.tips} style={{ backgroundColor: openTips ? '#F6F6F6' : '#FFF' }}>
            {isTipsOpened && !openTips ? (
                <div className={style.tipsShort}>
                    <Image alt="bulb" height={16} src={bulbIcon.src} width={16} />
                    <span className={style.title}>何谓盘路分析？</span>
                    <span className={style.showTips} onClick={showTips}>
                        了解更多
                    </span>
                </div>
            ) : null}
            {!isTipsOpened || openTips ? (
                <>
                    <div className={style.title}>
                        <Image alt="bulb" height={16} src={bulbIcon.src} width={16} />
                        您可获得：
                    </div>
                    <div className={style.content}>
                        <p className={style.description}>
                            选择让分盘或大小盘，可获取指定时间内智能盘口命中分析：让分大小、进球数区间、15分钟进球、全场波胆
                        </p>
                        {openTips ? (
                            <Image alt="" height={415} src={contentImage.src} width={342} />
                        ) : null}
                    </div>
                </>
            ) : null}
            {!isTipsOpened || openTips ? (
                <div
                    className={style.bottom}
                    style={{ justifyContent: openTips ? 'center' : 'space-between' }}
                >
                    <div className={style.hideTips} onClick={hideTips}>
                        隐藏提示
                    </div>
                    {!openTips ? (
                        <div className={style.showTips} onClick={showTips}>
                            了解更多
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

function HandicapAnalysisForm() {
    return <Tips />;
}

export default HandicapAnalysisForm;
