'use client';
import { Switch } from 'ui/stories/switch/switch';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import ContestDrawerList from '../components/contestDrawerList';
import type { Statistics, Match } from '../../analysisResultStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import TextRadio from './switch/textSwitch';
import style from './handicap.module.scss';

const matchs = [
    {
        startTime: 1699280450,
        matchId: 2504100,
        countryCn: '科威特',
        leagueId: 923,
        leagueChsShort: '科威甲',
        homeChs: 'Al沙希尔',
        awayChs: '伯根',
        homeScore: 3,
        awayScore: 0,
        homeHalfScore: 3,
        awayHalfScore: 0,
        isFamous: true,
        leagueLevel: 1
    }
];

type TimeValue = 'day' | 'week';
type PlayTypeValue = 'handicap' | 'overUnder' | 'moneyLine';

function TableCell({
    label,
    cellValue,
    selectedType,
    openMatchListDrawer
}: {
    label: string;
    cellValue?: number[];
    selectedType: string;
    openMatchListDrawer: (matchIdsList: number[], selectedType: string, odds: string) => void;
}) {
    return (
        <div className={`${style.cell} ${label === '下' && style.odd}`}>
            <span
                onClick={() => {
                    openMatchListDrawer(cellValue || [], selectedType, label);
                }}
            >
                {label} {cellValue ? cellValue.length : null}
            </span>
        </div>
    );
}

