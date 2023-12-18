import { useAnalyzeStore } from '@/app/football/[matchId]/analyzeStore';
import RecordTable from '../components/recordTable/recordTable';
import { useAwayRecordStore } from './awayRecordStore';

function AwayRecordTable() {
    const teamInfo = useAnalyzeStore.use.teamInfo();

    const awayRecordData = useAwayRecordStore.use.awayRecordData();
    const list = useAwayRecordStore.use.list();
    const setList = useAwayRecordStore.use.setList();
    const contestAmount = useAwayRecordStore.use.contestAmount();
    const setContestAmount = useAwayRecordStore.use.setContestAmount();
    const contestType = useAwayRecordStore.use.contestType();
    const setContestType = useAwayRecordStore.use.setContestType();
    const contestCompany = useAwayRecordStore.use.contestCompany();
    const setContestCompany = useAwayRecordStore.use.setContestCompany();
    const contestHandicap = useAwayRecordStore.use.contestHandicap();
    const setContestHandicap = useAwayRecordStore.use.setContestHandicap();
    const contestTime = useAwayRecordStore.use.contestTime();
    const setContestTime = useAwayRecordStore.use.setContestTime();
    const gameIsHome = useAwayRecordStore.use.gameIsHome();
    const setGameIsHome = useAwayRecordStore.use.setGameIsHome();
    const winLoseResult = useAwayRecordStore.use.winLoseResult();
    const setWinLoseResult = useAwayRecordStore.use.setWinLoseResult();
    const oddsDetailResult = useAwayRecordStore.use.oddsDetailResult();
    const setOddsDetailResult = useAwayRecordStore.use.setOddsDetailResult();

    return (
        <RecordTable
            contestAmount={contestAmount}
            contestCompany={contestCompany}
            contestHandicap={contestHandicap}
            contestTime={contestTime}
            contestType={contestType}
            gameIsHome={gameIsHome}
            list={list}
            mode="one"
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
            tableData={awayRecordData}
            teamName={teamInfo.awayChs}
            winLoseResult={winLoseResult}
        />
    );
}

export default AwayRecordTable;
