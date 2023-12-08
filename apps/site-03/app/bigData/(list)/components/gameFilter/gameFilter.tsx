import { SwipeableDrawer } from '@mui/material';
import type { ReactNode } from 'react';
import { useState } from 'react';
import style from './gameFilter.module.scss';

interface OptionType {
    label: string;
    value: number | string | boolean;
}

interface PropsType {
    value: OptionType['value'] | null;
    options: OptionType[];
    title?: string;
    placeholder?: string;
    showDragBar?: boolean;
    showCloseButton?: boolean;
    onChange?: (value: OptionType['value']) => void;
    children?: ReactNode;
    setOpenDatePicker?: (openModal: boolean) => void;
}

function GameFilter({
    value: initialValue,
    options,
    title,
    placeholder = '請選擇',
    showDragBar,
    showCloseButton,
    onChange,
    children,
    setOpenDatePicker
}: PropsType) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<OptionType['value'] | null>(initialValue);
    const currentOption = options.find(opt => opt.value === selectedValue);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClick = (value: OptionType['value']) => {
        setSelectedValue(value);
        if (onChange) onChange(value);
        setIsOpen(false);
    };

    return (
        <>
            <div className={style.inputGroup}>
                <button
                    className={`ui-select ${style.selectButton}`}
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    type="button"
                >
                    {selectedValue !== null && currentOption ? currentOption.label : placeholder}
                </button>
                {children}
            </div>

            <SwipeableDrawer
                PaperProps={{
                    style: {
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px'
                    }
                }}
                anchor="bottom"
                onClose={handleClose}
                onOpen={handleOpen}
                open={isOpen}
            >
                <div className={style.selectDrawer}>
                    {showDragBar ? <div className={style.dragBar} /> : null}
                    {title ? (
                        <div className={style.topSpace}>
                            <div className={style.title}>{title}</div>
                        </div>
                    ) : null}
                    <ul className={style.drawerContainer}>
                        {options.map(opt => (
                            <li className={style.optionItem} key={opt.label}>
                                <button
                                    className={`${style.option} ${
                                        selectedValue === opt.value ? style.selected : ''
                                    }`}
                                    onClick={() => {
                                        if (opt.value === 'setRange') {
                                            setOpenDatePicker && setOpenDatePicker(true);
                                        }
                                        handleClick(opt.value);
                                    }}
                                    type="button"
                                >
                                    {opt.label}
                                </button>
                            </li>
                        ))}
                        {showCloseButton ? (
                            <li className={style.optionItem}>
                                <button
                                    className={style.cancelButton}
                                    onClick={() => {
                                        handleClose();
                                    }}
                                    type="button"
                                >
                                    取消
                                </button>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </SwipeableDrawer>
        </>
    );
}

export { GameFilter };
