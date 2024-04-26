'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@mui/material';
import TipBar from '../../liveEvent/tipBar';
import style from '../../liveEvent/textLive.module.scss';

function Loader() {
    return (
        <ul className={style.textLive}>
            {Array.from({ length: 10 }).map((_, idx) => (
                <li className={`${style.list}`} key={idx}>
                    <div className={style.iconLine}>
                        <div className={style.icon}>
                            <Skeleton height={20} variant="circular" width={20} />
                        </div>
                    </div>
                    <div className={style.liveContent} style={{ padding: '8px' }}>
                        <Skeleton sx={{ fontSize: '12px' }} variant="text" width="100%" />
                    </div>
                </li>
            ))}
        </ul>
    );
}

function LiveEventLoader() {
    const tabList: { title: string; value: string }[] = [
        { title: '文字直播', value: 'live' },
        { title: '重要事件', value: 'event' }
    ];
    return (
        <div className={style.liveEvent}>
            <div className="minTabBar">
                {tabList.map(tab => (
                    <motion.div animate="live" className="tab" key={tab.value}>
                        {tab.title}
                    </motion.div>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={style.content}
                    exit={{ opacity: 0, y: -4 }}
                    initial={{ opacity: 0, y: 0 }}
                    key="live"
                    transition={{ duration: 0.16 }}
                >
                    <Loader />
                </motion.div>
            </AnimatePresence>
            <TipBar />
        </div>
    );
}

export default LiveEventLoader;
