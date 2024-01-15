'use client';
import { motion } from 'framer-motion';
import { Tab, Tabs } from 'ui';
import { useEffect, useRef, useState } from 'react';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useNotificationStore } from '@/store/notificationStore';
import { useArticleStore } from '../../articleStore';
import style from './filter.module.scss';

function FilterSection({ group }: { group: 'league' | 'country' }) {
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const filterInfo = useArticleStore.use.filterInfo();
    const filterSelected = useArticleStore.use.filterSelected();
    const filterPick = useArticleStore.use.setFilterSelected();
    const filterSubmit = useArticleStore.use.setFilterList();
    const revertFilter = useArticleStore.use.revertFilterList();
    const selectAll = useArticleStore.use.selectAll();
    const setFilterResultIsOpen = useArticleStore.use.setFilterResultIsOpen();
    const setIsOpen = useArticleStore.use.setFilterIsOpen();

    const filterCounter = () => {
        return Object.values(filterSelected[group]).filter(value => value).length;
    };

    const submit = () => {
        if (filterCounter() === 0) {
            setIsVisible('至少选择一笔', 'error');
            return;
        }

        filterSubmit(group);
        setIsOpen({ status: false });
        setFilterResultIsOpen({ status: true });
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
                        全选
                    </motion.button>
                    <motion.button
                        className={style.button}
                        onClick={() => {
                            revertFilter(group);
                        }}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        反选
                    </motion.button>
                </div>
                <div className={style.counter}>
                    已选 <span className={style.blue}>{filterCounter()}</span> 场
                </div>

                <motion.div className={style.confirm} onClick={submit} whileTap={{ scale: 0.9 }}>
                    确定
                </motion.div>
            </div>
        </>
    );
}

function Filter() {
    const [onMounted, setOnMounted] = useState(false);
    const filterIsOpen = useArticleStore.use.filterIsOpen();
    const setFilterIsOpen = useArticleStore.use.setFilterIsOpen();

    useEffect(() => {
        setOnMounted(true);
    }, []);

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const tabActive = useRef(0);

    const onClose = () => {
        setFilterIsOpen({ status: false });
    };
    const onOpen = () => {
        setFilterIsOpen({ status: true });
    };

    const saveTabStatus = (tab: string) => {
        tabActive.current = tab === 'contest' ? 0 : 1;
    };

    return (
        <>
            {onMounted ? (
                <BottomDrawer isOpen={filterIsOpen} onClose={onClose} onOpen={onOpen}>
                    <div className={style.filter}>
                        <h2>赛事筛选</h2>
                        <div className={style.tab}>
                            <Tabs
                                buttonRadius={tabStyle.buttonRadius}
                                defaultValue={tabActive.current}
                                gap={tabStyle.gap}
                                onTabChange={saveTabStatus}
                                position="center"
                                styling="underline"
                                swiperOpen={tabStyle.swiperOpen}
                            >
                                <Tab label="赛事" value="contest">
                                    <FilterSection group="league" />
                                </Tab>
                                <Tab label="国家" value="country">
                                    <FilterSection group="country" />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </BottomDrawer>
            ) : null}
        </>
    );
}

export default Filter;
