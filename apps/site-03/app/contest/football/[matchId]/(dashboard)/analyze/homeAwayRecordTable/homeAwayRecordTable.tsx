import HomeRecordTable from './homeRecordTable';
import AwayRecordTable from './awayRecordTable';

function HomeAwayRecordTable() {
    return (
        <>
            <div className="topBar">
                <h6 className="title">近期战绩</h6>
            </div>
            <HomeRecordTable />
            <AwayRecordTable />
        </>
    );
}

export default HomeAwayRecordTable;
