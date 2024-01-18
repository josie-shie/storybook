'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { OddsHintsType, OddsHintsProgress } from 'data-center';
import { getBigdataHint } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import { useLongDragonStore } from './longDragonStore';
import AnalyzeData from './img/analyzeData.png';
import ErrorDialog from './components/dialog/dialog';
import LongButton from './components/longButton/longButton';
import systemErrorImage from './img/systemError.png';
import style from './longDragon.module.scss';
import HandicapTips from './handicapTips';

type LongFilter = '3rd' | '4rd' | '4rdUp' | 'hot';

function SystemError() {
    const [message, setMessage] = useState('');
    const setShowLongDragon = useLongDragonStore.use.setShowLongDragon();
    const setOpenErrorDialog = useLongDragonStore.use.setOpenErrorDialog();

    useEffect(() => {
        setMessage('哎呀，系统暂时出错！ 请稍候重试');
    }, []);

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
                        setOpenErrorDialog(false);
                        setShowLongDragon(false);
                    }}
                >
                    返回
                </div>
                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenErrorDialog(false);
                        setShowLongDragon(false);
                    }}
                >
                    回报错误
                </div>
            </div>
        </>
    );
}

function LongDragonResult({ showLongDragon }: { showLongDragon: boolean }) {
    const hintsSelectType = useLongDragonStore.use.hintsSelectType();
    const hintsSelectProgres = useLongDragonStore.use.hintsSelectProgres();
    const setHintsSelectType = useLongDragonStore.use.setHintsSelectType();

    const setDialogContent = useLongDragonStore.use.setDialogContent();
    const dialogContent = useLongDragonStore.use.dialogContent();
    const setOpenErrorDialog = useLongDragonStore.use.setOpenErrorDialog();
    const openErrorDialog = useLongDragonStore.use.openErrorDialog();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handicapTips = useLongDragonStore.use.handicapTips();
    const setHandicapTips = useLongDragonStore.use.setHandicapTips();
    const [isActive, setIsActive] = useState<LongFilter[]>([]);

    const updateActive = (newActive: LongFilter[]) => {
        setIsActive(newActive);
    };

    const getBigDataHintList = async () => {
        const res = await getBigdataHint({
            continuity: hintsSelectType as OddsHintsType,
            progress: hintsSelectProgres as OddsHintsProgress
        });
        if (!res.success) {
            setTimeout(() => {
                setOpenErrorDialog(true);
                setIsLoading(false);
                setDialogContent(<SystemError />);
            }, 500);
            return;
        }

        const sortList = res.data.sort((a, b) => {
            if (a.leagueLevel === 1 || b.leagueLevel === 1) {
                return a.leagueLevel === 1 ? -1 : 1;
            } else if (a.leagueLevel === 2 || b.leagueLevel === 2) {
                return a.leagueLevel === 2 ? -1 : 1;
            }
            return a.startTime - b.startTime;
        });

        setHandicapTips(sortList);

        setIsLoading(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setHintsSelectType(newValue);
    };

    useEffect(() => {
        if (showLongDragon) {
            void getBigDataHintList();
        }
    }, [showLongDragon, hintsSelectType, hintsSelectProgres]);

    useEffect(() => {
        setDialogContent(null);
    }, [setDialogContent]);

    return (
        <>
            <div className={style.layout}>
                <div className={style.dashboard}>
                    <div className={style.switch}>
                        <div className={style.today}>今日</div>
                        <Tabs onChange={handleChange} value={hintsSelectType}>
                            <Tab label="连赢" value="WIN" />
                            <Tab label="连输" value="LOSE" />
                            <Tab label="连大球" value="OVER" />
                            <Tab label="连小球" value="UNDER" />
                        </Tabs>
                    </div>
                    <LongButton isActive={isActive} updateActive={updateActive} />
                    <div className={style.wrapper}>
                        {isLoading ? (
                            <div className={style.analyze}>
                                <Image alt="" height={100} src={AnalyzeData} width={100} />
                                <span>资料分析中 请稍候</span>
                            </div>
                        ) : (
                            <>
                                {handicapTips.length ? (
                                    <HandicapTips activeFilters={isActive} />
                                ) : (
                                    <NoData text="暂无资料" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ErrorDialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                onClose={() => {
                    setOpenErrorDialog(false);
                }}
                openDialog={openErrorDialog}
            />
        </>
    );
}

export default LongDragonResult;
