import HomeRecordTable from './homeRecordTable';
import AwayRecordTable from './awayRecordTable';
import style from './homeAwayRecordTable.module.scss';

function HomeAwayRecordTable() {
    return (
        <div className={style.homeAwayRecordTable}>
            <div className="topBar">
                <h6 className="title">近期战绩</h6>
            </div>
            <HomeRecordTable />
            <AwayRecordTable />
        </div>
    );
}

export default HomeAwayRecordTable;
