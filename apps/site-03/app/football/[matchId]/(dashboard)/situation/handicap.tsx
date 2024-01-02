import { useState } from 'react';
import Image from 'next/image';
import type { GetSingleMatchResponse, HandicapsInfo } from 'data-center';
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

type TabTpye = 'HANDICAP' | 'HANDICAPHALF';
type RadioType = 'half' | 'full';
const handicapRadioMapping = {
    half: 'HANDICAPHALF',
    full: 'HANDICAP'
};

type HandicapsData = HandicapsInfo &
    Partial<{
        time: string;
    }>;

function InProgress({
    targetHandicap,
    setIsOddsDetailDrawerOpen,
    setDrawerTabValue,
    handicapRadio,
    setCompanyId,
    handicapSwitch,
    matchDetail
}: {
    targetHandicap: HandicapsData[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    handicapRadio: RadioType;
    setCompanyId: (value: number) => void;
    handicapSwitch: number;
    matchDetail: GetSingleMatchResponse;
}) {
    const arrowIcon = (
        <Image
            alt=""
            height={14}
            onClick={() => {
                setIsOddsDetailDrawerOpen(true);
                setDrawerTabValue(handicapRadioMapping[handicapRadio] as TabTpye);
                setCompanyId(handicapSwitch);
            }}
            src={rightBlack.src}
            width={14}
        />
    );

    return (
        <>
            {matchDetail.state > 0 ||
                (matchDetail.state === -1 &&
                    (targetHandicap.length ? (
                        targetHandicap.map((now, idx) => (
                            <div
                                className="tr"
                                key={`before_${idx.toString()}`}
                                onClick={() => {
                                    setIsOddsDetailDrawerOpen(true);
                                    setDrawerTabValue(
                                        handicapRadioMapping[handicapRadio] as TabTpye
                                    );
                                    setCompanyId(handicapSwitch);
                                }}
                            >
                                <div className="td">{now.time}</div>
                                <div className="td">
                                    {now.homeScore}-{now.awayScore}
                                </div>
                                <div className="td">
                                    <div className="odds">
                                        <CompareOdds value={now.homeInitialOdds} />
                                    </div>
                                    <div className="odds">
                                        <CompareOdds value={now.initialHandicap} />
                                    </div>
                                    <div className="odds">
                                        <CompareOdds value={now.awayInitialOdds} />
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
                                            <div className="odds">
                                                <CompareOdds value={now.homeCurrentOdds} />
                                            </div>
                                            <div className="odds">
                                                <CompareOdds value={now.currentHandicap} />
                                            </div>
                                            <div className={`odds ${style.arrowColumn}`}>
                                                <CompareOdds value={now.awayCurrentOdds} />
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
                    )))}
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
    targetHandicap: HandicapsData[];
    setIsOddsDetailDrawerOpen: (value: boolean) => void;
    setDrawerTabValue: (value: TabTpye) => void;
    handicapRadio: RadioType;
    setCompanyId: (value: number) => void;
    handicapSwitch: number;
}) {
    return (
        <>
            {targetHandicap.map((before, idx) => (
                <div
                    className="tr"
                    key={`before_${idx.toString()}`}
                    onClick={() => {
                        setDrawerTabValue(handicapRadioMapping[handicapRadio] as TabTpye);
                        setIsOddsDetailDrawerOpen(true);
                        setCompanyId(handicapSwitch);
                    }}
                >
                    <div className="td">未</div>
                    <div className="td">-</div>
                    <div className="td">
                        <div className="odds">
                            <CompareOdds value={before.homeInitialOdds} />
                        </div>
                        <div className="odds">
                            <CompareOdds value={before.initialHandicap} />
                        </div>
                        <div className="odds">
                            <CompareOdds value={before.awayInitialOdds} />
                        </div>
                    </div>
                    <div className="td">
                        <div className="odds">
                            <CompareOdds value={before.homeCurrentOdds} />
                        </div>
                        <div className="odds">
                            <CompareOdds value={before.currentHandicap} />
                        </div>
                        <div className={`odds ${style.arrowColumn}`}>
                            <CompareOdds value={before.awayCurrentOdds} />
                            <Image alt="" height={14} src={rightBlack.src} width={14} />
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

    const setCompanyId = useSituationStore.use.setCompanyId();
    const setDrawerTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const setIsOddsDetailDrawerOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();
    const matchDetail = useContestDetailStore.use.matchDetail();

    const handleChangeSwitch = (switchValue: number) => {
        setHandicapSwitch(switchValue);
        setCompanyId(switchValue);
    };

    const targetHandicap = Object.prototype.hasOwnProperty.call(handicapData, 'full')
        ? handicapData[handicapRadio][handicapSwitch]
        : {
              inProgress: [],
              notStarted: []
          };

    const hasData: boolean =
        typeof targetHandicap === 'undefined' ||
        targetHandicap.inProgress.length + targetHandicap.notStarted.length === 0;

    return (
        <div className={style.handicap}>
            <div className="topBar">
                <h6 className="title">让分指数</h6>

                <ButtonSwitch
                    onChange={(switchValue: number) => {
                        handleChangeSwitch(switchValue);
                        resetSwiperHight();
                    }}
                    options={switchOptins}
                    value={handicapSwitch}
                />

                <TextRadio
                    onChange={value => {
                        setHandicapRadio(value as 'half' | 'full');
                        setDrawerTabValue(handicapRadioMapping[value] as TabTpye);
                        resetSwiperHight();
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
