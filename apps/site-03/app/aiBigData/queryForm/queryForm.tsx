'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { CheckMatchesCountRequest, GetFootballLeagueRequest } from 'data-center';
import { checkMatchesCount, getFootballLeague } from 'data-center';
import { useCallback, useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useQueryFormStore } from '../queryFormStore';
import { useMatchFilterStore } from '../matchFilterStore';
import Dialog from '../components/dialog/dialog';
import style from './queryForm.module.scss';
import Tips from './components/tips/tips';
import LeagueDrawer from './components/leagueDrawer/leagueDrawer';
import Form from './components/form/form';
import CoinIcon from './img/coin.svg';
import dayjs from 'dayjs';

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
                                {index !== leagueIdList.length - 1 && ','}
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

function SubmitButton({ setZeroMatchList }: { setZeroMatchList: (list: number[]) => void }) {
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();
    const isVip = useUserStore.use.memberSubscribeStatus().planId; // 1是VIP
    const setOpenNormalDialog = useQueryFormStore.use.setOpenNormalDialog();
    const setIsOpenPayDrawer = useQueryFormStore.use.setIsOpenPayDrawer();
    const setIsAnalysisBySearch = useQueryFormStore.use.setIsAnalysisBySearch();
    const selectedleagueIdList = useMatchFilterStore.use.selectedleagueIdList();
    const startTime = useQueryFormStore.use.startDate();
    const endTime = useQueryFormStore.use.endDate();
    const setDialogContentType = useQueryFormStore.use.setDialogContentType();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();

    const submit = async () => {
        if (!selectedleagueIdList.length) {
            setIsNotificationVisible('请选择联赛', 'error');
            return;
        }

        const zeroMatchList = (await handleCheckMatchesCount()) || [];
        if (zeroMatchList.length) {
            setZeroMatchList(zeroMatchList);
            setDialogContentType('league');
            setOpenNormalDialog(true);
            return;
        }

        if (!isVip) {
            if (userInfo.balance < 80) {
                setOpenNormalDialog(true);
                return;
            }

            setIsOpenPayDrawer(true);
            return;
        }

        setIsAnalysisBySearch(true);
        router.push('/aiBigData/analysisResult');
    };

    const handleCheckMatchesCount = async () => {
        const query: CheckMatchesCountRequest = {
            leagues: selectedleagueIdList,
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

    return (
        <div className={style.submit}>
            <motion.button
                className={style.search}
                onClick={submit}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                {!isVip ? (
                    <>
                        <CoinIcon />
                        <span>80</span>
                    </>
                ) : null}
                <span>获得趋势分析</span>
            </motion.button>
        </div>
    );
}

function FormContent({ setZeroMatchList }: { setZeroMatchList: (list: number[]) => void }) {
    return (
        <div className={style.formContent}>
            <Tips />
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
            default:
                setDialogContent(null);
                break;
        }
    }, [dialogContentType, setDialogContent, zeroMatchList]);

    return (
        <div className={style.queryForm}>
            <FormContent setZeroMatchList={setZeroMatchList} />
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
