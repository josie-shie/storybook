import type { ReactNode } from 'react';
import { GameFilter } from '../gameFilter/gameFilter';
import style from './selectOption.module.scss';

interface OptionType {
    label: string;
    value: string;
}

interface SectionSelectProps {
    title: string;
    selectTitle: string;
    options: OptionType[];
    placeholder: string;
    valueSelected: string;
    setSelected: (val: string) => void;
    children?: ReactNode;
    openDatePicker?: boolean;
    setOpenDatePicker?: (openDatePicker: boolean) => void;
}

function SelectOption({
    title,
    selectTitle,
    options,
    placeholder,
    valueSelected,
    setSelected,
    children,
    setOpenDatePicker
}: SectionSelectProps) {
    return (
        <section className={style.selectOption}>
            <p className={style.title}>{title}</p>
            <div className={style.select}>
                <div className={style.selectTitle}>{selectTitle}</div>
                <GameFilter
                    onChange={setSelected}
                    options={options}
                    placeholder={placeholder}
                    setOpenDatePicker={setOpenDatePicker}
                    showCloseButton={false}
                    showDragBar
                    title={selectTitle}
                    value={valueSelected}
                >
                    {children}
                </GameFilter>
            </div>
        </section>
    );
}

export default SelectOption;
