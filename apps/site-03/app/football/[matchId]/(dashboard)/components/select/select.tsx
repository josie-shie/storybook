import { CustomSelect } from 'ui';
import style from './select.module.scss';

interface OptionType {
    label: string;
    value: string | number;
}

interface PropsType {
    options: OptionType[];
    selectedValue: number | string;
    onChange: (value: OptionType['value']) => void;
}

function Select({ options, selectedValue, onChange }: PropsType) {
    return (
        <div className={style.customSelect}>
            <CustomSelect
                onChange={onChange}
                options={options}
                showCloseButton
                showDragBar={false}
                value={selectedValue}
            />
        </div>
    );
}

export default Select;
