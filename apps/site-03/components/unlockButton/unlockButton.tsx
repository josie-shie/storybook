import Image from 'next/image';
import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { useUserStore } from '@/app/userStore';
import star from './img/starIcon.png';
import style from './unlockButton.module.scss';

interface PropsType {
    price?: number;
    handleClick?: () => void;
}

function UnlockButton({ price, handleClick }: PropsType) {
    const isVip = useUserStore.use.memberSubscribeStatus();

    const clickStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        handleClick?.();
    };

    return (
        <motion.button
            className={style.unlockButton}
            onClick={e => {
                clickStopPropagation(e);
            }}
            type="button"
            whileTap={{ scale: 0.9 }}
        >
            {isVip.planId === 1 ? (
                <div>查看</div>
            ) : (
                <>
                    <Image alt="icon" src={star} style={{ width: '14px', height: '14px' }} />
                    {price}
                </>
            )}
        </motion.button>
    );
}

export default UnlockButton;
