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

function Handicap({ isShowed }: { isShowed: Record<number, number> }) {
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
                <HandIcon style={{ position: 'absolute', top: '246px', left: '70px' }} />
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
                        transition={{ delay: 1, duration: 1 }}
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
                        transition={{ delay: 2, duration: 1 }}
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
                        transition={{ delay: 3, duration: 1 }}
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
                        transition={{ delay: 3, duration: 1 }}
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
