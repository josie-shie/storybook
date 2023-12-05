'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Star from './img/star.png';
import style from './disSelect.module.scss';
import RecordFilter from './components/recordFilter/recordFilter';
import HandicapDrawer from './components/handicapDrawer/handicapDrawer';
import { GameFilter } from './components/gameFilter/gameFilter';
import { creatDiscSelectStore, useDiscSelectStore } from './discSelectStore';
import { creatMatchFilterStore, useMatchFilterStore } from './matchFilterStore';

type OddsResultType = '赢' | '输' | '大' | '小';
interface HandicapTipType {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeId: number;
    homeChs: string;
    awayId: number;
    awayChs: string;
    teamId: number;
    teamChs: string; // 哪一隊連
    oddsResult: OddsResultType; // 輸、贏、大、小
    longOddsTimes: number; // n場
    isFamous: boolean; // 是否熱門賽事
    leagueLevel: number;
}

const matchList = [
    {
        startTime: 1701400376,
        matchId: 2504100,
        countryCn: '科威特',
        leagueId: 923,
        leagueChsShort: '科威甲',
        homeId: 3669,
        homeChs: '苏拉比卡',
        awayId: 3674,
        awayChs: '阿尔塔达孟',
        teamId: 3674,
        teamChs: '阿尔塔达孟',
        oddsResult: '输', // 輸、贏、大、小
        longOddsTimes: 4, // n場
        isFamous: true, // 是否熱門賽事
        leagueLevel: 0
    },
    {
        startTime: 1701300376,
        matchId: 25041011,
        countryCn: '日本',
        leagueId: 924,
        leagueChsShort: '日本',
        homeId: 3669,
        homeChs: '苏拉比卡',
        awayId: 3674,
        awayChs: '阿尔塔达孟',
        teamId: 3674,
        teamChs: '阿尔塔达孟',
        oddsResult: '赢', // 輸、贏、大、小
        longOddsTimes: 1, // n場
        isFamous: false, // 是否熱門賽事
        leagueLevel: 0
    },
    {
        startTime: 1701300376,
        matchId: 25041012,
        countryCn: '中国',
        leagueId: 925,
        leagueChsShort: '中國',
        homeId: 3669,
        homeChs: '苏拉比卡',
        awayId: 3674,
        awayChs: '阿尔塔达孟',
        teamId: 3674,
        teamChs: '阿尔塔达孟',
        oddsResult: '赢', // 輸、贏、大、小
        longOddsTimes: 1, // n場
        isFamous: false, // 是否熱門賽事
        leagueLevel: 0
    }
] as HandicapTipType[];

interface OptionType {
    label: string;
    value: string;
}

interface SectionSelectProps {
    title: string;
    selectTitle: string;
    options: OptionType[];
    placeholder: string;
    valueSelected: string;
    setSelected: (val: string) => void;
}

function SectionSelect({
    title,
    selectTitle,
    options,
    placeholder,
    valueSelected,
    setSelected
}: SectionSelectProps) {
    return (
        <section className={style.items}>
            <p className={style.title}>{title}</p>
            <div className={style.select}>
                <div className={style.selectTitle}>{selectTitle}</div>
                <GameFilter
                    onChange={setSelected}
                    options={options}
                    placeholder={placeholder}
                    showCloseButton={false}
                    showDragBar
                    title={selectTitle}
                    value={valueSelected}
                />
            </div>
        </section>
    );
}

function DiscSelect() {
    creatDiscSelectStore({
        handicapTips: []
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const [showFilter, setShowFilter] = useState(false);
    const [showHandicapDrawer, setShowHandicapDrawer] = useState(false);

    const [handicapOddsSelected, setHandicapOddsSelected] = useState('');
    const [overUnderSelected, setOverUnderSelected] = useState('');
    const setHandicapHints = useDiscSelectStore.use.setHandicapTips();

    const hintsSelected = useDiscSelectStore.use.hintsSelected();
    const setHintsSelected = useDiscSelectStore.use.setHintsSelected();
    const teamList = useDiscSelectStore.use.teamList();
    const handicapNumberList = useDiscSelectStore.use.handicapNumberList();
    const overUnderNumberList = useDiscSelectStore.use.overUnderNumberList();
    const dateList = useDiscSelectStore.use.dateList();
    const playList = useDiscSelectStore.use.playList();

    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();

    setHandicapHints(matchList);

    const goDetail = () => {
        router.push(`/recommend/bigData/resultDetail/handicap`);
    };

    const openHintsDrawer = () => {
        setContestList({
            contestList: matchList
        });
        setContestInfo({
            contestList: matchList
        });
        setShowHandicapDrawer(true);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    return (
        <>
            <div className={style.discSelect}>
                {search === 'analysis' ? (
                    <>
                        <div
                            className={style.record}
                            onClick={() => {
                                setShowFilter(true);
                            }}
                        >
                            分析纪录
                        </div>
                        <section className={style.items}>
                            <p className={style.title}>全场让球</p>
                            <div className={style.select}>
                                <div className={style.selectTitle}>让方</div>
                                <GameFilter
                                    options={teamList}
                                    placeholder="选择主队"
                                    showCloseButton={false}
                                    showDragBar
                                    title="选择让方"
                                    value={null}
                                />
                                <GameFilter
                                    options={handicapNumberList}
                                    placeholder="选择让球"
                                    showCloseButton={false}
                                    showDragBar
                                    title="选择让方"
                                    value={null}
                                />
                            </div>
                        </section>
                        <SectionSelect
                            options={overUnderNumberList}
                            placeholder="不挑选"
                            selectTitle="盘口"
                            setSelected={setHandicapOddsSelected}
                            title="全场大小"
                            valueSelected={handicapOddsSelected}
                        />
                        <SectionSelect
                            options={dateList}
                            placeholder="选择时间"
                            selectTitle="区间"
                            setSelected={setOverUnderSelected}
                            title="时间范围"
                            valueSelected={overUnderSelected}
                        />
                    </>
                ) : (
                    <SectionSelect
                        options={playList}
                        placeholder="选择全场大小球"
                        selectTitle="选择全场大小球"
                        setSelected={setHintsSelected}
                        title="玩法筛选"
                        valueSelected={hintsSelected}
                    />
                )}
                <div className={style.tips}>
                    数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
                </div>
                {search === 'analysis' ? (
                    <button
                        className={style.search}
                        onClick={() => {
                            goDetail();
                        }}
                        type="button"
                    >
                        <Image alt="" height={14} src={Star} width={14} />
                        获得趋势分析
                    </button>
                ) : (
                    <button className={style.search} onClick={openHintsDrawer} type="button">
                        <Image alt="" height={14} src={Star} width={14} />
                        获得盘路提示
                    </button>
                )}
            </div>

            <RecordFilter
                isOpen={showFilter}
                onClose={() => {
                    setShowFilter(false);
                }}
                onOpen={() => {
                    setShowFilter(true);
                }}
            />
            <HandicapDrawer
                isOpen={showHandicapDrawer}
                onClose={() => {
                    setShowHandicapDrawer(false);
                }}
                onOpen={() => {
                    setShowHandicapDrawer(true);
                }}
            />
        </>
    );
}

export default DiscSelect;
