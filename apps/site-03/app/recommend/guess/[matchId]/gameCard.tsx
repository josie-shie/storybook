import Image from 'next/image';
import Fire from './img/fire.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Gone from './img/gone.png';
import BigWin from './img/BigWin.png';
// import BigLose from './img/BigLose.png';
// import BigGone from './img/bigGone.png';
import Star from './img/star.png';
import style from './gameCard.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface GameCardProps {
    name: string;
    text: string;
    league: string;
    globalUnlock: boolean;
    localIsUnlocked: boolean;
    onOpenPaidDialog: () => void;
}

function GameCard({
    name,
    text,
    league,
    globalUnlock,
    localIsUnlocked,
    onOpenPaidDialog
}: GameCardProps) {
    const isContentUnlocked = globalUnlock || localIsUnlocked;

    const tagProps = text.includes('连红')
        ? { icon: <Image alt="" src={Fire} width={8} />, text }
        : { icon: undefined, text, background: '#4489ff' };

    return (
        <div className={style.gameCard}>
            <div className={style.detail}>
                <Avatar />
                <div className={style.details}>
                    <span>{name}</span>
                    <Tag {...tagProps} />
                    <div className={style.league}>{league}</div>
                    <ul className={style.ballList}>
                        <li>
                            <Image alt="winIcon" src={Win} width={18} />
                        </li>
                        <li>
                            <Image alt="loseIcon" src={Lose} width={18} />
                        </li>
                        <li>
                            <Image alt="winIcon" src={Win} width={18} />
                        </li>
                        <li>
                            <Image alt="loseIcon" src={Lose} width={18} />
                        </li>
                        <li>
                            <Image alt="winIcon" src={Win} width={18} />
                        </li>
                        <li>
                            <Image alt="loseIcon" src={Lose} width={18} />
                        </li>
                        <li>
                            <Image alt="goneIcon" src={Gone} width={18} />
                        </li>
                        <li>
                            <Image alt="goneIcon" src={Gone} width={18} />
                        </li>
                        <li>
                            <Image alt="winIcon" src={Win} width={18} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                {isContentUnlocked ? (
                    <div className={style.hit}>
                        <Image alt="hitIcon" height={36} src={BigWin} width={36} />
                        <div className={style.play}>一球/球半</div>
                        <div className={style.paidContent}>
                            <div className={style.play}>小</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={style.noPaid} onClick={onOpenPaidDialog}>
                            <Image alt="star" className={style.image} src={Star} width={14} />
                            <span className={style.text}>20元</span>
                        </div>
                        <div className={style.play}>一球/球半</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GameCard;
