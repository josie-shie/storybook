import { motion } from 'framer-motion';
import { Tab, Tabs } from 'ui';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useContestListStore } from '../contestListStore';
import style from './filter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function FilterSection({ group, onClose }: { group: 'league' | 'country'; onClose: () => void }) {
    const filterInfo = useContestListStore.use.filterInfo();
    const filterSelected = useContestListStore.use.filterSelected();
    const filterCounter = useContestListStore.use.filterCounter();
    const filterPick = useContestListStore.use.setFilterSelected();
    const filterSubmit = useContestListStore.use.setFilterList();
    const revertFilter = useContestListStore.use.revertFilterList();
    const selectAll = useContestListStore.use.selectAll();

    const submit = () => {
        filterSubmit(group);
        onClose();
    };

    const filterList = Object.entries(filterInfo[group].infoObj)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
            return (
                <div key={key}>
                    <h3>{key}</h3>
                    <ul>
                        {value.map(item => (
                            <motion.li
                                className={`${style.item} ${
                                    filterSelected[group][item] ? style.selected : ''
                                }`}
                                key={item}
                                onClick={() => {
                                    filterPick(item, group);
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            );
        });

    return (
        <>
            <div className={style.list}>{filterList}</div>
            <div className={style.tool}>
                <div className={style.functionButton}>
                    <motion.button
                        className={style.button}
                        onClick={() => {
                            selectAll(group);
                        }}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        全選
                    </motion.button>
                    <motion.button
                        className={style.button}
                        onClick={() => {
                            revertFilter(group);
                        }}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        反選
                    </motion.button>
                </div>
                <div className={style.counter}>
                    已選 <span className={style.blue}>{filterCounter[group]}</span> 場
                </div>

                <motion.div className={style.confirm} onClick={submit} whileTap={{ scale: 0.9 }}>
                    確定
                </motion.div>
            </div>
        </>
    );
}

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
                            <FilterSection group="league" onClose={onClose} />
                        </Tab>
                        <Tab label="國家">
                            <FilterSection group="country" onClose={onClose} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </BottomDrawer>
    );
}

export default Filter;
