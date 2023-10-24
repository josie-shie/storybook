import Image from 'next/image';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import style from './vsBox.module.scss';

interface BettingProps {
    play: string;
    leftType: string;
    rightType: string;
}

function BettingColumn({ play, leftType, rightType }: BettingProps) {
    return (
        <div className={style.column}>
            <div className={style.button}>{leftType}</div>
            <div className={style.progress}>
                <div className={style.play}>{play}</div>
                <div className={style.line} />
            </div>
            <div className={style.button}>{rightType}</div>
        </div>
    );
}

function VsBox() {
    return (
        <div className={style.vsBox}>
            <div className={style.title}>歐錦U20A 7-14 01:00</div>
            <div className={style.clubInfo}>
                <div className={style.team}>
                    <Image alt="" height={48} src={ThaiUniversityClubIcon} width={48} />
                    <div className={style.name}>泰国国立法政大学</div>
                </div>
                <div className={style.fight}>VS</div>
                <div className={style.team}>
                    <Image alt="" height={48} src={NorthBangKokClubIcon} width={48} />
                    <div className={style.name}>北曼谷學院</div>
                </div>
            </div>
            <div className={style.join}>
                <span className={style.text}>1234人参与競猜，点击预测后查看风向</span>
            </div>
            <div className={style.betting}>
                <BettingColumn leftType="主" play="一球/球半" rightType="客" />
                <BettingColumn leftType="大" play="一球/球半" rightType="小" />
            </div>
        </div>
    );
}

export default VsBox;
