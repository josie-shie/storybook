import style from './tips.module.scss';
import MagnifyingGlass from './img/magnifyingGlass.svg';

function Tips() {
    return (
        <div className={style.tips}>
            <div className={style.tipsShort}>
                <MagnifyingGlass />
                <span className={style.title}>使用AI智能分析您可获得...</span>
            </div>
            <div className={style.content}>
                <p className={style.description}>
                    选择让分或大小盘，获取指定时间内所有賽事智能盘口分析包括：让球大小、进球数区间、15分钟进球、波胆
                </p>
            </div>
            <div className={style.bottom}>教学</div>
        </div>
    );
}

export default Tips;
