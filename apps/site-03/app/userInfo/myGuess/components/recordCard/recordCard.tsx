'use client';
import Image from 'next/image';
import { type RecordItem } from '../../guessRecord/guessRecordStore';
import Win from '../img/win.png';
import BigWin from '../img/BigWin.png';
import Lose from '../img/lose.png';
import BigLose from '../img/BigLose.png';
import BigGone from '../img/BigGone.png';
import Gone from '../img/gone.png';
import style from './recordCard.module.scss';
import Avatar from '@/components/avatar/avatar';

function RecordCard({ recordItem }: { recordItem: RecordItem }) {
    // const tagProps = recordItem.includes('连红')
    //     ? { icon: <Image alt="" src={Fire} width={8} />, text }
    //     : { icon: undefined, text, background: '#4489ff' };

    const iconMap = {
        win: <Image alt="icon" className={style.iconWin} src={Win} width={18} />,
        lose: <Image alt="icon" className={style.iconDefeat} src={Lose} width={18} />,
        draw: <Image alt="icon" className={style.iconDefeat} src={Gone} width={18} />,
        Bigwin: <Image alt="icon" className={style.iconDefeat} src={BigWin} width={36} />,
        Biglose: <Image alt="icon" className={style.iconDefeat} src={BigLose} width={36} />,
        Bigdraw: <Image alt="icon" className={style.iconDefeat} src={BigGone} width={36} />
    };
    return (
        <div className={style.recordCard}>
            <div className={style.detail}>
                <Avatar />
                <div className={style.details}>
                    <span>{recordItem.name}</span>
                    {/* <Tag {...tagProps} /> */}
                    <div className={style.league}>
                        {recordItem.homeTeam} VS {recordItem.awayTeam}
                    </div>
                    <ul className={style.ballList}>
                        {recordItem.history.map((result, index) => (
                            <li key={`${result + index}`}>{iconMap[recordItem.result]}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                <div className={style.hit}>
                    {iconMap[`Big${recordItem.result}`]}
                    <div className={style.play}>一球/球半</div>
                    <div className={style.paidContent}>
                        <div className={style.play}>小</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecordCard;