function Handicap() {
    const params = useParams();
    const setRecordData = useAnalyticsResultStore.use.setRecordData();
    const recordList = useAnalyticsResultStore.use.recordList();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('full');
    const [currentSwitch, setCurrentSwitch] = useState<TimeValue>('day');
    const [playTypeSwitch, setPlayTypeSwitch] = useState<PlayTypeValue>('handicap');
    const [showList, setShowList] = useState(false);
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();
    const analysisData = useAnalyticsResultStore.use.analysisResultData();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();
    const [matchList, setMatchList] = useState<Match[]>([]);
    const [selectedResult, setSelectedResult] = useState({
        type: '',
        odds: ''
    });
    const recordData = recordList.find(item => item.recordId.toString() === params.recordId);

    useEffect(() => {
        setHandicapEchart(analysisData);
    }, [analysisData, setHandicapEchart]);

    const calculateHeight = (data: Record<string, Statistics>, date: string) => {
        const total = data[date].upper + data[date].draw + data[date].lower;
        return {
            upperHeight: (data[date].upper / total) * 100,
            drawHeight: (data[date].draw / total) * 100,
            lowerHeight: (data[date].lower / total) * 100
        };
    };

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string, odds: string) => {
        // eslint-disable-next-line -- for api request
        console.dir(matchIdsList);
        setMatchList(matchs);
        setSelectedResult({
            type: selectedType,
            odds
        });
        setContestList({
            contestList: matchs
        });
        setContestInfo({
            contestList: matchs
        });

        setShowList(true);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        if (recordData) {
            setRecordData(recordData);
        }
    }, [recordData, setRecordData]);

    return (
        <>
            <div className={style.handicap}>
                <div className={style.control}>
                    <div className={style.left}>
                        <Switch
                            onChange={(value: TimeValue) => {
                                setCurrentSwitch(value);
                            }}
                            options={[
                                { label: '日', value: 'day' },
                                { label: '周', value: 'week' }
                            ]}
                            value={currentSwitch}
                        />
                    </div>
                    <div className={style.right}>
                        <TextRadio
                            onChange={value => {
                                setHandicapRadio(value as 'half' | 'full');
                            }}
                            value={handicapRadio}
                        />
                    </div>
                </div>
                <div className={style.eChat}>
                    {recordData ? (
                        <p className={style.dateRange}>
                            {timestampToString(recordData.startDate, 'YYYY-MM-DD')} ~{' '}
                            {timestampToString(recordData.endDate, 'YYYY-MM-DD')}
                        </p>
                    ) : null}

                    <ul>
                        {Object.keys(
                            handicapEchart[handicapRadio][currentSwitch][playTypeSwitch]
                        ).map((date, index) => {
                            const heights = calculateHeight(
                                handicapEchart[handicapRadio][currentSwitch][playTypeSwitch],
                                date
                            );

                            return (
                                <li key={date}>
                                    <span className={style.bar}>
                                        <span
                                            className={style.top}
                                            style={{ height: `${heights.upperHeight}%` }}
                                        />
                                        <span
                                            className={style.middle}
                                            style={{ height: `${heights.drawHeight}%` }}
                                        />
                                        <span
                                            className={style.bottom}
                                            style={{ height: `${heights.lowerHeight}%` }}
                                        />
                                    </span>
                                    <span className={style.text}>
                                        {currentSwitch === 'week'
                                            ? `W${
                                                  Object.keys(
                                                      handicapEchart[handicapRadio][currentSwitch][
                                                          playTypeSwitch
                                                      ]
                                                  ).length - index
                                              }`
                                            : dayjs(date).format('MM-DD')}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <Switch
                        onChange={(value: PlayTypeValue) => {
                            setPlayTypeSwitch(value);
                        }}
                        options={[
                            { label: '让球', value: 'handicap' },
                            { label: '大小', value: 'overUnder' },
                            { label: '独赢', value: 'moneyLine' }
                        ]}
                        value={playTypeSwitch}
                    />
                </div>
                <div className={style.dot}>
                    <span className={style.top}>上盤</span>
                    <span className={style.middle}>走盤</span>
                    <span className={style.bottom}>下盤</span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>半場讓球</div>
                <div className={style.header}>半場大小</div>
                <div className={style.header}>半場獨贏</div>
                <TableCell
                    cellValue={analysisRecord.halfHandicapUpper}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場讓球"
                />
                <TableCell
                    cellValue={analysisRecord.halfOverUnderUpper}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場大小"
                />{' '}
                <TableCell
                    cellValue={analysisRecord.halfMoneyLineUpper}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場獨贏"
                />
                <TableCell
                    cellValue={analysisRecord.halfHandicapLower}
                    label="下"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場讓球"
                />
                <TableCell
                    cellValue={analysisRecord.halfOverUnderLower}
                    label="下"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場大小"
                />
                <TableCell
                    cellValue={analysisRecord.halfMoneyLineLower}
                    label="下"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場獨贏"
                />
                <TableCell
                    cellValue={analysisRecord.halfHandicapDraw}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場讓球"
                />
                <TableCell
                    cellValue={analysisRecord.halfOverUnderDraw}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場大小"
                />
                <TableCell
                    cellValue={analysisRecord.halfMoneyLineDraw}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半場獨贏"
                />
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>全場讓球</div>
                <div className={style.header}>全場大小</div>
                <div className={style.header}>全場獨贏</div>
                <TableCell
                    cellValue={analysisRecord.fullHandicapUpper}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場讓球"
                />
                <TableCell
                    cellValue={analysisRecord.fullOverUnderUpper}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場大小"
                />
                <TableCell
                    cellValue={analysisRecord.fullMoneyLineUpper}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場獨贏"
                />
                <TableCell
                    cellValue={analysisRecord.fullHandicapLower}
                    label="下"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場讓球"
                />
                <TableCell
                    cellValue={analysisRecord.fullOverUnderLower}
                    label="下"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場大小"
                />
                <TableCell
                    cellValue={analysisRecord.fullMoneyLineLower}
                    label="下"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場獨贏"
                />
                <TableCell
                    cellValue={analysisRecord.fullHandicapDraw}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場讓球"
                />
                <TableCell
                    cellValue={analysisRecord.fullOverUnderDraw}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場大小"
                />
                <TableCell
                    cellValue={analysisRecord.fullMoneyLineDraw}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全場獨贏"
                />
            </div>
            <ContestDrawerList
                isOpen={showList}
                matchList={matchList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                selectedResult={selectedResult}
            />
        </>
    );
}

export default Handicap;
