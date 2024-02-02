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
            <div className={`${style.tutorialTop} ${style.miutesTop}`}>
                <Image
                    alt=""
                    height={32}
                    width={96}
                    src={MinutesTopImage.src}
                    className={style.image}
                />
                <div className={style.description}>
                    <Image
                        alt=""
                        height={100}
                        width={130}
                        src={MinutesTopTable.src}
                        className={`${style.image} ${isShowed[1] <= 1 && style.animation}`}
                    />
                    <Image
                        alt=""
                        height={56}
                        width={120}
                        src={MinutesTopDescription1.src}
                        className={style.image}
                    />
                    <motion.div
                        initial={isShowed[1] <= 1 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <HighLightHand className={style.highLightHand} />
                    </motion.div>
                </div>
                <div className={style.minutesBottom}>
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
                            className={style.image}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Minutes;
