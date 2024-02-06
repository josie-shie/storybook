import { useState } from 'react';
import type {
    ExponentDetailHandicapsInfo,
    ExponentDetailWinDrawLoseInfo,
    ExponentDetailOverUnderInfo
} from 'data-center';
import { handleMatchDateTime, handicapToString, handleGameTime } from 'lib';
import CircularProgress from '@mui/material/CircularProgress';
import { useExponentStore } from '@/app/football/[matchId]/exponentStore';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import Select from '@/app/football/[matchId]/(dashboard)/components/select/select';
import style from './detailTable.module.scss';

interface ExponentInfoListType {
    handicap: Record<number, ExponentDetailHandicapsInfo[]>;
    overUnder: Record<number, ExponentDetailOverUnderInfo[]>;
    winDrawLose: Record<number, ExponentDetailWinDrawLoseInfo[]>;
    corners: Record<number, ExponentDetailOverUnderInfo[]>;
}

type OddTimeType = 'matchTime' | 'dateTime';

function Handicap({
    info,
    lastInfo
}: {
    info: ExponentDetailHandicapsInfo;
    lastInfo: ExponentDetailHandicapsInfo;
}) {
    return (
        <>
            <div
                className={`td ${lastInfo.homeOdds > info.homeOdds && 'greenText'} ${
                    lastInfo.homeOdds < info.homeOdds && 'redText'
                }`}
            >
                {info.homeOdds}
            </div>
            <div
                className={`td ${lastInfo.handicap > info.handicap && 'greenText'} ${
                    lastInfo.handicap < info.handicap && 'redText'
                }`}
            >
                {handicapToString(info.handicap)}
            </div>
            <div
                className={`td ${lastInfo.awayOdds > info.awayOdds && 'greenText'} ${
                    lastInfo.awayOdds < info.awayOdds && 'redText'
                }`}
            >
                {info.awayOdds}
            </div>
        </>
    );
}

function WinDrawLose({
    info,
    lastInfo
}: {
    info: ExponentDetailWinDrawLoseInfo;
    lastInfo: ExponentDetailWinDrawLoseInfo;
}) {
    return (
        <>
            <div
                className={`td ${lastInfo.homeWin > info.homeWin && 'greenText'} ${
                    lastInfo.homeWin < info.homeWin && 'redText'
                }`}
            >
                {info.homeWin}
            </div>
            <div
                className={`td ${lastInfo.draw > info.draw && 'greenText'} ${
                    lastInfo.draw < info.draw && 'redText'
                }`}
            >
                {handicapToString(info.draw)}
            </div>
            <div
                className={`td ${lastInfo.awayWin > info.awayWin && 'greenText'} ${
                    lastInfo.awayWin < info.awayWin && 'redText'
                }`}
            >
                {info.awayWin}
            </div>
        </>
    );
}

function OverUnder({
    info,
    lastInfo
}: {
    info: ExponentDetailOverUnderInfo;
    lastInfo: ExponentDetailOverUnderInfo;
}) {
    return (
        <>
            <div
                className={`td ${lastInfo.overOdds > info.overOdds && 'greenText'} ${
                    lastInfo.overOdds < info.overOdds && 'redText'
                }`}
            >
                {info.overOdds}
            </div>
            <div
                className={`td ${lastInfo.line > info.line && 'greenText'} ${
                    lastInfo.line < info.line && 'redText'
                }`}
            >
                {handicapToString(info.line)}
            </div>
            <div
                className={`td ${lastInfo.underOdds > info.underOdds && 'greenText'} ${
                    lastInfo.underOdds < info.underOdds && 'redText'
                }`}
            >
                {info.underOdds}
            </div>
        </>
    );
}

function OddDisplayTime({
    oddTime,
    state,
    oddsChangeTime
}: {
    oddTime: OddTimeType;
    state: number;
    oddsChangeTime: number;
}) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    if (oddTime === 'dateTime') {
        return <>{handleMatchDateTime(oddsChangeTime)}</>;
    }

    const gameTime = handleGameTime(
        state === 1 ? matchDetail.startTime : matchDetail.halfStartTime,
        state,
        oddsChangeTime
    );

    if (state === 0) {
        return <>{handleMatchDateTime(oddsChangeTime)}</>;
    }

    if (state === 1 || state === 3) {
        return <div className={`odd_${gameTime.state}`}>{gameTime.time}&apos;</div>;
    }

    return <div className={`odd_${gameTime.state}`}>{gameTime.text}</div>;
}

