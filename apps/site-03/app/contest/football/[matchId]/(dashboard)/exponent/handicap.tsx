import { useContestDetailStore } from '../../contestDetailStore';
import style from './exponent.module.scss';
import { useExponentStore } from './exponentStore';

function Handicap() {
    const exponentData = useExponentStore.use.exponentData();
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const companyNameMap = useContestDetailStore.use.companyNameMap();

    return (
        <div className={style.handicap}>
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
                        ? exponentData.handicapsData[totalGoalsRadio].list.map(companyId => (
                              <div className="tr" key={companyId}>
                                  <div className="td">{companyNameMap[companyId]}</div>
                                  <div className="td">
                                      {
                                          exponentData.handicapsData[totalGoalsRadio].info[
                                              companyId
                                          ].homeInitialOdds
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.handicapsData[totalGoalsRadio].info[
                                              companyId
                                          ].initialHandicap
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.handicapsData[totalGoalsRadio].info[
                                              companyId
                                          ].awayInitialOdds
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.handicapsData[totalGoalsRadio].info[
                                              companyId
                                          ].homeCurrentOdds
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.handicapsData[totalGoalsRadio].info[
                                              companyId
                                          ].currentHandicap
                                      }
                                  </div>
                                  <div className="td">
                                      {
                                          exponentData.handicapsData[totalGoalsRadio].info[
                                              companyId
                                          ].awayCurrentOdds
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

export default Handicap;
