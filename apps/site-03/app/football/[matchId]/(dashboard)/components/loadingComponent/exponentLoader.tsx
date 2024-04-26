import { motion, AnimatePresence } from 'framer-motion';
import style from '../../exponent/exponent.module.scss';

function OddBar() {
    return (
        <div className="td">
            <div className="odd">-</div>
            <div className="odd">-</div>
            <div className="odd">-</div>
        </div>
    );
}

function Loader() {
    return (
        <div className={style.handicap}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">公司</div>
                        <div className="th">初始</div>
                        <div className="th">即時</div>
                    </div>
                </div>
                <div className="tableBody">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div className="tr" key={idx}>
                            <div className="td">-</div>
                            <OddBar />
                            <OddBar />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ExponentLoader() {
    const tabList = [
        { title: '让分', value: 'handicap' },
        { title: '胜平负', value: 'winLose' },
        { title: '进球数', value: 'overUnder' },
        { title: '角球', value: 'corners' }
    ];
    return (
        <div className={style.exponent}>
            <div className="minTabBar">
                {tabList.map(tab => (
                    <motion.div className="tab" key={tab.value}>
                        {tab.title}
                    </motion.div>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={style.content}
                    exit={{ opacity: 0, y: -4 }}
                    initial={{ opacity: 0, y: 4 }}
                    key="handicap"
                    transition={{ duration: 0.16 }}
                >
                    <Loader />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default ExponentLoader;
