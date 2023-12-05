import RecordTable from '../components/recordTable/recordTable';
import { useHomeRecordStore } from './homeRecordStore';
import { useAnalyzeStore } from '@/app/football/[matchId]/analyzeStore';

function HomeRecordTable() {
    const teamInfo = useAnalyzeStore.use.teamInfo();

    const homeRecordData = useHomeRecordStore.use.homeRecordData();
    const list = useHomeRecordStore.use.list();
    const setList = useHomeRecordStore.use.setList();
    const contestAmount = useHomeRecordStore.use.contestAmount();
    const setContestAmount = useHomeRecordStore.use.setContestAmount();
    const contestType = useHomeRecordStore.use.contestType();
    const setContestType = useHomeRecordStore.use.setContestType();
    const contestCompany = useHomeRecordStore.use.contestCompany();
    const setContestCompany = useHomeRecordStore.use.setContestCompany();
    const contestHandicap = useHomeRecordStore.use.contestHandicap();
    const setContestHandicap = useHomeRecordStore.use.setContestHandicap();
    const contestTime = useHomeRecordStore.use.contestTime();
    const setContestTime = useHomeRecordStore.use.setContestTime();
    const gameIsHome = useHomeRecordStore.use.gameIsHome();
    const setGameIsHome = useHomeRecordStore.use.setGameIsHome();
    const winLoseResult = useHomeRecordStore.use.winLoseResult();
    const setWinLoseResult = useHomeRecordStore.use.setWinLoseResult();
    const oddsDetailResult = useHomeRecordStore.use.oddsDetailResult();
    const setOddsDetailResult = useHomeRecordStore.use.setOddsDetailResult();

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
            tableData={homeRecordData}
            teamName={teamInfo.homeChs}
            winLoseResult={winLoseResult}
        />
    );
}

export default HomeRecordTable;
