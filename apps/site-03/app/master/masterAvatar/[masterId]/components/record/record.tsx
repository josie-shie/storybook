import { ProgressBar } from 'ui';
import ReactEcharts from 'echarts-for-react';
import { type MemberIndividualGuessRecord } from 'data-center';
import style from './record.module.scss';

function Record({ individualGuessInfo }: { individualGuessInfo: MemberIndividualGuessRecord }) {
    const chartOption = {
        tooltip: {
            trigger: 'item',
            showContent: false
        },
        title: {
            text: `{${individualGuessInfo.rank}|1} \n周排名`,
            left: '46%',
            top: '47%',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 12, // 調整字體大小
                fontWeight: 'bold',
                lineHeight: 20,
                rich: {
                    large: {
                        fontSize: 24,
                        fontWeight: 'bold'
                    }
                }
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['60%', '85%'],
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'transparent'
                    },
                    scaleSize: 4
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 548,
                        name: 'Plan1',
                        itemStyle: { color: '#F3F3F3', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: 415,
                        name: 'Plan2',
                        itemStyle: { color: '#BFBFBF', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: 680,
                        name: 'Plan3',
                        itemStyle: { color: '#ED3A45', borderWidth: 2, borderColor: '#fff' }
                    }
                ]
            }
        ]
    };

    const formatRate = (lose: number, win: number) => {
        if (lose === 0 && win === 0) return 0;
        const winRate = (win / (lose + win)) * 100;
        return Number.isInteger(winRate) ? winRate : winRate.toFixed(1);
    };

    return (
        <>
            <ReactEcharts option={chartOption} style={{ width: 120, height: 120 }} />

            <div className={style.detailContainer}>
                <div className={`${style.detailBlock} ${style.focusDetail}`}>
                    <div className={style.top}>
                        <div className={style.total}>共{individualGuessInfo.summary.play}场</div>
                        <div className={style.percentage}>
                            <div className={style.win}>胜 {individualGuessInfo.summary.win}</div>
                            <div className={style.walk}>走 {individualGuessInfo.summary.draw}</div>
                            <div className={style.defeat}>
                                負 {individualGuessInfo.summary.lose}
                            </div>
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.winRate}>
                            勝率{' '}
                            {formatRate(
                                individualGuessInfo.summary.lose,
                                individualGuessInfo.summary.win
                            )}
                            %
                        </div>
                        <ProgressBar background="#8D8D8D" gapSize="small" height={4} radius />
                    </div>
                </div>
                <div className={style.detailBlock}>
                    <div className={style.top}>
                        <div className={style.total}>讓球{individualGuessInfo.handicap.play}场</div>
                        <div className={style.percentage}>
                            <div className={style.win}>胜 {individualGuessInfo.handicap.win}</div>
                            <div className={style.walk}>走 {individualGuessInfo.handicap.draw}</div>
                            <div className={style.defeat}>
                                負 {individualGuessInfo.handicap.lose}
                            </div>
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.winRate}>
                            勝率{' '}
                            {formatRate(
                                individualGuessInfo.handicap.lose,
                                individualGuessInfo.handicap.win
                            )}
                            %
                        </div>
                        <ProgressBar background="#8D8D8D" gapSize="small" height={4} radius />
                    </div>
                </div>
                <div className={style.detailBlock}>
                    <div className={style.top}>
                        <div className={style.total}>大小25场</div>
                        <div className={style.percentage}>
                            <div className={style.win}>胜 {individualGuessInfo.handicap.win}</div>
                            <div className={style.walk}>走 {individualGuessInfo.handicap.draw}</div>
                            <div className={style.defeat}>
                                負 {individualGuessInfo.handicap.lose}
                            </div>
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.winRate}>
                            勝率{' '}
                            {formatRate(
                                individualGuessInfo.handicap.lose,
                                individualGuessInfo.handicap.win
                            )}
                            %
                        </div>
                        <ProgressBar background="#8D8D8D" gapSize="small" height={4} radius />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Record;
