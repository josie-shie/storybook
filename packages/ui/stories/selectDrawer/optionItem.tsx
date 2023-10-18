import style from './optionItem.module.scss';

export interface OptionItemProps<T> {
    value: T;
    children: React.ReactNode;
    isSelected?: boolean;
    onClick?: (value: T) => void;
}

function OptionItem<T>({ value, isSelected, onClick, children }: OptionItemProps<T>) {
    const handleClick = () => {
        if (onClick) {
            onClick(value);
        }
    };

    return (
        <li className={style.optionItem}>
            <button
                className={`${style.option} ${isSelected ? style.selected : ''}`}
                onClick={handleClick}
                type="button"
            >
                {children}
            </button>
        </li>
    );
}

export { OptionItem };
