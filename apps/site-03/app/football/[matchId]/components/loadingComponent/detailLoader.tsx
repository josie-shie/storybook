'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@mui/material';
import style from '../../(dashboard)/data/data.module.scss';

function Loader() {
    const row = ['总', '主', '客', '近'];
    return (
        <div className={style.loading}>
            <div className="topBar">
                <h6 className="title">积分排名</h6>
            </div>
            <div>
                <div className={style.team}>
                    <Skeleton height={24} variant="circular" width={24} />
                    <Skeleton height={20} variant="rounded" width={98} />
                </div>
                <div className="dataTable">
                    <div className="tableHead">
                        <div className="tr">
                            <div className="th"> - </div>
                            <div className="th">赛</div>
                            <div className="th">胜/平/负</div>
                            <div className="th">进/失</div>
                            <div className="th">积分</div>
                            <div className="th">排名</div>
                        </div>
                    </div>
                    <div className="tableBody greyRow">
                        {row.map(title => (
                            <div className="tr" key={title}>
                                <div className="td">{title}</div>
                                <div className="td"> - </div>
                                <div className="td">
                                    <p>- / - / -</p>
                                </div>
                                <div className="td">
                                    <p>- / -</p>
                                </div>
                                <div className="td">-</div>
                                <div className={`td ${style.highlight}`}>-</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function detailLoader() {
    const tabList = [
        { title: '详情', value: 'details' },
        { title: '对比', value: 'compared' }
    ];
    return (
        <div className={style.tabContent}>
            <div className={style.data}>
                <div className="minTabBar">
                    {tabList.map(tab => (
                        <motion.div animate="详情" className="tab" key={tab.value}>
                            {tab.title}
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div className={style.content}>
                        <Loader />
                        <Loader />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default detailLoader;
