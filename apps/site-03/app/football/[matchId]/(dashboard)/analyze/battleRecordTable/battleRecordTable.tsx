import { useAnalyzeStore } from '@/app/football/[matchId]/analyzeStore';
import RecordTable from '../components/recordTable/recordTable';
import { useBattleRecordStore } from './battleRecordStore';
import style from './battleRecordTable.module.scss';

function BattleRecordTable() {
    const tableRawData = useBattleRecordStore.use.battleRecordData();
    const list = useBattleRecordStore.use.list();
    const setList = useBattleRecordStore.use.setList();
    const contestAmount = useBattleRecordStore.use.contestAmount();
    const setContestAmount = useBattleRecordStore.use.setContestAmount();
    const contestType = useBattleRecordStore.use.contestType();
    const setContestType = useBattleRecordStore.use.setContestType();
    const contestCompany = useBattleRecordStore.use.contestCompany();
    const setContestCompany = useBattleRecordStore.use.setContestCompany();
    const contestHandicap = useBattleRecordStore.use.contestHandicap();
    const setContestHandicap = useBattleRecordStore.use.setContestHandicap();
    const contestTime = useBattleRecordStore.use.contestTime();
    const setContestTime = useBattleRecordStore.use.setContestTime();
    const gameIsHome = useBattleRecordStore.use.gameIsHome();
    const setGameIsHome = useBattleRecordStore.use.setGameIsHome();
    const winLoseResult = useBattleRecordStore.use.winLoseResult();
    const setWinLoseResult = useBattleRecordStore.use.setWinLoseResult();
    const oddsDetailResult = useBattleRecordStore.use.oddsDetailResult();
    const setOddsDetailResult = useBattleRecordStore.use.setOddsDetailResult();
    const loading = useAnalyzeStore.use.analysisDataLoading();

    if (!Object.prototype.hasOwnProperty.call(tableRawData, 'bet365')) return null;

    return (
        <div className={style.battleRecordTable}>
            <div className="topBar">
                <h6 className="title">对赛往绩</h6>
            </div>
            <RecordTable
                contestAmount={contestAmount}
                contestCompany={contestCompany}
                contestHandicap={contestHandicap}
                contestTime={contestTime}
                contestType={contestType}
                gameIsHome={gameIsHome}
                list={list}
                loading={loading}
                mode="battle"
                oddsDetailResult={oddsDetailResult}
                setContestAmount={setContestAmount}
                setContestCompany={setContestCompany}
                setContestHandicap={setContestHandicap}
                setContestTime={setContestTime}
                setContestType={setContestType}
                setGameIsHome={setGameIsHome}
                setList={setList}
                setOddsDetailResult={setOddsDetailResult}
                setWinLoseResult={setWinLoseResult}
                tableData={tableRawData}
                winLoseResult={winLoseResult}
            />
        </div>
    );
}

export default BattleRecordTable;
