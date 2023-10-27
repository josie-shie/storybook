import { useState } from 'react';
import TextRadio from '../../../../../../components/textSwitch/textSwitch';
import style from './situation.module.scss';
import type { TotalGoalsDataType } from '@/types/detailStatus';

// const switchOptins = [
//     { label: '皇*', value: 3 },
//     { label: '36*', value: 8 }
// ];

function GameTime() {
    const gameStatus = {
        state: 'notYet',
        time: '21'
    };
    const stateStyle: Record<string, { style: string; text: string }> = {
        notYet: { style: style.notYet, text: '未' },
        midfielder: { style: style.notYet, text: '中场' },
        finish: { style: style.finish, text: '完场' },
        playoff: { style: style.playoff, text: '加' }
    };

    return (
        <>
            {stateStyle[gameStatus.state].text || (
                <>
                    {gameStatus.time} <span className="timePoint">&apos;</span>
                </>
            )}
        </>
    );
}

function TotalGoals({ totalGoalsData }: { totalGoalsData?: TotalGoalsDataType }) {
    const totalGoalsSwitch = 3;
    const [totalGoalsRadio, setTotalGoalsRadio] = useState<'half' | 'full'>('half');

    return (
        <div className={style.totalGoals}>
            <div className="topBar">
                <h6 className="title">总进球指数</h6>

                <TextRadio
                    onChange={value => {
                        setTotalGoalsRadio(value as 'half' | 'full');
                    }}
                    value={totalGoalsRadio}
                />
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">时间</div>
                        <div className="th">比分</div>
                        <div className="th">初</div>
                        <div className="th">即</div>
                    </div>
                </div>
                <div className="tableBody">
                    {totalGoalsData?.[totalGoalsRadio][totalGoalsSwitch].notStarted.map(
                        (before, idx) => (
                            <div className="tr" key={`before_${idx.toString()}`}>
                                <div className="td">
                                    <GameTime />
                                </div>
                                <div className="td">
                                    {before.homeScore}-{before.awayScore}
                                </div>
                                <div className="td">
                                    <p>{before.overInitialOdds}</p>
                                    <p>{before.initialTotalGoals}</p>
                                    <p>{before.underInitialOdds}</p>
                                </div>
                                <div className="td">
                                    <p>{before.overCurrentOdds}</p>
                                    <p>{before.currentTotalGoals}</p>
                                    <p>{before.underCurrentOdds}</p>
                                </div>
                            </div>
                        )
                    )}
                    {totalGoalsData?.[totalGoalsRadio][totalGoalsSwitch].inProgress.map(
                        (now, idx) => (
                            <div className="tr" key={`before_${idx.toString()}`}>
                                <div className="td">
                                    <GameTime />
                                </div>
                                <div className="td">
                                    {now.homeScore}-{now.awayScore}
                                </div>
                                <div className="td">
                                    <p>{now.overInitialOdds}</p>
                                    <p>{now.initialTotalGoals}</p>
                                    <p>{now.underInitialOdds}</p>
                                </div>
                                <div className="td">
                                    <p>{now.overCurrentOdds}</p>
                                    <p>{now.currentTotalGoals}</p>
                                    <p>{now.underCurrentOdds}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default TotalGoals;
