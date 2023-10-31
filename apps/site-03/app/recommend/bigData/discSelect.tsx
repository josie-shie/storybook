'use client';
import { useSearchParams } from 'next/navigation';
import style from './disSelect.module.scss';

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

    return (
        <div className={style.discSelect}>
            {search === 'analysis' ? (
                <>
                    <SectionSelect items={['主隊', '2球']} selectTitle="讓方" title="全場讓球" />
                    <SectionSelect items={['不挑選']} selectTitle="盤口" title="全場大小" />
                    <SectionSelect items={['3個月']} selectTitle="時間區間" title="時間範圍" />
                </>
            ) : (
                <SectionSelect items={['不挑選']} selectTitle="" title="玩法篩選" />
            )}
            <button
                className={style.search}
                // onClick={handleNavigation}
                type="button"
            >
                查詢
            </button>
        </div>
    );
}

export default DiscSelect;
