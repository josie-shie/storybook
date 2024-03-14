import { timestampToString } from 'lib';
import { type MemberIndividualGuessMatch } from 'data-center';
import Link from 'next/link';
import BigDraw from '@/public/resultIcon/bigDraw.svg';
import BigWin from '@/public/resultIcon/bigWin.svg';
import BigLose from '@/public/resultIcon/bigLose.svg';
import style from './bettingPlan.module.scss';

interface PropsType {
    rowData: MemberIndividualGuessMatch;
}

const iconMap = {
    WIN: <BigWin />,
    LOSE: <BigLose />,
    DRAW: <BigDraw />,
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
            <div className={style.icon}>{iconMap[rowData.predictionResult]}</div>
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
