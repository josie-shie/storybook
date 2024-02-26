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
    switch (predictedPlay) {
        case 'OVER':
            return `${item.overUnderOdds} 大`;
        case 'UNDER':
            return `${item.overUnderOdds} 小`;
        case 'HOME':
            return `${item.handicapInChinese} ${item.homeTeamName}`;
        case 'AWAY':
            return `${item.handicapInChinese} ${item.awayTeamName}`;
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
                    ß | {timestampToString(rowData.matchTime, 'MM-DD HH:mm')}
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
                <div
                    className={`${style.message} ${
                        rowData.predictionResult === 'WIN' && style.red
                    }`}
                >
                    {messageFormat(rowData.predictedPlay, rowData)}
                </div>
            </div>
        </Link>
    );
}

export default BettingPlan;
