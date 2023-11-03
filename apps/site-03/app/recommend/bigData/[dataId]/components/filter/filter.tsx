import { motion } from 'framer-motion';
import { Tab, Tabs } from 'ui';
import style from './filter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function Filter({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.filter}>
                <h2>賽事篩選</h2>
                <div className={style.tab}>
                    <Tabs
                        buttonRadius={tabStyle.buttonRadius}
                        gap={tabStyle.gap}
                        position="center"
                        styling="underline"
                        swiperOpen={tabStyle.swiperOpen}
                    >
                        <Tab label="賽事">
                            <div className={style.list}>
                                <h3>熱門</h3>
                                <ul>
                                    <motion.li
                                        className={`${style.item} ${style.selected}`}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        英超
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        法甲
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        西甲
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        義甲
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        德甲
                                    </motion.li>
                                </ul>
                            </div>
                            <div className={style.tool}>
                                <div className={style.functionButton}>
                                    <motion.button
                                        className={style.button}
                                        type="button"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        全選
                                    </motion.button>
                                    <motion.button
                                        className={style.button}
                                        type="button"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        反選
                                    </motion.button>
                                </div>
                                <div className={style.counter}>
                                    已選 <span className={style.blue}>33</span> 場
                                </div>

                                <motion.div className={style.confirm} whileTap={{ scale: 0.9 }}>
                                    確定
                                </motion.div>
                            </div>
                        </Tab>
                        <Tab label="國家">
                            <div className={style.list}>
                                <h3>熱門</h3>
                                <ul>
                                    <motion.li
                                        className={`${style.item} ${style.selected}`}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        葡萄牙
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        法國
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        西班牙
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        義大利
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        日本
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        德國
                                    </motion.li>
                                    <motion.li className={style.item} whileTap={{ scale: 0.9 }}>
                                        土耳其
                                    </motion.li>
                                </ul>
                            </div>
                            <div className={style.tool}>
                                <div className={style.functionButton}>
                                    <motion.button
                                        className={style.button}
                                        type="button"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        全選
                                    </motion.button>
                                    <motion.button
                                        className={style.button}
                                        type="button"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        反選
                                    </motion.button>
                                </div>
                                <div className={style.counter}>
                                    已選 <span className={style.blue}>33</span> 場
                                </div>

                                <motion.div className={style.confirm} whileTap={{ scale: 0.9 }}>
                                    確定
                                </motion.div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </BottomDrawer>
    );
}

export default Filter;
