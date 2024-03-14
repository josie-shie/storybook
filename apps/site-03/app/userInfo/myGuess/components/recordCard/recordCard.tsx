'use client';
import Image from 'next/image';
import type { TagType, MemberGuessViewingRecord } from 'data-center';
import { convertHandicap } from 'lib';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import Tag from '@/components/tag/tag';
import BigWin from '@/public/resultIcon/bigWin.svg';
import BigLose from '@/public/resultIcon/bigLose.svg';
import BigDraw from '@/public/resultIcon/bigDraw.svg';
import Win from '@/public/resultIcon/hit.svg';
import Gone from '@/public/resultIcon/draw.svg';
import Miss from '@/public/resultIcon/miss.svg';
import Fire from '../img/fire.png';
import style from './recordCard.module.scss';

function RecordCard({ recordItem }: { recordItem: MemberGuessViewingRecord }) {
    const iconMap = {
        WIN: <Win />,
        LOSE: <Miss />,
        DRAW: <Gone />,
        BIGWIN: <BigWin height="36px" width="36px" />,
        BIGLOSE: <BigLose height="36px" width="36px" />,
        BIGDRAW: <BigDraw height="36px" width="36px" />
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
                    href={`/master/masterAvatar/${recordItem.recordMemberId}?status=guess`}
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
