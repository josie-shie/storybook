'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { CheckMatchesCountRequest, GetFootballLeagueRequest } from 'data-center';
import { checkMatchesCount, getFootballLeague } from 'data-center';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import { useQueryFormStore } from '../queryFormStore';
import { useMatchFilterStore } from '../matchFilterStore';
import Dialog from '../components/dialog/dialog';
import Tutorial from '../components/tutorial/tutorial';
import style from './queryForm.module.scss';
import Tips from './components/tips/tips';
import LeagueDrawer from './components/leagueDrawer/leagueDrawer';
import Form from './components/form/form';
import CoinIcon from './img/coin.svg';
import Lightning from './img/lightning.svg';
import RechargeIcon from './img/rechargeIcon.png';

function RechargeAlert() {
    const router = useRouter();
    const setOpenDialog = useQueryFormStore.use.setOpenNormalDialog();

    const recharge = () => {
        setOpenDialog(false);
        router.push('/userInfo/subscribe');
    };

    return (
        <>
            <div className={style.dialogMessage}>
                <Image alt="" height={100} src={RechargeIcon} width={100} />
                <p>余额不足，请充值</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenDialog(false);
                    }}
                >
                    返回
                </div>
                <div className={style.confirm} onClick={recharge}>
                    前往充值
                </div>
            </div>
        </>
    );
}

function CheckLeague({ leagueIdList }: { leagueIdList: number[] }) {
    const router = useRouter();
    const setOpenNormalDialog = useQueryFormStore.use.setOpenNormalDialog();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setIsAnalysisBySearch = useQueryFormStore.use.setIsAnalysisBySearch();
    const selectedleagueIdList = useMatchFilterStore.use.selectedleagueIdList();

    const redirectToResultPage = () => {
        setOpenNormalDialog(false);
        setIsAnalysisBySearch(true);
        router.push('/aiBigData/analysisResult');
    };

    return (
        <>
            <div className={style.dialogMessage}>
                <p className={style.highLightText}>
                    {leagueIdList.map((id, index) => {
                        return (
                            <span key={id}>
                                {contestInfo[id].leagueChsShort}
                                {index !== leagueIdList.length - 1 && '、'}
                            </span>
                        );
                    })}
                </p>
                <p>目前查无资料</p>
                {leagueIdList.length !== selectedleagueIdList.length ? (
                    <p>是否继续分析其他联赛?</p>
                ) : null}
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                    }}
                >
                    重选
                </div>
                {leagueIdList.length !== selectedleagueIdList.length ? (
                    <div className={style.confirm} onClick={redirectToResultPage}>
                        继续
                    </div>
                ) : null}
            </div>
        </>
    );
}

function NoLoginMood() {
    return (
        <div className={style.noLoginBtn}>
            <div className={style.skewLeft} />
            <div className={style.skewRight} />
            <div className={style.textLeft}>
                <CoinIcon className={style.coin} />
                <div>80 获得分析</div>
            </div>
            <div className={style.textRight}>
                <p className={style.opacityText}>注册会员</p>
                <div>限时免费</div>
                <Lightning />
            </div>
        </div>
    );
}

