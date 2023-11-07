import { useState } from 'react';
import { getCompanyLiveOddsDetail } from 'data-center';
import Image from 'next/image';
import { handleStartTime } from 'lib';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './situation.module.scss';
import { useSituationStore } from './situationStore';
import rightBlack from './img/right_black.png';
import TextRadio from '@/components/textSwitch/textSwitch';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';

const switchOptins = [
    { label: 'CROW*', value: 3 },
    { label: '36*', value: 8 }
];

type TabTpye = 'fullTotalGoal' | 'halfTotalGoal';
const handicapRadioMapping = {
    half: 'halfTotalGoal',
    full: 'fullTotalGoal'
};

function TotalGoals() {
    const totalGoalsData = useSituationStore.use.totalGoalsData();
    const setCompanyId = useSituationStore.use.setCompanyId();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const [totalGoalsSwitch, setTotalGoalsSwitch] = useState(3);
    const [totalGoalsRadio, setTotalGoalsRadio] = useState<'half' | 'full'>('half');
    const setCompanyOddsDetail = useSituationStore.use.setCompanyLiveOddsDetail();
    const setDrawerTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const setIsOddsDetailDrawerOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();

    const handleChangeSwitch = async (switchValue: number) => {
        setTotalGoalsSwitch(switchValue);
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
        <div className={style.totalGoals}>
            <div className="topBar">
                <h6 className="title">总进球指数</h6>

                <ButtonSwitch
                    onChange={(switchValue: number) => {
                        void handleChangeSwitch(switchValue);
                    }}
                    options={switchOptins}
                    outline
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
                    {typeof totalGoalsData[totalGoalsRadio][totalGoalsSwitch] !== 'undefined'
                        ? totalGoalsData[totalGoalsRadio][totalGoalsSwitch].notStarted.map(
                              (before, idx) => (
                                  <div className="tr" key={`before_${idx.toString()}`}>
                                      <div className="td">未</div>
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
                          )
                        : null}
                    {typeof totalGoalsData[totalGoalsRadio][totalGoalsSwitch] !== 'undefined'
                        ? totalGoalsData[totalGoalsRadio][totalGoalsSwitch].inProgress.map(
                              (now, idx) => (
                                  <div className="tr" key={`before_${idx.toString()}`}>
                                      <div className="td">
                                          {handleStartTime(
                                              matchDetail.startTime,
                                              now.oddsChangeTime
                                          )}
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
                                          <p>
                                              {now.underCurrentOdds}
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
                </div>
            </div>
        </div>
    );
}

export default TotalGoals;
