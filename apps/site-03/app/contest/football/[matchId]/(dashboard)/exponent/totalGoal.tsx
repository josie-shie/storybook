import { useContestDetailStore } from '../../contestDetailStore';
import { useExponentStore } from '../../exponentStore';
import style from './exponent.module.scss';

function TotalGoal() {
    const exponentData = useExponentStore.use.exponentData();
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const companyNameMap = useContestDetailStore.use.companyNameMap();

    return (
        <div className={style.totalGoal}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">公司</div>
                        <div className="th">初</div>
                        <div className="th">即</div>
                    </div>
                </div>
                <div className="tableBody">
                    {exponentData
                        ? exponentData.totalGoalData[totalGoalsRadio].list.map(companyId => (
                              <div className="tr" key={companyId}>
                                  <div className="td">{companyNameMap[companyId]}</div>
                                  <div className="td">
                                      {
                                          (exponentData.totalGoalData[totalGoalsRadio].info[
                                              companyId
                                          ].overInitialOdds,
                                          2)
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.totalGoalData[totalGoalsRadio].info[
                                              companyId
                                          ].initialHandicap
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.totalGoalData[totalGoalsRadio].info[
                                              companyId
                                          ].underInitialOdds
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.totalGoalData[totalGoalsRadio].info[
                                              companyId
                                          ].overCurrentOdds
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.totalGoalData[totalGoalsRadio].info[
                                              companyId
                                          ].currentHandicap
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.totalGoalData[totalGoalsRadio].info[
                                              companyId
                                          ].underCurrentOdds
                                      }
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}

export default TotalGoal;
