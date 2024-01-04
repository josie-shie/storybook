'use client';
import { Tabs, Tab } from 'ui';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { timestampToString } from 'lib';
import type { GetFootballStatsRequest } from 'data-center';
import { getFootballStats, getMemberInfo } from 'data-center';
import Image from 'next/image';
import Link from 'next/link';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';
import { useUserStore } from '@/app/userStore';
import { useHandicapAnalysisFormStore } from '../formStore';
import ErrorDialog from '../analysis/components/dialog/dialog';
import style from './dashboard.module.scss';
import Handicap from './(dashboard)/handicap/handicap';
import { useAnalyticsResultStore } from './analysisResultStore';
import ContestDrawerList from './components/contestDrawerList/contestDrawerList';
import Minutes from './(dashboard)/minutes/minutes';
import Bodan from './(dashboard)/bodan/bodan';
import Range from './(dashboard)/range/range';
import Tutorial from './tutorial';
import systemErrorImage from './img/systemError.png';
import emptyDataImage from './img/emptyData.png';
import AnalyzeData from './img/analyzeData.png';

type HandicapSideType = 'home' | 'away';

function InsufficientBalance() {
    const router = useRouter();
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();

    return (
        <>
            <div className={style.dialogMessage}>
                <p>余额不足，请充值</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/bigData/analysis?status=analysis');
                    }}
                >
                    取消
                </div>

                <div className={style.confirm}>
                    <Link href="/userInfo/subscribe">去充值</Link>
                </div>
            </div>
        </>
    );
}

function EmptyResponseError() {
    const router = useRouter();
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();
    const isVip = useUserStore.use.memberSubscribeStatus().planId;

    return (
        <>
            <div className={style.dialogMessage}>
                <Image alt="" height={100} src={emptyDataImage.src} width={100} />
                {!isVip && <p className={style.refund}>已退款</p>}
                <p>
                    此條件查无资料
                    <br />
                    请重新修改搜寻条件
                </p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/bigData/analysis?status=analysis');
                    }}
                >
                    重新查询
                </div>
            </div>
        </>
    );
}

function SystemError() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();
    const dialogErrorType = useAnalyticsResultStore.use.dialogContentType();

    useEffect(() => {
        switch (dialogErrorType) {
            case 'system':
                setMessage('哎呀，系统暂时出错！ 请稍候重试');
                break;
            case 'parameter':
                setMessage('参数错误，请重新选择');
                break;
        }
    }, [dialogErrorType]);

    return (
        <>
            <div className={style.dialogMessage}>
                <Image alt="" height={100} src={systemErrorImage.src} width={100} />
                <p>{message}</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/bigData/analysis?status=analysis');
                    }}
                >
                    返回
                </div>
                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/bigData/analysis?status=analysis');
                    }}
                >
                    回报错误
                </div>
            </div>
        </>
    );
}

