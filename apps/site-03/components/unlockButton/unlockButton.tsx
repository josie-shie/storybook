import Image from 'next/image';
import star from './img/starIcon.png';
import style from './unlockButton.module.scss';

interface PropsType {
    price?: number;
}

function UnlockButton({ price = 20 }: PropsType) {
    return (
        <button className={style.unlockButton} type="button">
            <Image alt="icon" src={star} style={{ width: '14px', height: '14px' }} />
            {price}元
        </button>
    );
}

export default UnlockButton;
