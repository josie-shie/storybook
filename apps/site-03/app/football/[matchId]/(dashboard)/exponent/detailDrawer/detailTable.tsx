import type {
    ExponentDetailHandicapsInfo,
    ExponentDetailWinDrawLoseInfo,
    ExponentDetailOverUnderInfo
} from 'data-center';
import { handleMatchDateTime } from 'lib';
import { useExponentStore } from '@/app/football/[matchId]/exponentStore';
import style from './detailTable.module.scss';

function Handicap({ info }: { info: ExponentDetailHandicapsInfo }) {
    return (
        <>
            <div className="td">{info.homeOdds}</div>
            <div className="td">{info.handicap}</div>
            <div className="td">{info.awayOdds}</div>
        </>
    );
}

function WinDrawLose({ info }: { info: ExponentDetailWinDrawLoseInfo }) {
    return (
        <>
            <div className="td">{info.homeWin}</div>
            <div className="td">{info.draw}</div>
            <div className="td">{info.awayWin}</div>
        </>
    );
}

function OverUnder({ info }: { info: ExponentDetailOverUnderInfo }) {
    return (
        <>
            <div className="td">{info.overOdds}</div>
            <div className="td">{info.line}</div>
            <div className="td">{info.underOdds}</div>
        </>
    );
}
function DetailTable({
    dataList
}: {
    dataList:
        | ExponentDetailHandicapsInfo[]
        | ExponentDetailWinDrawLoseInfo[]
        | ExponentDetailOverUnderInfo[];
}) {
    const tabValue = useExponentStore.use.detailSelectedKind();
    const companyList = useExponentStore.use.companyList();
    const companyInfo = useExponentStore.use.companyInfo();
    const detailCompanyId = useExponentStore.use.detailCompanyId();
    const setDetailCompanyId = useExponentStore.use.setDetailCompanyId();

    const headTable = {
        handicap: ['主队', '走势', '客队'],
        winDrawLose: ['主胜', '平局', '客胜'],
        overUnder: ['多', '走势', '少'],
        corners: ['多', '走势', '少']
    };

    return (
        <div className={style.detailTable}>
            <div className={style.companyList}>
                <div className={style.company}>公司</div>
                {companyList[tabValue].map(companyId => (
                    <div
                        className={`${style.company} ${
                            companyId === detailCompanyId && style.active
                        }`}
                        key={`${tabValue}_${companyId}`}
                        onClick={() => {
                            setDetailCompanyId(companyId);
                        }}
                    >
                        {companyInfo[tabValue][companyId].companyName}
                    </div>
                ))}
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        {headTable[tabValue].map((head, idx) => (
                            <div className="th" key={`${idx.toString()}`}>
                                {head}
                            </div>
                        ))}
                        <div className="th">時間</div>
                        <div className="th">{tabValue === 'corners' ? '角球' : '比分'}</div>
                    </div>
                </div>
                {dataList.length > 0 ? (
                    <div className="tableBody">
                        {dataList.map(
                            (
                                data:
                                    | ExponentDetailHandicapsInfo
                                    | ExponentDetailWinDrawLoseInfo
                                    | ExponentDetailOverUnderInfo,
                                idx: number
                            ) => (
                                <div
                                    className="tr"
                                    key={`${tabValue}_${detailCompanyId}_${idx.toString()}`}
                                >
                                    {data.closed ? (
                                        <>
                                            <div className="td">-</div>
                                            <div className="td">封</div>
                                            <div className="td">-</div>
                                        </>
                                    ) : (
                                        <>
                                            {tabValue === 'handicap' && (
                                                <Handicap
                                                    info={data as ExponentDetailHandicapsInfo}
                                                />
                                            )}
                                            {tabValue === 'winDrawLose' && (
                                                <WinDrawLose
                                                    info={data as ExponentDetailWinDrawLoseInfo}
                                                />
                                            )}
                                            {tabValue !== 'handicap' &&
                                                tabValue !== 'winDrawLose' && (
                                                    <OverUnder
                                                        info={data as ExponentDetailOverUnderInfo}
                                                    />
                                                )}
                                        </>
                                    )}

                                    <div className="td">
                                        {handleMatchDateTime(data.oddsChangeTime)}
                                    </div>
                                    <div className="td">
                                        {data.homeScore}-{data.awayScore}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div className="tableBody">
                        <div className="tr">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div className="td" key={`${idx.toString()}`}>
                                    -
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailTable;
