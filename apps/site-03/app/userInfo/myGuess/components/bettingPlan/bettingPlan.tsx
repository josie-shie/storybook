import Image from 'next/image';
import { timestampToString } from 'lib';
import { type Plan } from '../../myGuessStore';
import BigGone from '../img/bigGone.png';
import BigWin from '../img/bigWin.png';
import BigLose from '../img/bigLose.png';
import style from './bettingPlan.module.scss';

interface PropsType {
    rowData: Plan;
}

const iconMap = {
    win: <Image alt="icon" className={style.iconWin} src={BigWin} />,
    lose: <Image alt="icon" className={style.iconDefeat} src={BigLose} />,
    draw: <Image alt="icon" className={style.iconDefeat} src={BigGone} />,
    none: null
};

const messageFormat = (predictedPlay: string, item: Plan) => {
    switch (predictedPlay) {
        case 'over':
            return `${item.overUnderOdds} 大`;
        case 'under':
            return `${item.overUnderOdds} 小`;
        case 'home':
            return `${item.handicapOdds} ${item.homeTeamName}`;
        case 'away':
            return `${item.handicapOdds} ${item.awayTeamName}`;
    }
};

function BettingPlan({ rowData }: PropsType) {
    return (
        <div className={style.bettingPlan}>
            {iconMap[rowData.predictionResult]}
            <div className={style.top}>
                {rowData.leagueName}
                <span className={style.time}>
                    {' '}
                    | {timestampToString(rowData.matchTime, 'MM-DD HH:mm')}
                </span>
            </div>
            <div className={style.mid}>
                <span className={style.plan}>
                    {rowData.bettingType === 'draw' ? '让球' : '大小'}
                </span>
                <div className={style.combination}>
                    {rowData.homeTeamName}
                    vs
                    {rowData.awayTeamName}
                </div>
            </div>
            <div className={style.bot}>
                <div
                    className={`${style.message} ${
                        rowData.predictionResult === 'win' && style.red
                    }`}
                >
                    {messageFormat(rowData.predictedPlay, rowData)}
                </div>
            </div>
        </div>
    );
}

export default BettingPlan;
