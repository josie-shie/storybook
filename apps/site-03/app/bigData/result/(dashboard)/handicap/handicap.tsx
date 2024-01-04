'use client';
import { Switch } from 'ui/stories/switch/switch';
import { useCallback, useEffect, useRef, useState } from 'react';
import { timestampToString } from 'lib';
import dayjs from 'dayjs';
import { getFootballStatsMatches } from 'data-center';
import Image from 'next/image';
import { useNotificationStore } from '@/app/notificationStore';
import type { Statistics } from '../../analysisResultStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import TextRadio from '../../components/switch/textSwitch';
import leftArrowIcon from '../../img/leftArrow.png';
import rightArrowIcon from '../../img/rightArrow.png';
import style from './handicap.module.scss';

type TimeValue = 'day' | 'week';
type PlayTypeValue = 'handicap' | 'overUnder' | 'moneyLine';

function TableCell({
    label,
    cellValue,
    selectedType,
    openMatchListDrawer,
    oddStyle
}: {
    label: string;
    cellValue?: number[];
    selectedType: string;
    oddStyle?: boolean;
    openMatchListDrawer: (matchIdsList: number[], selectedType: string, odds: string) => void;
}) {
    return (
        <div className={`${style.cell} ${oddStyle && style.odd}`}>
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

function ChartBottomText({ playTypeSwitch }: { playTypeSwitch: PlayTypeValue }) {
    let topText: string, middleText: string, bottomText: string;

    switch (playTypeSwitch) {
        case 'handicap':
            topText = '上盘';
            middleText = '走盘';
            bottomText = '下盘';
            break;
        case 'overUnder':
            topText = '大球';
            middleText = '走盘';
            bottomText = '小球';
            break;
        case 'moneyLine':
            topText = '主胜';
            middleText = '平手';
            bottomText = '客胜';
            break;
        default:
            topText = '';
            middleText = '';
            bottomText = '';
            break;
    }

    return (
        <div className={style.dot}>
            <span className={style.top}>{topText}</span>
            <span className={style.middle}>{middleText}</span>
            <span className={playTypeSwitch === 'moneyLine' ? style.moneyLineBottom : style.bottom}>
                {bottomText}
            </span>
        </div>
    );
}

function useDetectScrollEnds({ node }: { node: React.RefObject<HTMLElement> }) {
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = useCallback(() => {
        if (node.current) {
            const { scrollLeft, scrollWidth, clientWidth } = node.current;
            const atRight = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1;
            const atLeft = scrollLeft === 0;
            setIsAtTop(atLeft);
            setIsAtBottom(atRight);
        }
    }, [node]);

    useEffect(() => {
        const current = node.current;
        if (current) {
            current.addEventListener('scroll', handleScroll);
            return () => {
                current.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, node]);

    return { isAtTop, isAtBottom };
}

function Handicap() {
    const node = useRef<HTMLUListElement>(null);
    // 偵測圖表是否滑動到最2边，如果是的話會把blur的效果移除/添加
    const { isAtTop, isAtBottom } = useDetectScrollEnds({ node });
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('full');
    const [currentSwitch, setCurrentSwitch] = useState<TimeValue>('day');
    const [playTypeSwitch, setPlayTypeSwitch] = useState<PlayTypeValue>('handicap');
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();
    const analysisData = useAnalyticsResultStore.use.analysisResultData();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const setMatchList = useAnalyticsResultStore.use.setContestList();

    const calculateHeight = (data: Record<string, Statistics>, date: string) => {
        const total = data[date].upper + data[date].draw + data[date].lower;
        const upperHeight = (data[date].upper / total) * 100;
        const drawHeight = (data[date].draw / total) * 100;
        const lowerHeight = (data[date].lower / total) * 100;

        const heights = [upperHeight, drawHeight, lowerHeight];
        const minHeightIndex = heights.findIndex(h => h < 1 && h > 0);
        if (minHeightIndex !== -1) {
            const adjustment = 2 - heights[minHeightIndex];
            heights[minHeightIndex] = 2; // 将小于1%的部分调整至2%，让画面有最小高度显示

            const maxIndex = heights.indexOf(Math.max(...heights));
            heights[maxIndex] -= adjustment; // 从最大的数值中扣，维持整体100%
        }

        return {
            upperHeight: heights[0],
            drawHeight: heights[1],
            lowerHeight: heights[2]
        };
    };

    const fetchMatchList = async (matchIdList: number[]) => {
        const res = await getFootballStatsMatches({ matchIds: matchIdList });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        setMatchList(res.data);

        setContestList({
            contestList: res.data
        });
        setContestInfo({
            contestList: res.data
        });
        setShowContestDrawer(true);
    };

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string, odds: string) => {
        setSelectedResult({
            type: selectedType,
            odds
        });

        void fetchMatchList(matchIdsList);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    return (
        <>
            <div className={style.handicap}>
                <div className={style.control}>
                    <div className={style.left}>
                        {currentSwitch === 'day' &&
                        Object.keys(handicapEchart[handicapRadio][currentSwitch][playTypeSwitch])
                            .length <= 4 ? null : (
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
                        )}
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
                        {analysisData
                            ? timestampToString(analysisData.startTime, 'YYYY-MM-DD')
                            : null}{' '}
                        ~{' '}
                        {analysisData
                            ? timestampToString(analysisData.endTime, 'YYYY-MM-DD')
                            : null}
                    </p>
                    <div
                        className={style.blurCoverTop}
                        style={{
                            display:
                                Object.keys(
                                    handicapEchart[handicapRadio][currentSwitch][playTypeSwitch]
                                ).length > 9 && !isAtTop
                                    ? 'flex'
                                    : 'none'
                        }}
                    >
                        <Image alt="" height={16} src={leftArrowIcon.src} width={16} />
                    </div>
                    <div
                        className={style.blurCoverBottom}
                        style={{
                            display:
                                Object.keys(
                                    handicapEchart[handicapRadio][currentSwitch][playTypeSwitch]
                                ).length > 9 && !isAtBottom
                                    ? 'flex'
                                    : 'none'
                        }}
                    >
                        <Image alt="" height={16} src={rightArrowIcon.src} width={16} />
                    </div>
                    <ul
                        ref={node}
                        style={{
                            gap:
                                Object.keys(
                                    handicapEchart[handicapRadio][currentSwitch][playTypeSwitch]
                                ).length <= 3
                                    ? '32px'
                                    : '12px',

                            justifyContent:
                                Object.keys(
                                    handicapEchart[handicapRadio][currentSwitch][playTypeSwitch]
                                ).length >= 9
                                    ? 'spaceBetween'
                                    : 'center'
                        }}
                    >
                        {Object.keys(handicapEchart[handicapRadio][currentSwitch][playTypeSwitch])
                            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                            .map((date, index) => {
                                const totalDataLength = Object.keys(
                                    handicapEchart[handicapRadio][currentSwitch][playTypeSwitch]
                                ).length;
                                const currentData =
                                    handicapEchart[handicapRadio][currentSwitch][playTypeSwitch];
                                const heights = calculateHeight(currentData, date);

                                const total =
                                    currentData[date].draw +
                                    currentData[date].lower +
                                    currentData[date].upper;

                                let barWidth = 48;
                                let radius = 4;
                                if (totalDataLength >= 2 && totalDataLength <= 3) {
                                    barWidth = 24;
                                } else if (totalDataLength >= 4) {
                                    barWidth = 8;
                                    radius = 30;
                                }

                                return (
                                    <li key={date}>
                                        <span
                                            className={style.bar}
                                            style={{ borderRadius: `${radius}px` }}
                                        >
                                            <span
                                                className={`${style.top}`}
                                                style={{
                                                    height: `${heights.upperHeight}%`,
                                                    borderRadius:
                                                        heights.drawHeight === 0 &&
                                                        heights.lowerHeight === 0
                                                            ? '30px'
                                                            : '',
                                                    width: `${barWidth}px`
                                                }}
                                            />
                                            <span
                                                className={`${style.middle}`}
                                                style={{
                                                    height: `${heights.drawHeight}%`,
                                                    borderBottomLeftRadius:
                                                        heights.lowerHeight === 0 ? '30px' : '',
                                                    borderBottomRightRadius:
                                                        heights.lowerHeight === 0 ? '30px' : '',
                                                    borderTopLeftRadius:
                                                        heights.upperHeight === 0 ? '30px' : '',
                                                    borderTopRightRadius:
                                                        heights.upperHeight === 0 ? '30px' : '',
                                                    width: `${barWidth}px`
                                                }}
                                            />
                                            <span
                                                className={`${style.bottom}`}
                                                style={{
                                                    height: `${heights.lowerHeight}%`,
                                                    borderRadius:
                                                        heights.drawHeight === 0 &&
                                                        heights.upperHeight === 0
                                                            ? '30px'
                                                            : '',
                                                    width: `${barWidth}px`,
                                                    background:
                                                        playTypeSwitch === 'moneyLine'
                                                            ? '#6357F0'
                                                            : '#00ac6e'
                                                }}
                                            />
                                        </span>
                                        <span className={style.text}>
                                            {currentSwitch === 'week' ? (
                                                <>
                                                    <span>{`W${index + 1}`}</span>
                                                    <div>{total}场</div>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{dayjs(date).format('MM-DD')}</span>
                                                    <div>{total}场</div>
                                                </>
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                    <div className={style.eChartBottom}>
                        <Switch
                            onChange={(value: PlayTypeValue) => {
                                setPlayTypeSwitch(value);
                            }}
                            options={[
                                { label: '让分', value: 'handicap' },
                                { label: '大小', value: 'overUnder' },
                                { label: '独赢', value: 'moneyLine' }
                            ]}
                            value={playTypeSwitch}
                        />
                        <ChartBottomText playTypeSwitch={playTypeSwitch} />
                    </div>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>半场让分</div>
                <div className={style.header}>半场大小</div>
                <div className={style.header}>半场独赢</div>
                <TableCell
                    cellValue={analysisRecord?.halfHandicapUpper || []}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场让分"
                />
                <TableCell
                    cellValue={analysisRecord?.halfOverUnderOver || []}
                    label="大"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场大小"
                />{' '}
                <TableCell
                    cellValue={analysisRecord?.halfTimeHomeWin || []}
                    label="主"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场独赢"
                />
                <TableCell
                    cellValue={analysisRecord?.halfHandicapLower || []}
                    label="下"
                    oddStyle
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场让分"
                />
                <TableCell
                    cellValue={analysisRecord?.halfOverUnderUnder || []}
                    label="小"
                    oddStyle
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场大小"
                />
                <TableCell
                    cellValue={analysisRecord?.halfTimeAwayWin || []}
                    label="客"
                    oddStyle
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场独赢"
                />
                <TableCell
                    cellValue={analysisRecord?.halfHandicapDraw || []}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场让分"
                />
                <TableCell
                    cellValue={analysisRecord?.halfOverUnderDraw || []}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场大小"
                />
                <TableCell
                    cellValue={analysisRecord?.halfTimeDraw || []}
                    label="和"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="半场独赢"
                />
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>全场让分</div>
                <div className={style.header}>全场大小</div>
                <div className={style.header}>全场独赢</div>
                <TableCell
                    cellValue={analysisRecord?.fullHandicapUpper || []}
                    label="上"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场让分"
                />
                <TableCell
                    cellValue={analysisRecord?.fullOverUnderOver || []}
                    label="大"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场大小"
                />
                <TableCell
                    cellValue={analysisRecord?.fullTimeHomeWin || []}
                    label="主"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场独赢"
                />
                <TableCell
                    cellValue={analysisRecord?.fullHandicapLower || []}
                    label="下"
                    oddStyle
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场让分"
                />
                <TableCell
                    cellValue={analysisRecord?.fullOverUnderUnder || []}
                    label="小"
                    oddStyle
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场大小"
                />
                <TableCell
                    cellValue={analysisRecord?.fullTimeAwayWin || []}
                    label="客"
                    oddStyle
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场独赢"
                />
                <TableCell
                    cellValue={analysisRecord?.fullHandicapDraw || []}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场让分"
                />
                <TableCell
                    cellValue={analysisRecord?.fullOverUnderDraw || []}
                    label="走"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场大小"
                />
                <TableCell
                    cellValue={analysisRecord?.fullTimeDraw || []}
                    label="和"
                    openMatchListDrawer={openMatchListDrawer}
                    selectedType="全场独赢"
                />
            </div>
        </>
    );
}

export default Handicap;
