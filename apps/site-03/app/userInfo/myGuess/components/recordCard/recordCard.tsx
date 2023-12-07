'use client';
import Image from 'next/image';
import { type RecordItem } from '../../myGuessStore';
import Win from '../img/win.png';
import BigWin from '../img/bigWin.png';
import Lose from '../img/lose.png';
import BigLose from '../img/bigLose.png';
import BigGone from '../img/bigGone.png';
import Gone from '../img/gone.png';
import Fire from '../img/fire.png';
import style from './recordCard.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

function RecordCard({ recordItem }: { recordItem: RecordItem }) {
    const iconMap = {
        win: <Image alt="icon" className={style.iconWin} src={Win} width={18} />,
        lose: <Image alt="icon" className={style.iconDefeat} src={Lose} width={18} />,
        draw: <Image alt="icon" className={style.iconDefeat} src={Gone} width={18} />,
        Bigwin: <Image alt="icon" className={style.iconDefeat} src={BigWin} width={36} />,
        Biglose: <Image alt="icon" className={style.iconDefeat} src={BigLose} width={36} />,
        Bigdraw: <Image alt="icon" className={style.iconDefeat} src={BigGone} width={36} />
    };

    const guessMap = {
        home: '主',
        away: '客',
        big: '大',
        small: '小'
    };

    return (
        <div className={style.recordCard}>
            <div className={style.detail}>
                <Avatar />
                <div className={style.details}>
                    <div className={style.nameRow}>
                        <span>{recordItem.name}</span>
                        <Tag
                            icon={<Image alt="" height={10} src={Fire} width={8} />}
                            text={`${recordItem.hotStreak}连红`}
                        />
                    </div>
                    <div className={style.league}>
                        {recordItem.homeTeam} VS {recordItem.awayTeam}
                    </div>
                    <ul className={style.ballList}>
                        {recordItem.history.map((result, index) => (
                            <li key={`${result + index}`}>{iconMap[result]}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                <div className={style.hit}>
                    {iconMap[`Big${recordItem.result}`]}
                    <div className={style.play}>{recordItem.guessValue}</div>
                    <div className={style.paidContent}>
                        <div
                            className={`${style.play} ${recordItem.result === 'win' && style.win}`}
                        >
                            {guessMap[recordItem.guess]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecordCard;
