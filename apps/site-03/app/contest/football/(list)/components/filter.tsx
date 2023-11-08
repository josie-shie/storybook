import { motion } from 'framer-motion';
import { Tab, Tabs } from 'ui';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useContestListStore } from '../contestListStore';
import style from './filter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function Filter() {
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    const searchParams = useSearchParams();
    const isOpen = searchParams.get('filter');
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value?: string) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    );
    const onClose = () => {
        router.push(`${pathname}?${createQueryString('filter')}`);
    };
    const onOpen = () => {
        router.push(`${pathname}?${createQueryString('filter', 'open')}`);
    };

    const filterInfo = useContestListStore.use.filterInfo();
    const filterSelected = useContestListStore.use.filterSelected();
    const filterPick = useContestListStore.use.setFilterSelected();

    const pick = (name: string, group: string) => {
        filterPick(name, group);
    };

    return (
        <BottomDrawer isOpen={isOpen === 'open'} onClose={onClose} onOpen={onOpen}>
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
                                {Object.entries(filterInfo.league.infoObj)
                                    .sort((a, b) => a[0].localeCompare(b[0]))
                                    .map(([key, value]) => {
                                        return (
                                            <div key={key}>
                                                <h3>{key}</h3>
                                                <ul>
                                                    {value.map(item => {
                                                        return (
                                                            <motion.li
                                                                className={`${style.item} ${
                                                                    filterSelected.league[item]
                                                                        ? style.selected
                                                                        : ''
                                                                }`}
                                                                key={item}
                                                                onClick={() => {
                                                                    pick(item, 'league');
                                                                }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                {item}
                                                            </motion.li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
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
                                    已選 <span className={style.blue}>77</span> 場
                                </div>

                                <motion.div className={style.confirm} whileTap={{ scale: 0.9 }}>
                                    確定
                                </motion.div>
                            </div>
                        </Tab>
                        <Tab label="國家">
                            <div className={style.list}>
                                {Object.entries(filterInfo.country.infoObj)
                                    .sort((a, b) => a[0].localeCompare(b[0]))
                                    .map(([key, value]) => {
                                        return (
                                            <div key={key}>
                                                <h3>{key}</h3>
                                                <ul>
                                                    {value.map(item => {
                                                        return (
                                                            <motion.li
                                                                className={`${style.item} ${
                                                                    filterSelected.country[item]
                                                                        ? style.selected
                                                                        : ''
                                                                }`}
                                                                key={item}
                                                                onClick={() => {
                                                                    pick(item, 'country');
                                                                }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                {item}
                                                            </motion.li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
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
                                    已選 <span className={style.blue}>66</span> 場
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
