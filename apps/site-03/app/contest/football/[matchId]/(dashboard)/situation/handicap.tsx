import { useState } from 'react';
import Image from 'next/image';
import { getCompanyLiveOddsDetail } from 'data-center';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './situation.module.scss';
import { useSituationStore } from './situationStore';
import rightBlack from './img/right_black.png';
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
    { label: 'CROW*', value: 3 },
    { label: '36*', value: 8 }
];

type TabTpye = 'fullHandicap' | 'halfHandicap';
const handicapRadioMapping = {
    half: 'halfHandicap',
    full: 'fullHandicap'
};

function Handicap() {
    let handicapData = useSituationStore.use.handicapsData();
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('half');
    const [handicapSwitch, setHandicapSwitch] = useState(3);
    const matchDetail = useContestDetailStore.use.matchDetail();
    const setCompanyOddsDetail = useSituationStore.use.setCompanyLiveOddsDetail();
    const setCompanyId = useSituationStore.use.setCompanyId();
    const setDrawerTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const setIsOddsDetailDrawerOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();

    handicapData = {
        full: {
            3: {
                inProgress: [],
                notStarted: [
                    {
                        awayCurrentOdds: '0.94',
                        awayInitialOdds: '0.94',
                        awayScore: 0,
                        companyId: 47,
                        currentHandicap: -0.25,
                        homeCurrentOdds: '0.83',
                        homeInitialOdds: '0.83',
                        homeScore: 0,
                        initialHandicap: -0.25,
                        isClosed: false,
                        matchId: 2359838,
                        oddsChangeTime: '2023-11-02 02:13:04',
                        oddsType: 1,
                        state: 0
                    }
                ]
            },
            8: {
                inProgress: [],
                notStarted: [
                    {
                        awayCurrentOdds: '0.94',
                        awayInitialOdds: '0.94',
                        awayScore: 0,
                        companyId: 47,
                        currentHandicap: -0.25,
                        homeCurrentOdds: '0.83',
                        homeInitialOdds: '0.83',
                        homeScore: 0,
                        initialHandicap: -0.25,
                        isClosed: false,
                        matchId: 2359838,
                        oddsChangeTime: '2023-11-02 02:13:04',
                        oddsType: 1,
                        state: 0
                    }
                ]
            }
        },
        half: {
            3: {
                inProgress: [],
                notStarted: [
                    {
                        awayCurrentOdds: '0.94',
                        awayInitialOdds: '0.94',
                        awayScore: 0,
                        companyId: 47,
                        currentHandicap: -0.25,
                        homeCurrentOdds: '0.83',
                        homeInitialOdds: '0.83',
                        homeScore: 0,
                        initialHandicap: -0.25,
                        isClosed: false,
                        matchId: 2359838,
                        oddsChangeTime: '2023-11-02 02:13:04',
                        oddsType: 1,
                        state: 0
                    }
                ]
            },
            8: {
                inProgress: [],
                notStarted: [
                    {
                        awayCurrentOdds: '0.94',
                        awayInitialOdds: '0.94',
                        awayScore: 0,
                        companyId: 47,
                        currentHandicap: -0.25,
                        homeCurrentOdds: '0.83',
                        homeInitialOdds: '0.83',
                        homeScore: 0,
                        initialHandicap: -0.25,
                        isClosed: false,
                        matchId: 2359838,
                        oddsChangeTime: '2023-11-02 02:13:04',
                        oddsType: 1,
                        state: 0
                    }
                ]
            }
        }
    };

    const handleChangeSwitch = async (switchValue: number) => {
        setHandicapSwitch(switchValue);
        setCompanyId(switchValue);

        try {
            const res = await getCompanyLiveOddsDetail(matchDetail.matchId, switchValue);

            if (!res.success) {
                throw new Error();
            }

            setCompanyOddsDetail(res.data);
        } catch (error) {
            throw new Error();
        }
    };

    return (
        <div className={style.handicap}>
            <div className="topBar">
                <h6 className="title">让球指数</h6>

                <ButtonSwitch
                    onChange={(switchValue: number) => {
                        void handleChangeSwitch(switchValue);
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
                    {typeof handicapData[handicapRadio][handicapSwitch] !== 'undefined'
                        ? handicapData[handicapRadio][handicapSwitch].notStarted.map(
                              (before, idx) => (
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
                                          <p>
                                              <span>{before.awayCurrentOdds}</span>
                                              <Image
                                                  alt=""
                                                  height={14}
                                                  onClick={() => {
                                                      setIsOddsDetailDrawerOpen(true);
                                                  }}
                                                  src={rightBlack.src}
                                                  width={14}
                                              />
                                          </p>
                                      </div>
                                  </div>
                              )
                          )
                        : null}

                    {typeof handicapData[handicapRadio][handicapSwitch] !== 'undefined'
                        ? handicapData[handicapRadio][handicapSwitch].inProgress.map((now, idx) => (
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
                                      <p>
                                          <span>{now.awayCurrentOdds}</span>
                                          <Image
                                              alt=""
                                              height={14}
                                              onClick={() => {
                                                  setIsOddsDetailDrawerOpen(true);
                                              }}
                                              src={rightBlack.src}
                                              width={14}
                                          />
                                      </p>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}

export default Handicap;
