import { useState } from 'react';
import style from './tips.module.scss';
import MagnifyingGlass from './img/magnifyingGlass.svg';

function Tips() {
    const [openTips, setOpenTips] = useState(true);

    const showTips = () => {
        setOpenTips(true);
    };

    const toogleTips = () => {
        setOpenTips(preStatus => {
            return !preStatus;
        });

        const element = document.getElementById('bigDataAnalysis');
        if (element) {
            element.scrollTop = 0;
        }
    };

    return (
        <div className={style.tips}>
            <div className={style.tipsShort}>
                <MagnifyingGlass />
                <span className={style.title}>使用AI智能分析您可获得...</span>
            </div>
            {openTips ? (
                <div className={style.content}>
                    <p className={style.description}>
                        选择让分或大小盘，获取指定时间内所有賽事智能盘口分析包括：让球大小、进球数区间、15分钟进球、波胆
                    </p>
                </div>
            ) : null}
            <div className={style.bottom}>
                <div className={style.hideTips} onClick={toogleTips}>
                    隐藏
                </div>
                <div className={style.showTips} onClick={showTips}>
                    教学
                </div>
            </div>
        </div>
    );
}

export default Tips;
