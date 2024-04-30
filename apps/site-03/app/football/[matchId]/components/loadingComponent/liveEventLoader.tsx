'use client';
import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';
import TipBar from '../../(dashboard)/liveEvent/tipBar';
import style from '../../(dashboard)/liveEvent/textLive.module.scss';

function Loader() {
    return (
        <ul className={style.textLive}>
            {Array.from({ length: 11 }).map((_, idx) => (
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
        <div className={style.liveEventLoader}>
            <div className="minTabBar">
                {tabList.map(tab => (
                    <motion.div animate="文字直播" className="tab" key={tab.value}>
                        {tab.title}
                    </motion.div>
                ))}
            </div>
            <Loader />
            <TipBar />
        </div>
    );
}

export default LiveEventLoader;
