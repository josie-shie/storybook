import Image from 'next/image';
import style from './tutorial.module.scss';
import MinutesTopImage from './img/minutesTop.png';
import MinutesTopTable from './img/minutesTopTable.png';
import MinutesTopDescription1 from './img/minutesTopDescription1.png';
import MinutesTopDescription2 from './img/minutesTopDescription2.png';
import HighLightHand from './img/highlightHand.svg';
import { motion } from 'framer-motion';

function Minutes({ isShowed }: { isShowed: Record<number, number> }) {
    return (
        <div className={style.images}>
            <div className={style.tutorialTop}>
                <Image
                    alt=""
                    height={32}
                    width={96}
                    src={MinutesTopImage.src}
                    style={{ objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', marginTop: '42px' }}>
                    <Image
                        alt=""
                        height={100}
                        width={130}
                        src={MinutesTopTable.src}
                        style={{ objectFit: 'contain' }}
                        className={`${isShowed[1] <= 1 && style.animation}`}
                    />
                    <Image
                        alt=""
                        height={56}
                        width={120}
                        src={MinutesTopDescription1.src}
                        style={{ objectFit: 'contain' }}
                    />
                    <motion.div
                        initial={isShowed[1] <= 1 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <HighLightHand
                            style={{ position: 'absolute', left: '80px', top: '150px' }}
                        />
                    </motion.div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        marginTop: '16px',
                        marginRight: '36px'
                    }}
                >
                    <motion.div
                        initial={isShowed[1] <= 1 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <Image
                            alt=""
                            height={56}
                            width={120}
                            src={MinutesTopDescription2.src}
                            style={{ objectFit: 'contain' }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Minutes;
