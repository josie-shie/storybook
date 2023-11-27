import Image from 'next/image';
import style from './analysisItem.module.scss';
import hitIcon from './hit.png';
import UnlockButton from '@/components/unlockButton/unlockButton';

function AnalysisItem() {
    const unlock = style.fake;

    return (
        <div className={style.analysisItem}>
            <div className={style.top}>
                <div className={style.title}>
                    <span className={style.decorate} />
                    【11连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧
                </div>
                <div className={style.unlockStatus}>
                    {unlock ? (
                        <span className={style.unlocked}>已解鎖</span>
                    ) : (
                        <>
                            <UnlockButton />
                            <span className={style.unlockNumber}>已有{2}人解鎖</span>
                        </>
                    )}
                </div>
            </div>
            <div className={style.mid}>
                <div className={style.detail}>
                    欧锦U20A
                    <span className={style.time}> | 09-05 16:45</span>
                </div>
                <div className={style.combination}>
                    德國U20A vs 斯洛文尼亚U20
                    <Image alt="hitIcon" className={style.icon} src={hitIcon} />
                </div>
            </div>
            <div className={style.postTime}>发表于 17:45</div>
        </div>
    );
}

export default AnalysisItem;
