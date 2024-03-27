'use client';
import Link from 'next/link';
import { Tabs, Tab } from 'ui';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { GetFootballStatsRequest } from 'data-center';
import { getFootballStats, getMemberInfo } from 'data-center';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/userStore';
import { useQueryFormStore } from '../queryFormStore';
import { useMatchFilterStore } from '../matchFilterStore';
import ErrorDialog from '../components/dialog/dialog';
import Tutorial from '../components/tutorial/tutorial';
import style from './analysisResult.module.scss';
import Handicap from './(dashboard)/handicap/handicap';
import { useAnalyticsResultStore } from './analysisResultStore';
import ContestDrawerList from './components/contestDrawerList/contestDrawerList';
import SystemErrorImage from './img/systemError.svg';
import EmptyDataImage from './img/emptyData.svg';
import AnalyzeDataImage from './img/analyzeData.svg';
import Minutes from './(dashboard)/minutes/minutes';
import Bodan from './(dashboard)/bodan/bodan';

function LeaveResultPage() {
    const router = useRouter();
    const setDefaultPageIndex = useQueryFormStore.use.setDefaultPageIndex();
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();

    return (
        <>
            <div className={style.dialogMessage}>
                <p>返回主页当前数据会清空</p>
                <p>确定返回？</p>
            </div>
            <div className={style.footer}>
                <div className={style.close}>
                    <div
                        onClick={() => {
                            setOpenNormalDialog(false);
                            setDefaultPageIndex(0);
                            router.push('/aiBigData/queryForm');
                        }}
                    >
                        返回AI数据分析主页
                    </div>
                </div>

                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenNormalDialog(false);
                    }}
                >
                    取消
                </div>
            </div>
        </>
    );
}

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
                        router.push('/aiBigData/queryForm');
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
    // 目前沒有導入VIP
    // const isVip = useUserStore.use.memberSubscribeStatus().planId;

    return (
        <>
            <div className={style.dialogMessage}>
                <EmptyDataImage />
                {/* {!isVip && <p className={style.refund}>已退款</p>} */}
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
                        router.push('/aiBigData/queryForm');
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
                <SystemErrorImage />
                <p>{message}</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/aiBigData/queryForm');
                    }}
                >
                    返回
                </div>
                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/aiBigData/queryForm');
                    }}
                >
                    回报错误
                </div>
            </div>
        </>
    );
}

function AnalysisResult() {
    const router = useRouter();
    const defaultPageIndex = useQueryFormStore.use.defaultPageIndex();
    const setDefaultPageIndex = useQueryFormStore.use.setDefaultPageIndex();
    const showContestDrawer = useAnalyticsResultStore.use.showContestDrawer();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const selectedResult = useAnalyticsResultStore.use.selectedResult();
    const contestList = useAnalyticsResultStore.use.contestList();
    const showedTutorial = useQueryFormStore.use.showedTutorial();
    const setShowedTutorial = useQueryFormStore.use.setShowedTutorial();
    const setPlayTutorial = useQueryFormStore.use.setPlayTutoral();
    const playTutorial = useQueryFormStore.use.playTutorial();

    const endDate = useQueryFormStore.use.endDate();
    const startDate = useQueryFormStore.use.startDate();
    const teamSelected = useQueryFormStore.use.teamSelected();
    const teamHandicapOdds = useQueryFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useQueryFormStore.use.handicapOddsSelected();
    const loading = useQueryFormStore.use.loading();
    const setLoading = useQueryFormStore.use.setLoading();
    const loadingHeight = useQueryFormStore.use.loadingHeight();
    const setAnalysisResultData = useAnalyticsResultStore.use.setAnalysisResultData();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();
    const isAnalysisBySearch = useQueryFormStore.use.isAnalysisBySearch();
    const leagueIds = useMatchFilterStore.use.selectedleagueIdList();

    const setDialogContent = useAnalyticsResultStore.use.setDialogContent();
    const dialogErrorType = useAnalyticsResultStore.use.dialogContentType();
    const dialogContent = useAnalyticsResultStore.use.dialogContent();
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();
    const openNoramlDialog = useAnalyticsResultStore.use.openNoramlDialog();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const checkboxState = useQueryFormStore.use.checkboxState();
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
                label: '让分/大小趨勢',
                content: <Handicap />,
                params: 'handicap'
            },
            {
                label: '15分钟进球',
                content: <Minutes />,
                params: 'minutes'
            },
            {
                label: '波胆',
                content: <Bodan />,
                params: 'bodan'
            }
        ],
        []
    );

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
        let handicapSideValue = '';
        if (teamSelected.length === 2) {
            handicapSideValue = 'all';
        } else if (teamSelected.includes('home')) {
            handicapSideValue = 'home';
        } else if (teamSelected.includes('away')) {
            handicapSideValue = 'away';
        }
        const query: GetFootballStatsRequest = {
            mission: 'create',
            leagues: leagueIds,
            startTime: dayjs(startDate).unix(),
            endTime: dayjs(endDate).unix(),
            handicapSide: handicapSideValue
        };
        if (handicap) {
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
        if (!isAnalysisBySearch && !showContestDrawer) {
            router.push('/aiBigData/queryForm');
        }

        if (!isAnalysisBySearch) return;
        const isShowTutorial = Boolean(localStorage.getItem('showAnalysisTutorial'));

        if (!isShowTutorial) {
            setPlayTutorial(true);
            setShowedTutorial(Boolean(localStorage.getItem('showAnalysisTutorial')));
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
            case 'leaveResult':
                setDialogContent(<LeaveResultPage />);
                break;
            default:
                setDialogContent(null);
                break;
        }
    }, [dialogErrorType, setDialogContent]);

    return (
        <>
            <div className={`${style.dashboard} ${playTutorial ? style.playTutorial : ''}`}>
                <Tabs
                    allowSlideScroll={tabStyle.allowSlideScroll}
                    autoHeight
                    buttonRadius={tabStyle.buttonRadius}
                    defaultValue={defaultPageIndex}
                    gap={tabStyle.gap}
                    loadingHeight={loadingHeight}
                    onTabChange={value => {
                        handlePlanTabClick(value);
                    }}
                    position="flexStart"
                    scrolling={tabStyle.scrolling}
                    styling="underline"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.params} label={item.label} value={item.params}>
                                {loading ? (
                                    <div className={style.analyze}>
                                        <AnalyzeDataImage />
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
            {!showedTutorial && analysisRecord ? (
                <div className={style.tutorialBlock}>
                    <Tutorial
                        playTutorial={playTutorial}
                        setDefaultPageIndex={setDefaultPageIndex}
                        setPlayTutorial={setPlayTutorial}
                    />
                </div>
            ) : null}
            <ErrorDialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                customStyle={{
                    width: dialogErrorType === 'leaveResult' ? '300px' : '188px'
                }}
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

export default AnalysisResult;
