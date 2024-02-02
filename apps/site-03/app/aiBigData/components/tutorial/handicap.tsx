import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import handicapTopBar from './img/handicapTopBar.png';
import handicapBottomTable from './img/handicapBottomTable.png';
import handicapTop from './img/handicapTop.png';
import style from './tutorial.module.scss';
import HandIcon from './img/hand.svg';
import HandicapTopDescription from './img/handicapTopDescription.png';
import HandicapBottomDescription from './img/handicapBottomDescription.png';
import HighlightHandIcon from './img/highlightHand.svg';
import W1 from './img/W1.png';
import W2 from './img/W2.png';

function Handicap({ isShowed }: { isShowed: Record<number, number> }) {
    const [showW2, setShowW2] = useState(false);

    useEffect(() => {
        if (isShowed[0] > 0) {
            setShowW2(true);
        }
    }, []);

    return (
        <div className={style.images}>
            <div className={`${style.tutorialTop} ${style.handicapTop}`}>
                <Image
                    alt=""
                    className={style.image}
                    width={193}
                    height={32}
                    src={handicapTop.src}
                />
                <Image
                    alt=""
                    className={`${isShowed[0] <= 0 && style.animation} ${style.firstImg}`}
                    height={246}
                    src={handicapTopBar.src}
                    width={330}
                />
                {!showW2 && (
                    <motion.div
                        animate={{ left: '112px', top: '74px' }} // 假设W2的位置
                        initial={
                            isShowed[0] <= 0 ? { opacity: '1', left: '48px', top: '74px' } : false
                        }
                        onAnimationComplete={() => {
                            setShowW2(true);
                        }}
                        style={{ position: 'absolute' }}
                        transition={{ duration: 0.8, delay: 2 }}
                    >
                        <Image alt="W1" height={222} src={W1.src} width={64} />
                        <div className={style.w1Hand}>
                            <HandIcon />
                        </div>
                    </motion.div>
                )}
                {showW2 ? (
                    <div className={style.w2Inital}>
                        <Image alt="W2" height={222} src={W2.src} width={64} />
                        <div
                            className={`${style.w2Hand} ${
                                isShowed[0] > 0 ? style.staticHand : style.handAnimationHandler
                            }`}
                            style={{ position: 'absolute', right: -20, bottom: -58 }}
                        >
                            <HandIcon />
                        </div>
                    </div>
                ) : null}

                <div className={style.description}>
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        transition={{ delay: 2.5, duration: 1 }}
                    >
                        <Image
                            alt=""
                            className={style.image}
                            width={122}
                            height={56}
                            src={HandicapTopDescription.src}
                        />
                    </motion.div>
                </div>
            </div>
            <div className={`${style.tutorialBottom} ${style.handicapBottom}`}>
                <div className={style.table}>
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        transition={{ delay: 4, duration: 1 }}
                    >
                        <Image
                            width={114}
                            alt=""
                            className={`${style.image} ${
                                isShowed[0] <= 0 && style.bottomAnimation
                            }`}
                            height={66}
                            src={handicapBottomTable.src}
                        />
                    </motion.div>

                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        transition={{ delay: 5, duration: 1 }}
                    >
                        <HighlightHandIcon className={style.hightlightHand} />
                    </motion.div>
                </div>

                <div className={style.description}>
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={isShowed[0] <= 0 ? { opacity: 0 } : false}
                        transition={{ delay: 5, duration: 1 }}
                    >
                        <Image
                            width={122}
                            alt=""
                            className={style.iamge}
                            height={56}
                            src={HandicapBottomDescription.src}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Handicap;