function OddTable({ dataList, oddTime }: { dataList: ExponentInfoListType; oddTime: OddTimeType }) {
    const tabValue = useExponentStore.use.detailSelectedKind();
    const detailCompanyId = useExponentStore.use.detailCompanyId();
    const isDetailLoading = useExponentStore.use.isDetailLoading();

    if (isDetailLoading) {
        return <CircularProgress className={style.loading} />;
    } else if (typeof dataList[tabValue][detailCompanyId] === 'undefined') {
        return (
            <div className="tr">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div className="td" key={`${idx.toString()}`}>
                        -
                    </div>
                ))}
            </div>
        );
    }

    const targetData =
        detailCompanyId in dataList[tabValue] ? dataList[tabValue][detailCompanyId] : [];

    return (
        <>
            {targetData.map(
                (
                    data:
                        | ExponentDetailHandicapsInfo
                        | ExponentDetailWinDrawLoseInfo
                        | ExponentDetailOverUnderInfo,
                    idx: number
                ) => (
                    <div className="tr" key={`${tabValue}_${detailCompanyId}_${idx.toString()}`}>
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
                                        lastInfo={
                                            idx === targetData.length - 1
                                                ? (data as ExponentDetailHandicapsInfo)
                                                : (targetData[
                                                      idx + 1
                                                  ] as ExponentDetailHandicapsInfo)
                                        }
                                    />
                                )}
                                {tabValue === 'winDrawLose' && (
                                    <WinDrawLose
                                        info={data as ExponentDetailWinDrawLoseInfo}
                                        lastInfo={
                                            idx === targetData.length - 1
                                                ? (data as ExponentDetailWinDrawLoseInfo)
                                                : (targetData[
                                                      idx + 1
                                                  ] as ExponentDetailWinDrawLoseInfo)
                                        }
                                    />
                                )}
                                {tabValue !== 'handicap' && tabValue !== 'winDrawLose' && (
                                    <OverUnder
                                        info={data as ExponentDetailOverUnderInfo}
                                        lastInfo={
                                            idx === targetData.length - 1
                                                ? (data as ExponentDetailOverUnderInfo)
                                                : (targetData[
                                                      idx + 1
                                                  ] as ExponentDetailOverUnderInfo)
                                        }
                                    />
                                )}
                            </>
                        )}

                        <div className="td">
                            <OddDisplayTime
                                oddTime={oddTime}
                                oddsChangeTime={data.oddsChangeTime}
                                state={data.state}
                            />
                        </div>
                        <div className="td">
                            {data.homeScore}-{data.awayScore}
                        </div>
                    </div>
                )
            )}
        </>
    );
}

function DetailTable({ dataList }: { dataList: ExponentInfoListType }) {
    const companyList = useExponentStore.use.companyList();
    const companyInfo = useExponentStore.use.companyInfo();
    const tabValue = useExponentStore.use.detailSelectedKind();
    const detailCompanyId = useExponentStore.use.detailCompanyId();
    const setDetailCompanyId = useExponentStore.use.setDetailCompanyId();

    const headTable = {
        handicap: ['主队', '走势', '客队'],
        winDrawLose: ['主胜', '平局', '客胜'],
        overUnder: ['多', '走势', '少'],
        corners: ['多', '走势', '少']
    };

    const oddTimeOption = [
        { label: '开赛倒计时', value: 'matchTime' },
        { label: '日期/时间', value: 'dateTime' }
    ];

    const [oddTime, setOddTime] = useState<OddTimeType>('matchTime');

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
                        <div className="th">
                            <Select
                                onChange={value => {
                                    setOddTime(value as OddTimeType);
                                }}
                                options={oddTimeOption}
                                selectedValue={oddTime}
                            />
                        </div>
                        <div className="th">{tabValue === 'corners' ? '角球' : '比分'}</div>
                    </div>
                </div>
                <div className="tableBody">
                    <OddTable dataList={dataList} oddTime={oddTime} />
                </div>
            </div>
        </div>
    );
}

export default DetailTable;
