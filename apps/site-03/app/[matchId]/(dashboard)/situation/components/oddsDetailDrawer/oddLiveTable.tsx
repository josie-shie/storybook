import type { OddsRunningType } from 'data-center';
import { truncateFloatingPoint, handleMatchDateTime } from 'lib';

function OddLiveTable({ dataList = [] }: { dataList?: OddsRunningType[] }) {
    const headColumns = ['狀態', '比分', '', '盤口', '', '時間'];

    return (
        <div className="dataTable">
            <div className="tableHead">
                <div className="tr">
                    {headColumns.map((head, idx) => (
                        <div className="th" key={`${idx.toString()}`}>
                            {head}
                        </div>
                    ))}
                </div>
            </div>
            {dataList.length > 0 ? (
                <div className="tableBody">
                    {dataList.map((data, idx) => (
                        <div className="tr" key={`${idx.toString()}`}>
                            <div className="td">{data.runningTime}</div>
                            <div className="td">
                                {data.homeScore}-{data.awayScore}
                            </div>
                            {data.isClosed ? (
                                <>
                                    <div className="td hidden" />
                                    <div className="td colspan-3">封</div>
                                    <div className="td hidden" />
                                </>
                            ) : (
                                <>
                                    <div className="td">
                                        {truncateFloatingPoint(data.homeOrOverOdds, 2)}
                                    </div>
                                    <div className="td">{data.evenOdds}</div>
                                    <div className="td">
                                        <p>{truncateFloatingPoint(data.awayOrUnderOdds, 2)}</p>
                                    </div>
                                </>
                            )}

                            <div className="td">{handleMatchDateTime(data.oddsChangeTime)}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="tableBody">
                    <div className="tr">
                        {Array.from({ length: headColumns.length }).map((_, idx) => (
                            <div className="td" key={`${idx.toString()}`}>
                                -
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default OddLiveTable;
