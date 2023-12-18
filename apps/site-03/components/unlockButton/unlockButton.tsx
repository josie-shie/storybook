import Image from 'next/image';
import { motion } from 'framer-motion';
import star from './img/starIcon.png';
import style from './unlockButton.module.scss';

interface PropsType {
    price?: number;
}

function UnlockButton({ price = 20 }: PropsType) {
    return (
        <motion.button className={style.unlockButton} type="button" whileTap={{ scale: 0.9 }}>
            <Image alt="icon" src={star} style={{ width: '14px', height: '14px' }} />
            {price}
        </motion.button>
    );
}

export default UnlockButton;
