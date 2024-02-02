import Image from 'next/image';
import handicapTopBar from './img/handicapTopBar.png';
import handicapBottomTable from './img/handicapBottomTable.png';
import handicapTop from './img/handicapTop.png';
import style from './tutorial.module.scss';
import HandIcon from './img/hand.svg';
import HandicapTopDescription from './img/handicapTopDescription.png';
import HandicapBottomDescription from './img/handicapBottomDescription.png';
import HighlightHandIcon from './img/highlightHand.svg';
import { motion } from 'framer-motion';
import W1 from './img/W1.png';
import W2 from './img/W2.png';
import { useEffect, useState } from 'react';

function Handicap({ isShowed }: { isShowed: Record<number, number> }) {
    const [showW2, setShowW2] = useState(false);

    useEffect(() => {
        if (isShowed[0] > 0) {
            setShowW2(true);
        }
    }, []);

    return (
        <div className={style.images}>
            <div className={style.tutorialTop} style={{ gap: '30px' }}>
                <Image
                    alt=""
                    height={32}
                    width={193}
                    src={handicapTop.src}
                    style={{ objectFit: 'contain' }}
                />
                <Image
                    alt=""
                    height={246}
                    width={330}
                    src={handicapTopBar.src}
                    className={`${isShowed[0] <= 0 && style.animation}`}
                />
                {!showW2 && (
                    <motion.div
                        initial={
                            isShowed[0] <= 0 ? { opacity: 1, left: '48px', top: '74px' } : false
                        }
                        animate={{ left: '112px', top: '74px' }} // 假设W2的位置
                        transition={{ duration: 0.8, delay: 2 }}
                        style={{ position: 'absolute' }}
                        onAnimationComplete={() => {
                            setShowW2(true);
                        }}
                    >
                        <Image src={W1.src} alt="W1" width={64} height={222} />
                        <div style={{ position: 'absolute', right: -20, bottom: -52 }}>
                            <HandIcon />
                        </div>
                    </motion.div>
                )}
                {showW2 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: '112px',
                            top: '74px',
                            opacity: 1,
                            width: '64px',
                            height: '222px'
                        }}
                    >
                        <Image src={W2.src} alt="W2" width={64} height={222} />
                        <div
                            style={{ position: 'absolute', right: -20, bottom: -58 }}
                            className={`${
                                isShowed[0] > 0 ? style.staticHand : style.handAnimationHandler
                            }`}
                        >
                            <HandIcon />
                        </div>
                    </div>
                )}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        marginTop: '2px',
                        marginRight: '20px'
                    }}
                >
                    <motion.div
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1 }}
                    >
                        <Image
                            alt=""
                            height={56}
                            width={122}
                            src={HandicapTopDescription.src}
                            style={{ objectFit: 'contain' }}
                        />
                    </motion.div>
                </div>
            </div>
            <div className={style.tutorialBottom}>
                <div style={{ display: 'relative' }}>
                    <motion.div
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4, duration: 1 }}
                    >
                        <Image
                            alt=""
                            height={66}
                            width={114}
                            src={handicapBottomTable.src}
                            style={{ objectFit: 'contain' }}
                            className={`${isShowed[0] <= 0 && style.bottomAnimation}`}
                        />
                    </motion.div>

                    <motion.div
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5, duration: 1 }}
                    >
                        <HighlightHandIcon
                            style={{ position: 'absolute', top: '36px', left: '82px' }}
                        />
                    </motion.div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right'
                    }}
                >
                    <motion.div
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5, duration: 1 }}
                    >
                        <Image
                            alt=""
                            height={56}
                            width={122}
                            src={HandicapBottomDescription.src}
                            style={{ objectFit: 'contain' }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Handicap;
