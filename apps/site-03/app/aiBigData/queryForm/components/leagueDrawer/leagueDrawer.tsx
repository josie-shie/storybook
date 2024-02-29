import { useEffect, useRef, useState } from 'react';
import { Tab, Tabs } from 'ui';
import { motion } from 'framer-motion';
import { useMatchFilterStore } from '@/app/aiBigData/matchFilterStore';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useNotificationStore } from '@/store/notificationStore';
import FootballIcon from './img/football.svg';
import style from './leagueDrawer.module.scss';

type GroupType = 'league' | 'country';

interface PropsType {
    group: GroupType;
    onClose: () => void;
}

function RenderFilterList({
    data,
    group
}: {
    data?: Record<string, string[]>;
    group: PropsType['group'];
}) {
    const filterPick = useMatchFilterStore.use.setFilterSelected();
    const filterSelected = useMatchFilterStore.use.filterSelected();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const filterCounter = useMatchFilterStore.use.filterCounter();

    const latestFilterCounter = useRef(filterCounter);
    useEffect(() => {
        latestFilterCounter.current = filterCounter;
    }, [filterCounter]);

    const handleUpdateFilter = (item: string, currentGroup: GroupType) => {
        if (latestFilterCounter.current[currentGroup] >= 5 && !filterSelected[currentGroup][item]) {
            setIsNotificationVisible('最多可选择5联赛', 'error');
        } else {
            filterPick(item, currentGroup);
        }
    };

    const renderListItem = (item: string) => (
        <motion.li
            className={`${style.item} ${filterSelected[group][item] ? style.selected : ''}`}
            key={item}
            onClick={() => {
                handleUpdateFilter(item, group);
            }}
            whileTap={{ scale: 0.9 }}
        >
            {item}
        </motion.li>
    );

    const hotContent = data?.hot ? (
        <div key="hot">
            <h3>热门</h3>
            <ul>{data.hot.map(item => renderListItem(item))}</ul>
        </div>
    ) : null;

    const otherContent = Object.entries(data || {})
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
            if (key === 'hot' || key === 'firstClass') return null;
            return (
                <div key={key}>
                    <h3>{key}</h3>
                    <ul>{value.map(item => renderListItem(item))}</ul>
                </div>
            );
        });
    return (
        <>
            {hotContent}
            {otherContent}
        </>
    );
}

function FilterSection({ group, onClose }: PropsType) {
    const filterInfo = useMatchFilterStore.use.filterInfo();
    const filterCounter = useMatchFilterStore.use.filterCounter();
    const filterSubmit = useMatchFilterStore.use.setFilterList();
    const resetFilter = useMatchFilterStore.use.resetFilter();

    const submit = () => {
        filterSubmit(group);
        onClose();
    };

    const filterListExtraMap = (
        <RenderFilterList
            data={
                filterInfo[group].extraMap || {
                    hot: [],
                    firstClass: []
                }
            }
            group={group}
        />
    );
    const filterListInfoObj = <RenderFilterList data={filterInfo[group].infoObj} group={group} />;

    const filterList = (
        <>
            {filterListExtraMap}
            {filterListInfoObj}
        </>
    );

    return (
        <>
            <div className={style.list}>{filterList}</div>
            <div className={style.line} />
            <div className={style.tool}>
                <div className={style.functionButton}>
                    <motion.button
                        className={style.button}
                        onClick={() => {
                            resetFilter(group);
                        }}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        重选
                    </motion.button>
                </div>
                <motion.div className={style.confirm} onClick={submit} whileTap={{ scale: 0.9 }}>
                    已选择{filterCounter[group]}联赛
                </motion.div>
            </div>
        </>
    );
}

function MatchFilterDrawer({
    isOpen,
    onClose,
    onOpen
}: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}) {
    const [onMounted, setOnMounted] = useState(false);

    useEffect(() => {
        setOnMounted(true);
    }, []);

    const tabStyle = {
        gap: 8,
        swiperOpen: false,
        buttonRadius: 30
    };

    const tabActive = useRef(0);

    const saveTabStatus = (tab: string) => {
        tabActive.current = tab === 'contest' ? 0 : 1;
    };

    return (
        <>
            {onMounted ? (
                <BottomDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    topLineDisplay="none"
                >
                    <div className={style.matchFilter}>
                        <div className={style.title}>
                            <h2>赛事筛选</h2>
                            <p className={style.remark}>最多可选择5联赛</p>
                        </div>
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
                                    <FilterSection group="league" onClose={onClose} />
                                </Tab>
                                <Tab label="国家" value="country">
                                    <FilterSection group="country" onClose={onClose} />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </BottomDrawer>
            ) : null}
        </>
    );
}

function LeagueDrawer() {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const selectedleagueIdList = useMatchFilterStore.use.selectedleagueIdList();
    const resetQuery = useMatchFilterStore.use.resetQuery();

    useEffect(() => {
        resetQuery();
    }, []);

    return (
        <div className={style.leagueDrawer}>
            <div
                className={style.selectInput}
                onClick={() => {
                    setIsOpenDrawer(true);
                }}
            >
                <div className={style.selectLabel}>
                    <FootballIcon />
                    <p>
                        {selectedleagueIdList.length
                            ? selectedleagueIdList.map((id, index) => {
                                  return (
                                      <span key={id}>
                                          {contestInfo[id].leagueChsShort}
                                          {index !== selectedleagueIdList.length - 1 && '、'}
                                      </span>
                                  );
                              })
                            : '全部联赛'}
                    </p>
                </div>

                {selectedleagueIdList.length ? <p className={style.reselect}>重选</p> : null}
            </div>
            <MatchFilterDrawer
                isOpen={isOpenDrawer}
                onClose={() => {
                    setIsOpenDrawer(false);
                }}
                onOpen={() => {
                    setIsOpenDrawer(true);
                }}
            />
        </div>
    );
}

export default LeagueDrawer;
