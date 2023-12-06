'use client';
import { Switch } from 'ui/stories/switch/switch';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import ContestDrawerList from '../components/contestDrawerList';
import type { HandicapEchartType, Statistics } from '../../analysisResultStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import TextRadio from './switch/textSwitch';
import style from './handicap.module.scss';

type TimeValue = 'day' | 'week';
type PlayTypeValue = 'handicap' | 'overUnder' | 'moneyLine';

function TableCell({
    label,
    cellValue,
    setShowList
}: {
    label: string;
    cellValue: number[];
    setShowList: (isShow: boolean) => void;
}) {
    const setQueryMatchList = useAnalyticsResultStore.use.setQueryMatchList();

    const openMatchListDrawer = (matchIdsList: number[]) => {
        setQueryMatchList(matchIdsList);
        setShowList(true);
    };

    return (
        <div className={`${style.cell} ${label === '下' && style.odd}`}>
            <span
                onClick={() => {
                    openMatchListDrawer(cellValue);
                }}
            >
                {label} {cellValue.length}
            </span>
        </div>
    );
}

function Handicap() {
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('full');
    const [currentSwitch, setCurrentSwitch] = useState<TimeValue>('day');
    const [playTypeSwitch, setPlayTypeSwitch] = useState<PlayTypeValue>('handicap');
    const [showList, setShowList] = useState(false);
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();
    const recordData = useAnalyticsResultStore.use.recordData();
    const [chartData, setChartData] = useState<HandicapEchartType | null>(null);

    useEffect(() => {
        setChartData(handicapEchart);
    }, [handicapEchart]);

    const calculateHeight = (data: Record<string, Statistics>, date: string) => {
        const total = data[date].upper + data[date].draw + data[date].lower;
        return {
            upperHeight: (data[date].upper / total) * 100,
            drawHeight: (data[date].draw / total) * 100,
            lowerHeight: (data[date].lower / total) * 100
        };
    };

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
                    <p className={style.dateRange}>
                        {timestampToString(recordData.startDate)} ~{' '}
                        {timestampToString(recordData.endDate)}
                    </p>
                    <ul>
                        {chartData
                            ? Object.keys(
                                  chartData[handicapRadio][currentSwitch][playTypeSwitch]
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
                                                            chartData[handicapRadio][currentSwitch][
                                                                playTypeSwitch
                                                            ]
                                                        ).length - index
                                                    }`
                                                  : date}
                                          </span>
                                      </li>
                                  );
                              })
                            : null}
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
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfOverUnderUpper}
                    label="上"
                    setShowList={setShowList}
                />{' '}
                <TableCell
                    cellValue={analysisRecord.halfMoneyLineUpper}
                    label="上"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfHandicapLower}
                    label="下"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfOverUnderLower}
                    label="下"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfMoneyLineLower}
                    label="下"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfHandicapDraw}
                    label="走"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfOverUnderDraw}
                    label="走"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.halfMoneyLineDraw}
                    label="走"
                    setShowList={setShowList}
                />
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>全場讓球</div>
                <div className={style.header}>全場大小</div>
                <div className={style.header}>全場獨贏</div>
                <TableCell
                    cellValue={analysisRecord.fullHandicapUpper}
                    label="上"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullOverUnderUpper}
                    label="上"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullMoneyLineUpper}
                    label="上"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullHandicapLower}
                    label="下"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullOverUnderLower}
                    label="下"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullMoneyLineLower}
                    label="下"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullHandicapDraw}
                    label="走"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullOverUnderDraw}
                    label="走"
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.fullMoneyLineDraw}
                    label="走"
                    setShowList={setShowList}
                />
            </div>
            <ContestDrawerList
                isOpen={showList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                title="讓球大小/全場讓球/上盤"
            />
        </>
    );
}

export default Handicap;
