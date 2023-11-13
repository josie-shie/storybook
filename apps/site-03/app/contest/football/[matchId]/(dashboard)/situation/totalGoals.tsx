import { useState } from 'react';
import Image from 'next/image';
import { handleStartTime } from 'lib';
import type { ContestInfo, GetSingleMatchResponse, TotalGoalsInfo } from 'data-center';
import { useContestDetailStore } from '../../contestDetailStore';
import { useSituationStore } from '../../situationStore';
import { CompareOdds } from '../../../(list)/components/gameCard';
import style from './situation.module.scss';
import rightBlack from './img/right_black.png';
import TextRadio from '@/components/textSwitch/textSwitch';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';
import { useContestInfoStore } from '@/app/contestInfoStore';

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
    contestInfo,
    matchDetail
}: {
    targetTotalGoals: TotalGoalsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    totalGoalsRadio: RadioType;
    setCompanyId: (value: number) => void;
    totalGoalsSwitch: number;
    contestInfo: Partial<ContestInfo> | null;
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
                        <p>{now.overInitialOdds}</p>
                        <p>{now.initialHandicap}</p>
                        <p>{now.underInitialOdds}</p>
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds
                                value={
                                    (contestInfo?.state !== 0 &&
                                        contestInfo?.overUnderOverCurrentOdds) ||
                                    now.overCurrentOdds
                                }
                            />
                        </div>
                        <div>
                            <CompareOdds
                                value={
                                    (contestInfo?.state !== 0 && contestInfo?.overUnderCurrent) ||
                                    now.currentHandicap
                                }
                            />
                        </div>
                        <div className={style.arrowColumn}>
                            <CompareOdds
                                value={
                                    (contestInfo?.state !== 0 &&
                                        contestInfo?.overUnderUnderCurrentOdds) ||
                                    now.underCurrentOdds
                                }
                            />
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
    totalGoalsSwitch,
    contestInfo
}: {
    targetTotalGoals: TotalGoalsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    totalGoalsRadio: RadioType;
    setCompanyId: (value: number) => void;
    totalGoalsSwitch: number;
    contestInfo: Partial<ContestInfo> | null;
}) {
    return (
        <>
            {targetTotalGoals.map((before, idx) => (
                <div className="tr" key={`before_${idx.toString()}`}>
                    <div className="td">未</div>
                    <div className="td">-</div>
                    <div className="td">
                        <p>{before.overInitialOdds}</p>
                        <p>{before.initialHandicap}</p>
                        <p>{before.underInitialOdds}</p>
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds
                                value={
                                    (contestInfo?.state === 0 &&
                                        contestInfo.overUnderOverCurrentOdds) ||
                                    before.overCurrentOdds
                                }
                            />
                        </div>
                        <div>
                            <CompareOdds
                                value={
                                    (contestInfo?.state === 0 && contestInfo.overUnderCurrent) ||
                                    before.currentHandicap
                                }
                            />
                        </div>
                        <div className={style.arrowColumn}>
                            <CompareOdds
                                value={
                                    (contestInfo?.state === 0 &&
                                        contestInfo.overUnderUnderCurrentOdds) ||
                                    before.underCurrentOdds
                                }
                            />
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
    const contestInfo = useContestInfoStore.use.contestInfo()[matchDetail.matchId];

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
                                contestInfo={contestInfo}
                                matchDetail={matchDetail}
                                setCompanyId={setCompanyId}
                                setDrawerTabValue={setDrawerTabValue}
                                setIsOddsDetailDrawerOpen={setIsOddsDetailDrawerOpen}
                                targetTotalGoals={targetTotalGoals.inProgress}
                                totalGoalsRadio={totalGoalsRadio}
                                totalGoalsSwitch={totalGoalsSwitch}
                            />
                            <NotStarted
                                contestInfo={contestInfo}
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
