import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './news.module.scss';
import { useNewsStore } from './newsStore';

function NewsMarquee() {
    const marqueeList = useNewsStore.use.marqueeList();
    const currentMarqueeIndex = useNewsStore.use.currentMarqueeIndex();
    const setCurrentMarqueeIndex = useNewsStore.use.setCurrentMarqueeIndex();
    const currentMarqueeIndexRef = useRef(currentMarqueeIndex);

    const variants = {
        enter: { y: '100%', opacity: 1 },
        center: { y: '0%', opacity: 1 },
        exit: { y: '-100%', opacity: 0 }
    };

    useEffect(() => {
        currentMarqueeIndexRef.current = currentMarqueeIndex;
    }, [currentMarqueeIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (currentMarqueeIndexRef.current + 1) % marqueeList.length;
            setCurrentMarqueeIndex(nextIndex);
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [marqueeList, setCurrentMarqueeIndex]);

    return (
        <div className={style.marquee}>
            <AnimatePresence>
                <motion.div
                    animate="center"
                    className={style.marqueeText}
                    exit="exit"
                    initial="enter"
                    key={currentMarqueeIndex}
                    transition={{ duration: 0.5 }}
                    variants={variants}
                >
                    {marqueeList[currentMarqueeIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default NewsMarquee;
