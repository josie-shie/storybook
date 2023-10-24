import Image from 'next/image';
import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import style from './vsBox.module.scss';

interface BettingProps {
    play: string;
    value: number;
    homeUser: number;
    homeType: string;
    awayUser: number;
    awayType: string;
    isUnlocked: boolean;
}

interface VsBoxProps {
    isUnlocked: boolean;
}

function BettingColumn({
    play,
    value,
    homeUser,
    homeType,
    awayUser,
    awayType,
    isUnlocked
}: BettingProps) {
    return (
        <div className={style.column}>
            {isUnlocked ? (
                <div className={style.unLock}>
                    <div className={style.button}>
                        <span className={style.team}>{homeType}</span>
                        <span className={style.user}>{homeUser}人</span>
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>
                            <span className={style.home}>{homeUser}%</span>
                            <span className={style.ing}>{play}</span>
                            <span className={style.away}>{awayUser}%</span>
                        </div>
                        <ProgressBar
                            background="rgba(255 255 255 / 50%)"
                            fill="#73ddff"
                            gapSize="large"
                            height={8}
                            radius
                            skewGap
                            value={value}
                        />
                    </div>
                    <div className={style.button}>
                        <span className={style.team}>{awayType}</span>
                        <span className={style.user}>{awayUser}人</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className={style.button}>{homeType}</div>
                    <div className={style.progress}>
                        <div className={style.play}>{play}</div>
                        <div className={style.line} />
                    </div>
                    <div className={style.button}>{awayType}</div>
                </>
            )}
        </div>
    );
}

function VsBox({ isUnlocked }: VsBoxProps) {
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
                <BettingColumn
                    awayType="客"
                    awayUser={4}
                    homeType="主"
                    homeUser={88}
                    isUnlocked={isUnlocked}
                    play="一球/球半"
                    value={88}
                />
                <BettingColumn
                    awayType="小"
                    awayUser={4}
                    homeType="大"
                    homeUser={88}
                    isUnlocked={isUnlocked}
                    play="一球/球半"
                    value={88}
                />
            </div>
        </div>
    );
}

export default VsBox;