function SubmitButton({ setZeroMatchList }: { setZeroMatchList: (list: number[]) => void }) {
    const router = useRouter();
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    // 目前沒有要導入vip
    // const isVip = useUserStore.use.memberSubscribeStatus().planId; // 1是VIP
    const setOpenNormalDialog = useQueryFormStore.use.setOpenNormalDialog();
    const setIsOpenPayDrawer = useQueryFormStore.use.setIsOpenPayDrawer();
    const setIsAnalysisBySearch = useQueryFormStore.use.setIsAnalysisBySearch();
    const selectedleagueIdList = useMatchFilterStore.use.selectedleagueIdList();
    const checkboxState = useQueryFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;

    const teamSelected = useQueryFormStore.use.teamSelected();
    const teamHandicapOdds = useQueryFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useQueryFormStore.use.handicapOddsSelected();
    const startTime = useQueryFormStore.use.startDate();
    const endTime = useQueryFormStore.use.endDate();
    const setDialogContentType = useQueryFormStore.use.setDialogContentType();
    const isOpenPayDrawer = useQueryFormStore.use.isOpenPayDrawer();

    const submit = async () => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }

        const zeroMatchList = (await handleCheckMatchesCount()) || [];
        if (zeroMatchList.length) {
            setZeroMatchList(zeroMatchList);
            setDialogContentType('league');
            setOpenNormalDialog(true);
            return;
        }
        setIsOpenPayDrawer(true);
    };

    const normalMemberToResultPage = () => {
        setIsOpenPayDrawer(false);
        setIsAnalysisBySearch(true);
        router.push('/aiBigData/analysisResult');
    };

    const handleCheckMatchesCount = async () => {
        if (!selectedleagueIdList.length) return;
        let handicapSideValue = '';
        if (teamSelected.length === 2) {
            handicapSideValue = 'all';
        } else if (teamSelected.includes('home')) {
            handicapSideValue = 'home';
        } else if (teamSelected.includes('away')) {
            handicapSideValue = 'away';
        }
        const query: CheckMatchesCountRequest = {
            mission: 'create',
            leagues: selectedleagueIdList,
            handicapSide: handicapSideValue,
            handicapValues: handicap ? teamHandicapOdds : '',
            overUnderValues: overUnder ? handicapOddsSelected : '',
            startTime: dayjs(startTime).unix(),
            endTime: dayjs(endTime).unix()
        };

        const res = await checkMatchesCount(query);
        if (!res.success) return;
        const zeroMatchList: number[] = [];

        res.data.forEach(item => {
            if (item.count <= 0) {
                zeroMatchList.push(item.leagueId);
            }
        });
        return zeroMatchList;
    };

    const buttonLayout = () => {
        return !isLogin ? (
            <NoLoginMood />
        ) : (
            <>
                <CoinIcon className={style.coin} />
                <p>0</p>
                <span>80</span>
                <div className={style.text}>获得分析</div>
                <Lightning />
                <div className={style.icon}>会员限时免费</div>
            </>
        );
    };

    return (
        <div className={style.submit}>
            <motion.button
                className={`${style.search} ${isLogin && style.bgBlue}`}
                onClick={submit}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                {buttonLayout()}
            </motion.button>
            <ConfirmPayDrawer
                discount={0}
                hasDiscount
                isOpen={isOpenPayDrawer}
                onClose={() => {
                    setIsOpenPayDrawer(false);
                }}
                onOpen={() => {
                    setIsOpenPayDrawer(true);
                }}
                onPay={normalMemberToResultPage}
                price={80}
                title="获得智能盘路分析？"
            />
        </div>
    );
}

function FormContent({ setZeroMatchList }: { setZeroMatchList: (list: number[]) => void }) {
    const setShowedTutorial = useQueryFormStore.use.setShowedTutorial();
    const setPlayTutorial = useQueryFormStore.use.setPlayTutoral();

    return (
        <div className={style.formContent}>
            <Tips setPlayTutorial={setPlayTutorial} setShowedTutorial={setShowedTutorial} />
            <div className={style.formSelect}>
                <LeagueDrawer />
                <Form />
            </div>
            <SubmitButton setZeroMatchList={setZeroMatchList} />
        </div>
    );
}

function QueryForm() {
    const [zeroMatchList, setZeroMatchList] = useState<number[]>([]);
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setContestList = useMatchFilterStore.use.setContestList();
    const contestList = useMatchFilterStore.use.contestList();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const dialogContent = useQueryFormStore.use.dialogContent();
    const setOpenNormalDialog = useQueryFormStore.use.setOpenNormalDialog();
    const openNoramlDialog = useQueryFormStore.use.openNoramlDialog();
    const setDialogContent = useQueryFormStore.use.setDialogContent();
    const dialogContentType = useQueryFormStore.use.dialogContentType();
    const resetQuery = useQueryFormStore.use.resetQuery();
    const playTutorial = useQueryFormStore.use.playTutorial();
    const setPlayTutorial = useQueryFormStore.use.setPlayTutoral();

    const fetchLeagueData = useCallback(async () => {
        const query: GetFootballLeagueRequest = {
            filter: 'all'
        };

        const res = await getFootballLeague(query);

        if (!res.success) return;

        setContestInfo({ contestList: res.data });
        setContestList({ contestList: res.data });
    }, [setContestInfo, setContestList]);

    useEffect(() => {
        resetQuery();
    }, []);

    useEffect(() => {
        if (!contestList.length) {
            void fetchLeagueData();
        }
    }, [fetchLeagueData]);

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        switch (dialogContentType) {
            case 'league':
                setDialogContent(<CheckLeague leagueIdList={zeroMatchList} />);
                break;
            case 'recharge':
                setDialogContent(<RechargeAlert />);
                break;
            default:
                setDialogContent(null);
                break;
        }
    }, [dialogContentType, setDialogContent, zeroMatchList]);

    return (
        <div className={`${style.queryForm} ${playTutorial ? style.playTutorial : ''}`}>
            <FormContent setZeroMatchList={setZeroMatchList} />
            {playTutorial ? (
                <div className={style.tutorialBlock}>
                    <Tutorial playTutorial={playTutorial} setPlayTutorial={setPlayTutorial} />
                </div>
            ) : null}
            <Dialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                customStyle={{
                    width: '300px'
                }}
                onClose={() => {
                    setOpenNormalDialog(false);
                }}
                openDialog={openNoramlDialog}
            />
        </div>
    );
}

export default QueryForm;
