import Image from 'next/image';
import { timestampToString } from 'lib';
import { type MemberIndividualGuessMatch } from 'data-center';
import Link from 'next/link';
import BigGone from '../img/bigGone.png';
import BigWin from '../img/bigWin.png';
import BigLose from '../img/bigLose.png';
import style from './bettingPlan.module.scss';

interface PropsType {
    rowData: MemberIndividualGuessMatch;
}

const iconMap = {
    WIN: <Image alt="icon" className={style.iconWin} src={BigWin} />,
    LOSE: <Image alt="icon" className={style.iconDefeat} src={BigLose} />,
    DRAW: <Image alt="icon" className={style.iconDefeat} src={BigGone} />,
    NONE: null
};

const messageFormat = (predictedPlay: string, item: MemberIndividualGuessMatch) => {
    const commonSpan = (text: string) => (
        <span className={item.predictionResult === 'WIN' ? style.red : style.gray}> {text}</span>
    );

    switch (predictedPlay) {
        case 'OVER':
            return (
                <>
                    <span>{item.overUnderOdds}</span>
                    {commonSpan('大')}
                </>
            );
        case 'UNDER':
            return (
                <>
                    <span>{item.overUnderOdds}</span>
                    {commonSpan('小')}
                </>
            );
        case 'HOME':
            return (
                <>
                    <span>{item.handicapInChinese}</span>
                    {commonSpan(item.homeTeamName)}
                </>
            );
        case 'AWAY':
            return (
                <>
                    <span>{item.handicapInChinese}</span>
                    {commonSpan(item.awayTeamName)}
                </>
            );
        default:
            return null;
    }
};

const getPredictedPlayName = (predictedPlay: string) => {
    switch (predictedPlay) {
        case 'HOME':
            return '胜负';
        case 'AWAY':
            return '胜负';
        case 'HANDICAP':
            return '胜负';
        case 'OVER':
            return '总进球';
        case 'UNDER':
            return '总进球';
        case 'OVERUNDER':
            return '总进球';
    }
};

function BettingPlan({ rowData }: PropsType) {
    return (
        <Link className={style.bettingPlan} href={`/football/${rowData.matchId}`}>
            {iconMap[rowData.predictionResult]}
            <div className={style.top}>
                {rowData.leagueName}{' '}
                <span className={style.time}>
                    | {timestampToString(rowData.matchTime, 'MM-DD HH:mm')}
                </span>
            </div>
            <div className={style.mid}>
                <span className={style.plan}>{getPredictedPlayName(rowData.predictedPlay)}</span>
                <div className={style.combination}>
                    {rowData.homeTeamName}
                    vs
                    {rowData.awayTeamName}
                </div>
            </div>
            <div className={style.bot}>
                <div className={style.message}>{messageFormat(rowData.predictedPlay, rowData)}</div>
            </div>
        </Link>
    );
}

export default BettingPlan;
