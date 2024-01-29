import type { ReactNode } from 'react';
import style from './optionButton.module.scss';

function OptionButton({
    onClick,
    label,
    imageSrc,
    name,
    checkedValue
}: {
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    imageSrc: ReactNode;
    name?: string;
    checkedValue: boolean;
}) {
    return (
        <label className={`option ${style.option} ${checkedValue ? style.active : ''}`}>
            <input
                checked={checkedValue}
                className={style.checkboxInput}
                name={name}
                onChange={onClick}
                style={{ display: 'none' }}
                type="checkbox"
            />
            {checkedValue ? <span className={style.select}>{imageSrc}</span> : null}
            <span className={style.label}>{label}</span>
        </label>
    );
}

export default OptionButton;
