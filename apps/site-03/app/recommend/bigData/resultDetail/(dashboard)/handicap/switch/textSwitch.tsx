import Image from 'next/image';
import style from './textSwitch.module.scss';
import SwitchIcon from './img/switch.png';

interface PropsType {
    value: string;
    onChange: (value: string) => void;
}

function TextRadio({ value, onChange }: PropsType) {
    const handleChange = () => {
        if (value === 'half') {
            onChange('full');
        } else {
            onChange('half');
        }
    };
    return (
        <div
            className={style.textSwitch}
            onClick={() => {
                handleChange();
            }}
        >
            <label
                className={`${style.label} 
                    ${value === 'full' ? style.active : undefined}`}
                htmlFor="full"
            >
                全場
            </label>
            <Image alt="icon" height={16} src={SwitchIcon} width={16} />
            <label
                className={`${style.label} 
                    ${value === 'half' ? style.active : undefined}`}
                htmlFor="half"
            >
                半場
            </label>
        </div>
    );
}

export default TextRadio;
