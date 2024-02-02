import Image from 'next/image';
import style from './tutorial.module.scss';
import BodanTop from './img/bodanTop.png';
import BodanTable from './img/bodanTable.png';
import bodanDescription1 from './img/bodanDescription1.png';
import BodanDescription2 from './img/bodanDescription2.png';
import HighLightHand from './img/highlightHand.svg';
import { motion } from 'framer-motion';

function Bodan({ isShowed }: { isShowed: Record<number, number> }) {
    return (
        <div className={style.images}>
            <div className={`${style.tutorialTop} ${style.bodanTop}`}>
                <Image alt="" height={32} width={80} src={BodanTop.src} className={style.image} />
                <div className={style.descriptionTop}>
                    <Image
                        alt=""
                        height={58}
                        width={154}
                        src={bodanDescription1.src}
                        className={style.image}
                    />
                    <Image
                        alt=""
                        height={36}
                        width={130}
                        src={BodanTable.src}
                        className={`${style.image} ${isShowed[2] <= 1 && style.animation}`}
                    />
                    <motion.div
                        initial={isShowed[2] <= 1 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <HighLightHand className={style.highLightHand} />
                    </motion.div>
                </div>
                <div className={style.descriptionBottom}>
                    <motion.div
                        initial={isShowed[2] <= 1 ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <Image
                            alt=""
                            height={56}
                            width={122}
                            src={BodanDescription2.src}
                            className={style.image}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Bodan;
