import { useState } from 'react';
import Image from 'next/image';
import { handleStartTime } from 'lib';
import type { GetSingleMatchResponse, HandicapsInfo } from 'data-center';
import { useContestDetailStore } from '../../contestDetailStore';
import { useSituationStore } from '../../situationStore';
import style from './situation.module.scss';
import rightBlack from './img/right_black.png';
import { CompareOdds } from '@/app/contest/football/(list)/components/compareOdds';
import TextRadio from '@/components/textSwitch/textSwitch';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';

const switchOptins = [
    { label: 'CROW*', value: 3 },
    { label: '36*', value: 8 }
];

type TabTpye = 'fullHandicap' | 'halfHandicap';
type RadioType = 'half' | 'full';
const handicapRadioMapping = {
    half: 'halfHandicap',
    full: 'fullHandicap'
};

function InProgress({
    targetHandicap,
    setIsOddsDetailDrawerOpen,
    setDrawerTabValue,
    handicapRadio,
    setCompanyId,
    handicapSwitch,
    matchDetail
}: {
    targetHandicap: HandicapsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    handicapRadio: RadioType;
    setCompanyId: (value: number) => void;
    handicapSwitch: number;
    matchDetail: GetSingleMatchResponse;
}) {
    return (
        <>
            {targetHandicap.map((now, idx) => (
                <div className="tr" key={`before_${idx.toString()}`}>
                    <div className="td">
                        {handleStartTime(matchDetail.startTime, now.oddsChangeTime)}
                    </div>
                    <div className="td">
                        {now.homeScore}-{now.awayScore}
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds value={now.homeInitialOdds} />
                        </div>
                        <div>
                            <CompareOdds value={now.initialHandicap} />
                        </div>
                        <div>
                            <CompareOdds value={now.awayInitialOdds} />
                        </div>
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds value={now.homeCurrentOdds} />
                        </div>
                        <div>
                            <CompareOdds value={now.currentHandicap} />
                        </div>
                        <div className={style.arrowColumn}>
                            <CompareOdds value={now.awayCurrentOdds} />
                            <Image
                                alt=""
                                height={14}
                                onClick={() => {
                                    setIsOddsDetailDrawerOpen(true);
                                    setDrawerTabValue(
                                        handicapRadioMapping[handicapRadio] as TabTpye
                                    );
                                    setCompanyId(handicapSwitch);
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
    targetHandicap,
    setIsOddsDetailDrawerOpen,
    setDrawerTabValue,
    handicapRadio,
    setCompanyId,
    handicapSwitch
}: {
    targetHandicap: HandicapsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    handicapRadio: RadioType;
    setCompanyId: (value: number) => void;
    handicapSwitch: number;
}) {
    return (
        <>
            {targetHandicap.map((before, idx) => (
                <div className="tr" key={`before_${idx.toString()}`}>
                    <div className="td">未</div>
                    <div className="td">-</div>
                    <div className="td">
                        <div>
                            <CompareOdds value={before.homeInitialOdds} />
                        </div>
                        <div>
                            <CompareOdds value={before.initialHandicap} />
                        </div>
                        <div>
                            <CompareOdds value={before.awayInitialOdds} />
                        </div>
                    </div>
                    <div className="td">
                        <div>
                            <CompareOdds value={before.homeCurrentOdds} />
                        </div>
                        <div>
                            <CompareOdds value={before.currentHandicap} />
                        </div>
                        <div className={style.arrowColumn}>
                            <CompareOdds value={before.awayCurrentOdds} />
                            <Image
                                alt=""
                                height={14}
                                onClick={() => {
                                    setDrawerTabValue(
                                        handicapRadioMapping[handicapRadio] as TabTpye
                                    );
                                    setIsOddsDetailDrawerOpen(true);
                                    setCompanyId(handicapSwitch);
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

function Handicap() {
    const handicapData = useSituationStore.use.handicapsData();

    const [handicapRadio, setHandicapRadio] = useState<RadioType>('full');
    const [handicapSwitch, setHandicapSwitch] = useState(3);
    const matchDetail = useContestDetailStore.use.matchDetail();

    const setCompanyId = useSituationStore.use.setCompanyId();
    const setDrawerTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const setIsOddsDetailDrawerOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();
    const handleChangeSwitch = (switchValue: number) => {
        setHandicapSwitch(switchValue);
        setCompanyId(switchValue);
    };

    const targetHandicap = handicapData[handicapRadio][handicapSwitch];

    const hasData: boolean =
        typeof targetHandicap === 'undefined' ||
        targetHandicap.inProgress.length + targetHandicap.notStarted.length === 0;

    return (
        <div className={style.handicap}>
            <div className="topBar">
                <h6 className="title">让球指数</h6>

                <ButtonSwitch
                    onChange={(switchValue: number) => {
                        handleChangeSwitch(switchValue);
                    }}
                    options={switchOptins}
                    value={handicapSwitch}
                />

                <TextRadio
                    onChange={value => {
                        setHandicapRadio(value as 'half' | 'full');
                        setDrawerTabValue(handicapRadioMapping[value] as TabTpye);
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
                    {hasData ? (
                        <div className="tr">
                            <div className="td">暂无数据</div>
                        </div>
                    ) : (
                        <>
                            <InProgress
                                handicapRadio={handicapRadio}
                                handicapSwitch={handicapSwitch}
                                key={`handicap_${handicapRadio}_${handicapSwitch}_inProgress`}
                                matchDetail={matchDetail}
                                setCompanyId={setCompanyId}
                                setDrawerTabValue={setDrawerTabValue}
                                setIsOddsDetailDrawerOpen={setIsOddsDetailDrawerOpen}
                                targetHandicap={targetHandicap.inProgress}
                            />
                            <NotStarted
                                handicapRadio={handicapRadio}
                                handicapSwitch={handicapSwitch}
                                key={`handicap_${handicapRadio}_${handicapSwitch}_notStarted`}
                                setCompanyId={setCompanyId}
                                setDrawerTabValue={setDrawerTabValue}
                                setIsOddsDetailDrawerOpen={setIsOddsDetailDrawerOpen}
                                targetHandicap={targetHandicap.notStarted}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Handicap;
