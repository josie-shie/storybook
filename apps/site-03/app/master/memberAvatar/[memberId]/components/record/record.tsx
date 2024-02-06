import ReactEcharts from 'echarts-for-react';
import { type MemberIndividualGuessRecord } from 'data-center';
import style from './record.module.scss';

const formatRate = (lose: number, win: number) => {
    if (lose === 0 && win === 0) return 0;
    const winRate = (win / (lose + win)) * 100;
    return Number.isInteger(winRate) ? winRate : winRate.toFixed(1);
};

function Record({ individualGuessInfo }: { individualGuessInfo: MemberIndividualGuessRecord }) {
    const chartOption = {
        tooltip: {
            trigger: 'item',
            showContent: false
        },
        title: {
            text: `{win|胜率}{large|${individualGuessInfo.summary.play}}{point|%} \n{small|共${individualGuessInfo.summary.play}场}`,
            left: '46%',
            top: '47%',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 12, // 调整字体大小
                fontWeight: 'bold',
                lineHeight: 20,
                rich: {
                    win: {
                        fontSize: 12,
                        color: '#4a4a4a',
                        fontWeight: 'bold'
                    },
                    large: {
                        fontSize: 18,
                        color: '#4a4a4a',
                        fontWeight: 'bold'
                    },
                    point: {
                        fontSize: 12,
                        color: '#4a4a4a',
                        fontWeight: 'bold'
                    },
                    small: {
                        color: '#8d8d8d',
                        fontSize: 12,
                        borderWidth: 4,
                        borderRadius: 2,
                        borderColor: '#f3f3f3',
                        backgroundColor: '#f3f3f3'
                    }
                }
            }
        },
        graphic: [
            {
                type: 'ring', // 或者使用 'circle' 並自己設定一個邊框寬度
                left: 'center',
                top: 'center',
                shape: {
                    r: 44, // 內半徑，取決於你的圓餅圖的大小和期望的邊框大小
                    r0: 45.5 // 外半徑，應該比內半徑大，差值決定邊框寬度
                },
                style: {
                    fill: 'none', // 無填充色
                    stroke: '#f3f3f3', // 邊框顏色
                    lineWidth: 17, // 邊框寬度
                    shadowColor: 'none' // 可選，邊框陰影顏色
                }
            }
        ],
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['65%', '85%'],
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
                        value: individualGuessInfo['summary'].win,
                        name: 'Plan1',
                        itemStyle: {
                            color: '#e34b4b',
                            borderWidth: 6,
                            borderRadius: 6,
                            borderColor: '#f3f3f3'
                        }
                    },
                    {
                        value: individualGuessInfo['summary'].draw,
                        name: 'Plan2',
                        itemStyle: {
                            color: '#9fc2ff',
                            borderWidth: 6,
                            borderRadius: 6,
                            borderColor: '#f3f3f3'
                        }
                    },
                    {
                        value: individualGuessInfo['summary'].lose,
                        name: 'Plan3',
                        itemStyle: {
                            color: '#d9d9d9',
                            borderWidth: 6,
                            borderRadius: 6,
                            borderColor: '#f3f3f3'
                        }
                    }
                ]
            }
        ]
    };

    return (
        <>
            <ReactEcharts option={chartOption} style={{ width: 120, height: 120 }} />

            <div className={style.detailContainer}>
                <div className={style.detailBlock}>
                    <div className={style.top}>
                        <div className={style.total}>
                            胜负 {individualGuessInfo.handicap.play} 场
                        </div>
                        <div className={style.winRate}>
                            胜率{' '}
                            {formatRate(
                                individualGuessInfo.handicap.lose,
                                individualGuessInfo.handicap.win
                            )}
                            %
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.percentage}>
                            <div className={style.win}>
                                <i></i>胜 {individualGuessInfo.handicap.win}
                            </div>
                            <div className={style.walk}>
                                <i></i>走 {individualGuessInfo.handicap.draw}
                            </div>
                            <div className={style.defeat}>
                                <i></i>负 {individualGuessInfo.handicap.lose}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.detailBlock}>
                    <div className={style.top}>
                        <div className={style.total}>总进球 {individualGuessInfo.size.play} 场</div>
                        <div className={style.winRate}>
                            胜率{' '}
                            {formatRate(
                                individualGuessInfo.size.lose,
                                individualGuessInfo.size.win
                            )}
                            %
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.percentage}>
                            <div className={style.win}>
                                <i></i>胜 {individualGuessInfo.size.win}
                            </div>
                            <div className={style.walk}>
                                <i></i>走 {individualGuessInfo.size.draw}
                            </div>
                            <div className={style.defeat}>
                                <i></i>负 {individualGuessInfo.size.lose}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Record;
