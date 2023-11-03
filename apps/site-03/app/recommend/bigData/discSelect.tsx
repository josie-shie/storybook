'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Star from './img/star.png';
import style from './disSelect.module.scss';
import RecordFilter from './components/recordFilter/recordFilter';

interface SectionSelectProps {
    title: string;
    selectTitle: string;
    items: string[];
}

function SectionSelect({ title, selectTitle, items }: SectionSelectProps) {
    return (
        <section className={style.items}>
            <p className={style.title}>{title}</p>
            <div className={style.select}>
                {selectTitle !== '' && <div className={style.selectTitle}>{selectTitle}</div>}
                {items.map((item: string) => (
                    <span className={style.selectItem} key={`${item}`}>
                        {item}
                    </span>
                ))}
            </div>
        </section>
    );
}

function DiscSelect() {
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const [showFilter, setShowFilter] = useState(false);

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
                            分析紀錄
                        </div>
                        <SectionSelect
                            items={['主隊', '2球']}
                            selectTitle="讓方"
                            title="全場讓球"
                        />
                        <SectionSelect items={['不挑選']} selectTitle="盤口" title="全場大小" />
                        <SectionSelect items={['3個月']} selectTitle="時間區間" title="時間範圍" />
                    </>
                ) : (
                    <SectionSelect items={['不挑選']} selectTitle="" title="玩法篩選" />
                )}
                <div className={style.tips}>
                    数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
                </div>
                <button className={style.search} type="button">
                    <Image alt="" height={14} src={Star} width={14} />
                    {search === 'analysis' ? '獲得趨勢分析' : '獲得盤路提示'}
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