function ResultContent() {
    const router = useRouter();
    const defaultPageIndex = useAnalyticsResultStore.use.defaultPageIndex();
    const setDefaultPageIndex = useAnalyticsResultStore.use.setDefaultPageIndex();
    const showContestDrawer = useAnalyticsResultStore.use.showContestDrawer();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const selectedResult = useAnalyticsResultStore.use.selectedResult();
    const contestList = useAnalyticsResultStore.use.contestList();
    const showedTutorial = localStorage.getItem('showAnalysisTutorial');

    const endDate = useHandicapAnalysisFormStore.use.endDate();
    const startDate = useHandicapAnalysisFormStore.use.startDate();
    const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();
    const loading = useHandicapAnalysisFormStore.use.loading();
    const setLoading = useHandicapAnalysisFormStore.use.setLoading();
    const setAnalysisResultData = useAnalyticsResultStore.use.setAnalysisResultData();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();
    const isAnalysisBySearch = useHandicapAnalysisFormStore.use.isAnalysisBySearch();

    const setDialogContent = useAnalyticsResultStore.use.setDialogContent();
    const dialogErrorType = useAnalyticsResultStore.use.dialogContentType();
    const dialogContent = useAnalyticsResultStore.use.dialogContent();
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();
    const openNoramlDialog = useAnalyticsResultStore.use.openNoramlDialog();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const checkboxState = useHandicapAnalysisFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;
    const setDialogContentType = useAnalyticsResultStore.use.setDialogContentType();
    const setUserInfo = useUserStore.use.setUserInfo();
    const allowSlideScroll = useAnalyticsResultStore.use.tabSlideScroll();

    const tabStyle = {
        gap: 4,
        swiperOpen: true,
        scrolling: true,
        buttonRadius: 30,
        allowSlideScroll
    };

    const tabList = useMemo(
        () => [
            {
                label: '让分大小',
                content: <Handicap />,
                params: 'handicap'
            },
            {
                label: '15分钟进球',
                content: <Minutes />,
                params: 'minutes'
            },
            {
                label: '进球数区间',
                content: <Range />,
                params: 'range'
            },
            {
                label: '波胆',
                content: <Bodan />,
                params: 'bodan'
            }
        ],
        []
    );

    const handicapTeam = {
        home: '主',
        away: '客'
    };

    const backHandler = () => {
        router.push('/bigData/analysis?status=analysis');
    };

    const handlePlanTabClick = (tabName: string) => {
        const index = tabList.findIndex(item => item.params === tabName);
        setDefaultPageIndex(index || 0);
    };

    const getUserInfo = async () => {
        const res = await getMemberInfo();
        if (res.success) {
            setUserInfo(res.data);
        }
    };

    const fetchData = async () => {
        // API完成後需要傳的參數
        const query: GetFootballStatsRequest = {
            mission: 'create',
            startTime: startDate,
            endTime: endDate
        };
        if (handicap) {
            query.handicapSide = teamSelected.length >= 2 ? 'all' : teamSelected[0];
            query.handicapValues = teamHandicapOdds;
        }
        if (overUnder) {
            query.overUnderValues = handicapOddsSelected;
        }

        setLoading(true);
        const res = await getFootballStats(query);

        if (!res.success) {
            setTimeout(() => {
                setOpenNormalDialog(true);
                setLoading(false);
                setAnalysisResultData(undefined);
            }, 500);
            return;
        }

        if (res.data.errorStatus) {
            let dialogType = 'system';
            switch (res.data.errorStatus) {
                case '0':
                    dialogType = 'system'; // 系統錯誤
                    break;
                case '1':
                    dialogType = 'parameter'; // 參數錯誤
                    break;
                case '2':
                    dialogType = 'empty'; //沒有資料
                    break;
                case '3':
                    dialogType = 'balance'; // 餘額不足
                    break;
                default:
                    break;
            }
            setDialogContentType(dialogType);
            setOpenNormalDialog(true);
            setLoading(false);
            setAnalysisResultData(undefined);
            return;
        }

        setAnalysisResultData(res.data);
        setHandicapEchart(res.data);
        setLoading(false);
        void getUserInfo();
    };

    useEffect(() => {
        // 代表不是從搜尋導到這頁，可能是重整頁面
        if (!isAnalysisBySearch) {
            router.push('/bigData/analysis?status=analysis');
            return;
        }

        void fetchData();
    }, []);

    useEffect(() => {
        switch (dialogErrorType) {
            case 'system':
            case 'parameter':
                setDialogContent(<SystemError />);
                break;
            case 'empty':
                setDialogContent(<EmptyResponseError />);
                break;
            case 'balance':
                setDialogContent(<InsufficientBalance />);
                break;
            default:
                setDialogContent(null);
                break;
        }
    }, [dialogErrorType, setDialogContent]);

    return (
        <>
            <div className={style.analysisResult}>
                <div className={style.resultPage}>
                    <HeaderTitleFilter backHandler={backHandler} background title="分析结果" />
                    <div className={style.bigDataGame}>
                        <div className={style.column}>
                            <div className={style.row}>
                                <span className={style.title}>全场让分</span>
                                <span className={style.name}>
                                    让方/
                                    {teamSelected.length >= 2 || !handicap
                                        ? '不挑选'
                                        : handicapTeam[teamSelected[0] as HandicapSideType]}
                                    、盘口/
                                    {handicap
                                        ? teamHandicapOdds || teamHandicapOdds === '0'
                                        : '不挑选'}
                                </span>
                            </div>
                            <div className={style.row}>
                                <span className={style.title}>全场大小</span>
                                <span className={style.name}>
                                    {overUnder ? handicapOddsSelected : '不挑選'}
                                </span>
                            </div>
                            <div className={style.row}>
                                <span className={style.title}>时间区间</span>
                                <span className={style.date}>
                                    {timestampToString(startDate, 'YYYY-MM-DD')} ~{' '}
                                    {timestampToString(endDate, 'YYYY-MM-DD')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.dashboard}>
                        <Tabs
                            allowSlideScroll={tabStyle.allowSlideScroll}
                            buttonRadius={tabStyle.buttonRadius}
                            defaultValue={defaultPageIndex}
                            gap={tabStyle.gap}
                            onTabChange={value => {
                                handlePlanTabClick(value);
                            }}
                            position="flexStart"
                            scrolling={tabStyle.scrolling}
                            styling="button"
                            swiperOpen={tabStyle.swiperOpen}
                        >
                            {tabList.map(item => {
                                return (
                                    <Tab key={item.params} label={item.label} value={item.params}>
                                        {loading ? (
                                            <div className={style.analyze}>
                                                <Image
                                                    alt=""
                                                    height={100}
                                                    src={AnalyzeData}
                                                    width={100}
                                                />
                                                <span>资料分析中 请稍候</span>
                                            </div>
                                        ) : (
                                            item.content
                                        )}
                                    </Tab>
                                );
                            })}
                        </Tabs>
                    </div>
                </div>
                {!showedTutorial && analysisRecord ? (
                    <div className={style.tutorialBlock}>
                        <Tutorial setDefaultPageIndex={setDefaultPageIndex} />
                    </div>
                ) : null}
            </div>
            <ErrorDialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                onClose={() => {
                    setOpenNormalDialog(false);
                }}
                openDialog={openNoramlDialog}
            />

            <ContestDrawerList
                isOpen={showContestDrawer}
                matchList={contestList}
                onClose={() => {
                    setShowContestDrawer(false);
                }}
                onOpen={() => {
                    setShowContestDrawer(true);
                }}
                selectedResult={selectedResult}
            />
        </>
    );
}

function AnalysisResult() {
    return <ResultContent />;
}

export default AnalysisResult;
