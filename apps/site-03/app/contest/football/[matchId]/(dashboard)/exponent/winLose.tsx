import style from './exponent.module.scss';
import { useExponentStore } from './exponentStore';

function Victory() {
    const exponentData = useExponentStore.use.exponentData();
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const companyNameMap = useExponentStore.use.companyNameMap();

    return (
        <div className={style.winLose}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">公司</div>
                        <div className="th" />
                        <div className="th">主勝</div>
                        <div className="th">平局</div>
                        <div className="th">客勝</div>
                    </div>
                </div>
                <div className="tableBody">
                    {exponentData
                        ? exponentData.winLoseData[totalGoalsRadio].list.map(companyId => (
                              <div className="company" key={companyId}>
                                  <div className="tr">
                                      <div className="td">{companyNameMap[companyId]}</div>
                                      <div className="td">初</div>
                                      <div className="td">
                                          {
                                              exponentData.winLoseData[totalGoalsRadio].info[
                                                  companyId
                                              ].initialHomeOdds
                                          }
                                      </div>
                                      <div className="td">
                                          {
                                              exponentData.winLoseData[totalGoalsRadio].info[
                                                  companyId
                                              ].initialDrawOdds
                                          }
                                      </div>
                                      <div className="td">
                                          {
                                              exponentData.winLoseData[totalGoalsRadio].info[
                                                  companyId
                                              ].initialHomeOdds
                                          }
                                      </div>
                                  </div>
                                  <div className="tr">
                                      <div className="td" />
                                      <div className="td">即</div>
                                      <div className="td">
                                          {
                                              exponentData.winLoseData[totalGoalsRadio].info[
                                                  companyId
                                              ].currentHomeOdds
                                          }
                                      </div>
                                      <div className="td">
                                          {
                                              exponentData.winLoseData[totalGoalsRadio].info[
                                                  companyId
                                              ].currentDrawOdds
                                          }
                                      </div>
                                      <div className="td">
                                          {
                                              exponentData.winLoseData[totalGoalsRadio].info[
                                                  companyId
                                              ].currentAwayOdds
                                          }
                                      </div>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}

export default Victory;
