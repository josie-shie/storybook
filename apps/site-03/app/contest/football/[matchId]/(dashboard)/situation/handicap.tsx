import { useState } from 'react';
import Image from 'next/image';
import { handleStartTime } from 'lib';
import type { HandicapsInfo } from 'data-center';
import { useContestDetailStore } from '../../contestDetailStore';
import { useSituationStore } from '../../situationStore';
import style from './situation.module.scss';
import rightBlack from './img/right_black.png';
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
    handicapSwitch
}: {
    targetHandicap: HandicapsInfo[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    handicapRadio: RadioType;
    setCompanyId: (value: number) => void;
    handicapSwitch: number;
}) {
    const matchDetail = useContestDetailStore.use.matchDetail();
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
                        <p>{now.homeInitialOdds}</p>
                        <p>{now.initialHandicap}</p>
                        <p>{now.awayInitialOdds}</p>
                    </div>
                    <div className="td">
                        <p>{now.homeCurrentOdds}</p>
                        <p>{now.currentHandicap}</p>
                        <p>
                            <span>{now.awayCurrentOdds}</span>
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
                        </p>
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
                        <p>{before.homeInitialOdds}</p>
                        <p>{before.initialHandicap}</p>
                        <p>{before.awayInitialOdds}</p>
                    </div>
                    <div className="td">
                        <p>{before.homeCurrentOdds}</p>
                        <p>{before.currentHandicap}</p>
                        <p>
                            <span>{before.awayCurrentOdds}</span>
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
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}

function Handicap() {
    const handicapData = useSituationStore.use.handicapsData();
    const [handicapRadio, setHandicapRadio] = useState<RadioType>('half');
    const [handicapSwitch, setHandicapSwitch] = useState(3);
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
                    outline
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
                                setCompanyId={setCompanyId}
                                setDrawerTabValue={setDrawerTabValue}
                                setIsOddsDetailDrawerOpen={setIsOddsDetailDrawerOpen}
                                targetHandicap={targetHandicap.inProgress}
                            />
                            <NotStarted
                                handicapRadio={handicapRadio}
                                handicapSwitch={handicapSwitch}
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
