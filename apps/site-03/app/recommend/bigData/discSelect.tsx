'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Star from './img/star.png';
import style from './disSelect.module.scss';
import RecordFilter from './components/recordFilter/recordFilter';
import HandicapDrawer from './components/handicapDrawer/handicapDrawer';
import { GameFilter } from './components/gameFilter/gameFilter';
import { creatDiscSelectStore } from './discSelectStore';

interface OptionType {
    label: string;
    value: string;
}

interface SectionSelectProps {
    title: string;
    selectTitle: string;
    options: OptionType[];
    placeholder: string;
}

function SectionSelect({ title, selectTitle, options, placeholder }: SectionSelectProps) {
    return (
        <section className={style.items}>
            <p className={style.title}>{title}</p>
            <div className={style.select}>
                <div className={style.selectTitle}>{selectTitle}</div>
                <GameFilter
                    options={options}
                    placeholder={placeholder}
                    showCloseButton={false}
                    showDragBar
                    title={selectTitle}
                    value={null}
                />
            </div>
        </section>
    );
}

function DiscSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const [showFilter, setShowFilter] = useState(false);
    const [showHandicapDrawer, setShowHandicapDrawer] = useState(false);

    const goDetail = () => {
        router.push(`/recommend/bigData/resultDetail/handicap`);
    };

    creatDiscSelectStore({
        handicapTips: [
            {
                id: 181,
                betType: 'handicap',
                betStatus: 'big',
                gamesNumber: 2,
                hot: false
            },
            {
                id: 238,
                betType: 'total',
                betStatus: 'small',
                gamesNumber: 3,
                hot: false
            },
            {
                id: 532,
                betType: 'total',
                betStatus: 'lose',
                gamesNumber: 2,
                hot: true
            },
            {
                id: 636,
                betType: 'handicap',
                betStatus: 'lose',
                gamesNumber: 3,
                hot: false
            },
            {
                id: 678,
                betType: 'total',
                betStatus: 'win',
                gamesNumber: 2,
                hot: true
            },
            {
                id: 768,
                betType: 'total',
                betStatus: 'big',
                gamesNumber: 5,
                hot: false
            }
        ]
    });

    const handicapList = [
        {
            label: '主',
            value: 'home'
        },
        {
            label: '客',
            value: 'away'
        },
        {
            label: '全部',
            value: 'all'
        }
    ];

    const numberList = [
        {
            label: '0',
            value: '0'
        },
        {
            label: '0/0.5',
            value: '0/0.5'
        },
        {
            label: '0.5',
            value: '0.5'
        },
        {
            label: '0.5/1',
            value: '0.5/1'
        },
        {
            label: '1',
            value: '1'
        },
        {
            label: '1/1.5',
            value: '1/1.5'
        },
        {
            label: '1.5',
            value: '1.5'
        },
        {
            label: '1.5/2',
            value: '1.5/2'
        },
        {
            label: '2',
            value: '2'
        }
    ];

    const dateList = [
        {
            label: '最近一週',
            value: 'week'
        },
        {
            label: '最近一月',
            value: 'month'
        },
        {
            label: '最近一季',
            value: 'season'
        }
    ];

    const playList = [
        {
            label: '全場大小球',
            value: 'fullSize'
        },
        {
            label: '半場大小球',
            value: 'halfSize'
        },
        {
            label: '全場讓球',
            value: 'full'
        },
        {
            label: '半場讓球',
            value: 'half'
        }
    ];

    return (
        <>
            <div className={style.discSelect}>
                {search === 'analysis' ? (
                    <>
                        <div
                            className={style.record}
                            onClick={() => {
                                setShowFilter(true);
                            }}
                        >
                            分析纪录
                        </div>
                        <section className={style.items}>
                            <p className={style.title}>全场让球</p>
                            <div className={style.select}>
                                <div className={style.selectTitle}>让方</div>
                                <GameFilter
                                    options={handicapList}
                                    placeholder="选择主队"
                                    showCloseButton={false}
                                    showDragBar
                                    title="选择让方"
                                    value={null}
                                />
                                <GameFilter
                                    options={numberList}
                                    placeholder="选择让球"
                                    showCloseButton={false}
                                    showDragBar
                                    title="选择让方"
                                    value={null}
                                />
                            </div>
                        </section>
                        <SectionSelect
                            options={numberList}
                            placeholder="不挑选"
                            selectTitle="盘口"
                            title="全场大小"
                        />
                        <SectionSelect
                            options={dateList}
                            placeholder="选择时间"
                            selectTitle="区间"
                            title="时间范围"
                        />
                    </>
                ) : (
                    <SectionSelect
                        options={playList}
                        placeholder="选择全场大小球"
                        selectTitle="选择全场大小球"
                        title="玩法筛选"
                    />
                )}
                <div className={style.tips}>
                    数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
                </div>
                {search === 'analysis' ? (
                    <button
                        className={style.search}
                        onClick={() => {
                            goDetail();
                        }}
                        type="button"
                    >
                        <Image alt="" height={14} src={Star} width={14} />
                        获得趋势分析
                    </button>
                ) : (
                    <button
                        className={style.search}
                        onClick={() => {
                            setShowHandicapDrawer(true);
                        }}
                        type="button"
                    >
                        <Image alt="" height={14} src={Star} width={14} />
                        获得盘路提示
                    </button>
                )}
            </div>

            <RecordFilter
                isOpen={showFilter}
                onClose={() => {
                    setShowFilter(false);
                }}
                onOpen={() => {
                    setShowFilter(true);
                }}
            />
            <HandicapDrawer
                isOpen={showHandicapDrawer}
                onClose={() => {
                    setShowHandicapDrawer(false);
                }}
                onOpen={() => {
                    setShowHandicapDrawer(true);
                }}
            />
        </>
    );
}

export default DiscSelect;
