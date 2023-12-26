import Image from 'next/image';
import style from './optionButton.module.scss';

function OptionButton({
    active,
    onClick,
    label,
    imageSrc
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    imageSrc: string;
}) {
    return (
        <button
            className={`option ${style.option} ${active ? style.active : ''}`}
            onClick={onClick}
            type="button"
        >
            {active ? (
                <Image alt="" className={style.select} height={15} src={imageSrc} width={16} />
            ) : null}
            {label}
        </button>
    );
}

export default OptionButton;
