import Image from 'next/image';
import UnlockButton from '@/components/unlockButton/unlockButton';
import iconWin from './img/win.png';
import iconDefeat from './img/defeat.png';
import style from './bettingPlan.module.scss';

interface PropsType {
    result?: 'win' | 'defeat';
}

const iconMap = {
    win: <Image alt="icon" className={style.iconWin} src={iconWin} />,
    defeat: <Image alt="icon" className={style.iconDefeat} src={iconDefeat} />
};

function BettingPlan({ result }: PropsType) {
    const icon = result ? iconMap[result] : null;

    return (
        <div className={style.bettingPlan}>
            {icon}
            <div className={style.top}>
                欧锦U20A
                <span className={style.time}> | 09-05 16:45</span>
            </div>
            <div className={style.mid}>
                <span className={style.plan}>让球</span>
                <div className={style.combination}>德國U20A vs 斯洛文尼亚U20</div>
            </div>
            <div className={style.bot}>
                <div className={style.message}>2.5 大</div>
                <UnlockButton />
            </div>
        </div>
    );
}

export default BettingPlan;
