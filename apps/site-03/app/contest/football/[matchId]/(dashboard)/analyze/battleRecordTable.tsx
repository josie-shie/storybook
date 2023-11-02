import RecordTable from './components/recordTable/recordTable';
import { useAnalyzeStore } from './analyzeStore';

function BattleRecordTable() {
    const tableData = useAnalyzeStore.use.battleRecordData();

    return <RecordTable mode="battle" showTitle tableData={tableData} />;
}

export default BattleRecordTable;
