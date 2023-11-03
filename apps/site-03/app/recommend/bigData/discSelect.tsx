'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Star from './img/star.png';
import style from './disSelect.module.scss';
import RecordFilter from './components/recordFilter/recordFilter';
import { GameFilter } from './components/gameFilter/gameFilter';

// interface SectionSelectProps {
//     title: string;
//     selectTitle: string;
//     items: string[];
// }

// function SectionSelect({ title, selectTitle, items }: SectionSelectProps) {
//     const [showFilter, setShowFilter] = useState(false);

//     return (
//         <>
//             <section className={style.items}>
//                 <p className={style.title}>{title}</p>
//                 <div className={style.select}>
//                     {selectTitle !== '' && <div className={style.selectTitle}>{selectTitle}</div>}
//                     {items.map((item: string) => (
//                         <span className={style.selectItem} key={`${item}`}>
//                             {item}
//                         </span>
//                     ))}
//                 </div>
//             </section>
//             <RecordFilter
//                 isOpen={showFilter}
//                 onClose={() => {
//                     setShowFilter(false);
//                 }}
//                 onOpen={() => {
//                     setShowFilter(true);
//                 }}
//             />
//         </>
//     );
// }

function DiscSelect() {
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const [showFilter, setShowFilter] = useState(false);

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
                            <p className={style.title}>全場讓球</p>
                            <div className={style.select}>
                                <div className={style.selectTitle}>讓方</div>
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
                                    title="選擇讓方"
                                    value={null}
                                />
                            </div>
                        </section>
                        <section className={style.items}>
                            <p className={style.title}>全場大小</p>
                            <div className={style.select}>
                                <div className={style.selectTitle}>盤口</div>
                                <GameFilter
                                    options={numberList}
                                    placeholder="不挑选"
                                    showCloseButton={false}
                                    showDragBar
                                    title="選擇讓方"
                                    value={null}
                                />
                            </div>
                        </section>
                        <section className={style.items}>
                            <p className={style.title}>時間範圍</p>
                            <div className={style.select}>
                                <div className={style.selectTitle}>區間</div>
                                <GameFilter
                                    options={dateList}
                                    placeholder="选择时间"
                                    showCloseButton={false}
                                    showDragBar
                                    title="選擇讓方"
                                    value={null}
                                />
                            </div>
                        </section>
                    </>
                ) : (
                    <section className={style.items}>
                        <p className={style.title}>玩法篩選</p>
                        <div className={style.select}>
                            <GameFilter
                                options={playList}
                                placeholder="选择全场大小球"
                                showCloseButton={false}
                                showDragBar
                                title="选择全场大小球"
                                value={null}
                            />
                        </div>
                    </section>
                )}
                <div className={style.tips}>
                    数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
                </div>
                <button className={style.search} type="button">
                    <Image alt="" height={14} src={Star} width={14} />
                    {search === 'analysis' ? '获得趋势分析' : '获得盘路提示'}
                </button>
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
        </>
    );
}

export default DiscSelect;
