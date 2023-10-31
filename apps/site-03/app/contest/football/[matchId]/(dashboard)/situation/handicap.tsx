import { useState } from 'react';
import style from './situation.module.scss';
import { useSituationStore } from './situationStore';
import TextRadio from '@/components/textSwitch/textSwitch';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';

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

const switchOptins = [
    { label: '皇*', value: 3 },
    { label: '36*', value: 8 }
];

function Handicap() {
    const handicapData = useSituationStore.use.handicapsData();
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('half');
    const [handicapSwitch, setHandicapSwitch] = useState(3);

    return (
        <div className={style.handicap}>
            <div className="topBar">
                <h6 className="title">让球指数</h6>

                <ButtonSwitch
                    onChange={(switchValue: number) => {
                        setHandicapSwitch(switchValue);
                    }}
                    options={switchOptins}
                    outline
                    value={handicapSwitch}
                />

                <TextRadio
                    onChange={value => {
                        setHandicapRadio(value as 'half' | 'full');
                    }}
                    value={handicapRadio}
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
                    {handicapData[handicapRadio][handicapSwitch].notStarted.map((before, idx) => (
                        <div className="tr" key={`before_${idx.toString()}`}>
                            <div className="td">
                                <GameTime />
                            </div>
                            <div className="td">
                                {before.homeScore}-{before.awayScore}
                            </div>
                            <div className="td">
                                <p>{before.homeInitialOdds}</p>
                                <p>{before.initialHandicap}</p>
                                <p>{before.awayInitialOdds}</p>
                            </div>
                            <div className="td">
                                <p>{before.homeCurrentOdds}</p>
                                <p>{before.currentHandicap}</p>
                                <p>{before.awayCurrentOdds}</p>
                            </div>
                        </div>
                    ))}

                    {handicapData[handicapRadio][handicapSwitch].inProgress.map((now, idx) => (
                        <div className="tr" key={`before_${idx.toString()}`}>
                            <div className="td">
                                <GameTime />
                            </div>
                            <div className="td">
                                {now.homeScore}-{now.awayScore}
                            </div>
                            <div className="td">
                                <p>{now.homeInitialOdds}</p>
                                <p>{now.initialHandicap}</p>
                                <p>{now.awayInitialOdds}</p>
                            </div>
                            <div className="td">
                                <p>{now.homeCurrentOdds}</p>
                                <p>{now.currentHandicap}</p>
                                <p>{now.awayCurrentOdds}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Handicap;
