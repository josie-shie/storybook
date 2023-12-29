import { useState } from 'react';
import Image from 'next/image';
import type { GetSingleMatchResponse, TotalGoalsInfo } from 'data-center';
import { convertHandicap, truncateFloatingPoint } from 'lib';
import { resetSwiperHight } from 'ui/stories/slickPro/slick';
import { CompareOdds } from '@/app/(list)/components/compareOdds';
import TextRadio from '@/components/textSwitch/textSwitch';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useSituationStore } from '../../situationStore';
import rightBlack from './img/right_black.png';
import style from './situation.module.scss';

const switchOptins = [
    { label: 'CROW*', value: 3 },
    { label: '36*', value: 8 }
];

type TabTpye = 'OVERUNDER' | 'OVERUNDERHALF';
type RadioType = 'half' | 'full';
const handicapRadioMapping = {
    half: 'OVERUNDERHALF',
    full: 'OVERUNDER'
};

type TotalGoalsData = TotalGoalsInfo &
    Partial<{
        time: string;
    }>;

function InProgress({
    targetTotalGoals,
    setIsOddsDetailDrawerOpen,
    setDrawerTabValue,
    totalGoalsRadio,
    setCompanyId,
    totalGoalsSwitch,
    matchDetail
}: {
    targetTotalGoals: TotalGoalsData[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    totalGoalsRadio: RadioType;
    setCompanyId: (value: number) => void;
    totalGoalsSwitch: number;
    matchDetail: GetSingleMatchResponse;
}) {
    const arrowIcon = (
        <Image
            alt=""
            height={14}
            onClick={() => {
                setDrawerTabValue(handicapRadioMapping[totalGoalsRadio] as TabTpye);
                setIsOddsDetailDrawerOpen(true);
                setCompanyId(totalGoalsSwitch);
            }}
            src={rightBlack.src}
            width={14}
        />
    );

    return (
        <>
            {matchDetail.state > 0 && targetTotalGoals.length ? (
                targetTotalGoals.map((now, idx) => (
                    <div
                        className="tr"
                        key={`before_${idx.toString()}`}
                        onClick={() => {
                            setDrawerTabValue(handicapRadioMapping[totalGoalsRadio] as TabTpye);
                            setIsOddsDetailDrawerOpen(true);
                            setCompanyId(totalGoalsSwitch);
                        }}
                    >
                        <div className="td">{now.time}</div>
                        <div className="td">
                            {now.homeScore}-{now.awayScore}
                        </div>
                        <div className="td">
                            <div>
                                <CompareOdds
                                    value={truncateFloatingPoint(Number(now.overInitialOdds), 2)}
                                />
                            </div>
                            <div>
                                <CompareOdds value={convertHandicap(Number(now.initialHandicap))} />
                            </div>
                            <div>
                                <CompareOdds
                                    value={truncateFloatingPoint(Number(now.underInitialOdds), 2)}
                                />
                            </div>
                        </div>
                        <div className="td">
                            {now.isClosed ? (
                                <>
                                    <div>封</div>
                                    <div>{arrowIcon}</div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <CompareOdds
                                            value={truncateFloatingPoint(
                                                Number(now.overCurrentOdds),
                                                2
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <CompareOdds
                                            value={convertHandicap(Number(now.currentHandicap))}
                                        />
                                    </div>
                                    <div className={style.arrowColumn}>
                                        <CompareOdds
                                            value={truncateFloatingPoint(
                                                Number(now.underCurrentOdds),
                                                2
                                            )}
                                        />
                                        {arrowIcon}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="tr">
                    <div className="td">-</div>
                    <div className="td">-</div>
                    <div className="td empty">-</div>
                    <div className="td empty">-</div>
                </div>
            )}
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
                <div
                    className="tr"
                    key={`before_${idx.toString()}`}
                    onClick={() => {
                        setDrawerTabValue(handicapRadioMapping[totalGoalsRadio] as TabTpye);
                        setIsOddsDetailDrawerOpen(true);
                        setCompanyId(totalGoalsSwitch);
                    }}
                >
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
                            <Image alt="" height={14} src={rightBlack.src} width={14} />
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

    const targetTotalGoals = Object.prototype.hasOwnProperty.call(totalGoalsData, 'full')
        ? totalGoalsData[totalGoalsRadio][totalGoalsSwitch]
        : {
              inProgress: [],
              notStarted: []
          };
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
                        resetSwiperHight();
                    }}
                    options={switchOptins}
                    value={totalGoalsSwitch}
                />

                <TextRadio
                    onChange={value => {
                        setTotalGoalsRadio(value as 'half' | 'full');
                        setDrawerTabValue(handicapRadioMapping[value] as TabTpye);
                        resetSwiperHight();
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
