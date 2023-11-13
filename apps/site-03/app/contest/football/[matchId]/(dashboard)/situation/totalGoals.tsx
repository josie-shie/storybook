import { useState } from 'react';
import Image from 'next/image';
import { handleStartTime } from 'lib';
import type { GetSingleMatchResponse, TotalGoalsInfo } from 'data-center';
import { useContestDetailStore } from '../../contestDetailStore';
import { useSituationStore } from '../../situationStore';
import { CompareOdds } from '../../../(list)/components/gameCard';
import style from './situation.module.scss';
import rightBlack from './img/right_black.png';
import TextRadio from '@/components/textSwitch/textSwitch';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';

const switchOptins = [
    { label: 'CROW*', value: 3 },
    { label: '36*', value: 8 }
];

type TabTpye = 'fullTotalGoal' | 'halfTotalGoal';
type RadioType = 'half' | 'full';
const handicapRadioMapping = {
    half: 'halfTotalGoal',
    full: 'fullTotalGoal'
};

function InProgress({
    targetTotalGoals,
    setIsOddsDetailDrawerOpen,
    setDrawerTabValue,
    totalGoalsRadio,
    setCompanyId,
    totalGoalsSwitch,
    matchDetail
}: {
    targetTotalGoals: TotalGoalsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    totalGoalsRadio: RadioType;
    setCompanyId: (value: number) => void;
    totalGoalsSwitch: number;
    matchDetail: GetSingleMatchResponse;
}) {
    return (
        <>
            {targetTotalGoals.map((now, idx) => (
                <div className="tr" key={`before_${idx.toString()}`}>
                    <div className="td">
                        {handleStartTime(matchDetail.startTime, now.oddsChangeTime)}
                    </div>
                    <div className="td">
                        {now.homeScore}-{now.awayScore}
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds value={now.overInitialOdds} />
                        </div>
                        <div>
                            <CompareOdds value={now.initialHandicap} />
                        </div>
                        <div>
                            <CompareOdds value={now.underInitialOdds} />
                        </div>
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds value={now.overCurrentOdds} />
                        </div>
                        <div>
                            <CompareOdds value={now.currentHandicap} />
                        </div>
                        <div className={style.arrowColumn}>
                            <CompareOdds value={now.underCurrentOdds} />
                            <Image
                                alt=""
                                height={14}
                                onClick={() => {
                                    setDrawerTabValue(
                                        handicapRadioMapping[totalGoalsRadio] as TabTpye
                                    );
                                    setIsOddsDetailDrawerOpen(true);
                                    setCompanyId(totalGoalsSwitch);
                                }}
                                src={rightBlack.src}
                                width={14}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

function NotStarted({
    targetTotalGoals,
    setIsOddsDetailDrawerOpen,
    setDrawerTabValue,
    totalGoalsRadio,
    setCompanyId,
    totalGoalsSwitch
}: {
    targetTotalGoals: TotalGoalsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    totalGoalsRadio: RadioType;
    setCompanyId: (value: number) => void;
    totalGoalsSwitch: number;
}) {
    return (
        <>
            {targetTotalGoals.map((before, idx) => (
                <div className="tr" key={`before_${idx.toString()}`}>
                    <div className="td">未</div>
                    <div className="td">-</div>
                    <div className="td">
                        <div>
                            <CompareOdds value={before.overInitialOdds} />
                        </div>
                        <div>
                            <CompareOdds value={before.initialHandicap} />
                        </div>
                        <div>
                            <CompareOdds value={before.underInitialOdds} />
                        </div>
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds value={before.overCurrentOdds} />
                        </div>
                        <div>
                            <CompareOdds value={before.currentHandicap} />
                        </div>
                        <div className={style.arrowColumn}>
                            <CompareOdds value={before.underCurrentOdds} />
                            <Image
                                alt=""
                                height={14}
                                onClick={() => {
                                    setDrawerTabValue(
                                        handicapRadioMapping[totalGoalsRadio] as TabTpye
                                    );
                                    setIsOddsDetailDrawerOpen(true);
                                    setCompanyId(totalGoalsSwitch);
                                }}
                                src={rightBlack.src}
                                width={14}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

function TotalGoals() {
    const totalGoalsData = useSituationStore.use.totalGoalsData();
    const setCompanyId = useSituationStore.use.setCompanyId();
    const [totalGoalsSwitch, setTotalGoalsSwitch] = useState(3);
    const [totalGoalsRadio, setTotalGoalsRadio] = useState<RadioType>('full');
    const setDrawerTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const setIsOddsDetailDrawerOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();
    const matchDetail = useContestDetailStore.use.matchDetail();

    const handleChangeSwitch = (switchValue: number) => {
        setTotalGoalsSwitch(switchValue);
        setCompanyId(switchValue);
    };

    const targetTotalGoals = totalGoalsData[totalGoalsRadio][totalGoalsSwitch];
    const hasData: boolean =
        typeof targetTotalGoals === 'undefined' ||
        targetTotalGoals.inProgress.length + targetTotalGoals.notStarted.length === 0;

    return (
        <div className={style.totalGoals}>
            <div className="topBar">
                <h6 className="title">总进球指数</h6>

                <ButtonSwitch
                    onChange={(switchValue: number) => {
                        handleChangeSwitch(switchValue);
                    }}
                    options={switchOptins}
                    value={totalGoalsSwitch}
                />

                <TextRadio
                    onChange={value => {
                        setTotalGoalsRadio(value as 'half' | 'full');
                        setDrawerTabValue(handicapRadioMapping[value] as TabTpye);
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
                    {hasData ? (
                        <div className="tr">
                            <div className="td">暂无数据</div>
                        </div>
                    ) : (
                        <>
                            <InProgress
                                key={`totalGoal_${totalGoalsRadio}_${totalGoalsSwitch}_inProgress`}
                                matchDetail={matchDetail}
                                setCompanyId={setCompanyId}
                                setDrawerTabValue={setDrawerTabValue}
                                setIsOddsDetailDrawerOpen={setIsOddsDetailDrawerOpen}
                                targetTotalGoals={targetTotalGoals.inProgress}
                                totalGoalsRadio={totalGoalsRadio}
                                totalGoalsSwitch={totalGoalsSwitch}
                            />
                            <NotStarted
                                key={`totalGoal_${totalGoalsRadio}_${totalGoalsSwitch}_notStarted`}
                                setCompanyId={setCompanyId}
                                setDrawerTabValue={setDrawerTabValue}
                                setIsOddsDetailDrawerOpen={setIsOddsDetailDrawerOpen}
                                targetTotalGoals={targetTotalGoals.notStarted}
                                totalGoalsRadio={totalGoalsRadio}
                                totalGoalsSwitch={totalGoalsSwitch}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TotalGoals;
