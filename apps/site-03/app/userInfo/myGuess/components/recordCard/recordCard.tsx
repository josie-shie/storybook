'use client';
import Image from 'next/image';
import type { TagType, MemberGuessViewingRecord } from 'data-center';
import { convertHandicap } from 'lib';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import Tag from '@/components/tag/tag';
import Win from '../img/win.png';
import BigWin from '../img/bigWin.png';
import Lose from '../img/lose.png';
import BigLose from '../img/bigLose.png';
import BigGone from '../img/bigGone.png';
import Gone from '../img/gone.png';
import Fire from '../img/fire.png';
import style from './recordCard.module.scss';

function RecordCard({ recordItem }: { recordItem: MemberGuessViewingRecord }) {
    const iconMap = {
        WIN: <Image alt="icon" className={style.iconWin} src={Win} width={18} />,
        LOSE: <Image alt="icon" className={style.iconDefeat} src={Lose} width={18} />,
        DRAW: <Image alt="icon" className={style.iconDefeat} src={Gone} width={18} />,
        BIGWIN: <Image alt="icon" className={style.iconDefeat} src={BigWin} width={36} />,
        BIGLOSE: <Image alt="icon" className={style.iconDefeat} src={BigLose} width={36} />,
        BIGDRAW: <Image alt="icon" className={style.iconDefeat} src={BigGone} width={36} />
    };

    const guessMap = {
        HOME: '主',
        AWAY: '客',
        OVER: '大',
        UNDER: '小'
    };

    const playDisplay = (item: MemberGuessViewingRecord) => {
        if (item.predictedPlay === 'LOCK') return;
        return convertHandicap(
            recordItem.predictedPlay === 'AWAY' || recordItem.predictedPlay === 'HOME'
                ? Math.abs(recordItem.handicapOdds)
                : Math.abs(recordItem.overUnderOdds)
        );
    };

    const tagListFormat = (tagsData: TagType) => {
        const displayData = {
            weekRanking: { rate: tagsData.weekRanking, display: `週榜 ${tagsData.weekRanking}` },
            monthRanking: { rate: tagsData.monthRanking, display: `月榜 ${tagsData.monthRanking}` },
            quarterRanking: {
                rate: tagsData.quarterRanking,
                display: `季榜 ${tagsData.quarterRanking}`
            }
        };
        return Object.entries(displayData).map(([key, value]) => {
            if (value.rate > 0) {
                return <Tag background="#fff" color="#4489ff" key={key} text={value.display} />;
            }
            return null;
        });
    };

    return (
        <div className={style.recordCard}>
            <div className={style.detail}>
                <Link
                    className={style.avatar}
                    href={`/master/masterAvatar/${recordItem.recordMemberId}?status=analysis`}
                >
                    <Avatar />
                </Link>
                <div className={style.details}>
                    <div className={style.nameRow}>
                        <span>{recordItem.memberName}</span>
                        {recordItem.highlights.winRanking > 0 && (
                            <Tag
                                icon={<Image alt="" height={10} src={Fire} width={8} />}
                                text={`${recordItem.highlights.winRanking}连红`}
                            />
                        )}
                        {tagListFormat(recordItem.highlights)}
                    </div>
                    <div className={style.league}>
                        {recordItem.homeTeamName} VS {recordItem.awayTeamName}
                    </div>
                    <ul className={style.ballList}>
                        {recordItem.latestPredictionResult.predictionResults.map(
                            (result, index) => (
                                <li key={`${result + index}`}>{iconMap[result]}</li>
                            )
                        )}
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                <div className={style.hit}>
                    {iconMap[`BIG${recordItem.predictionResult}`]}
                    <div className={style.play}>
                        {playDisplay(recordItem)}
                        {['AWAY', 'HOME'].includes(recordItem.predictedPlay) ? '球' : ''}
                    </div>
                    <div className={style.paidContent}>
                        <div
                            className={`${style.play} ${
                                recordItem.predictionResult === 'WIN' && style.win
                            }`}
                        >
                            {guessMap[recordItem.predictedPlay]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecordCard;
