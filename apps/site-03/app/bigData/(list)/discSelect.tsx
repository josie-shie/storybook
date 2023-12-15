'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import style from './disSelect.module.scss';
import HandicapAnalysisForm from './handicapAnalysisForm';
import HintsForm from './hintsForm';
import { useDiscSelectStore } from './discSelectStore';
import systemErrorImage from './img/systemError.png';
import EmptyDataImage from './img/emptyData.png';
import ErrorDialog from './components/dialog/dialog';

function EmptyResponseError() {
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

    return (
        <>
            <div className={style.errorMessage}>
                <Image alt="" height={100} src={EmptyDataImage.src} width={100} />
                <p>此條件查无资料！请重新修改搜寻条件</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenNormalDialog(false);
                    }}
                >
                    重新查询
                </div>
            </div>
        </>
    );
}

function SystemError() {
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

    return (
        <>
            <div className={style.errorMessage}>
                <Image alt="" height={100} src={systemErrorImage.src} width={100} />
                <p>哎呀，系统暂时出错！ 请稍候重试</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                    }}
                >
                    返回
                </div>
                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenNormalDialog(false);
                    }}
                >
                    回報錯誤
                </div>
            </div>
        </>
    );
}

function DiscSelect() {
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const openNoramlDialog = useDiscSelectStore.use.openNoramlDialog();
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();
    const dialogErrorType = useDiscSelectStore.use.dialogContentType();
    const dialogContent = useDiscSelectStore.use.dialogContent();
    const setDialogContent = useDiscSelectStore.use.setDialogContent();

    useEffect(() => {
        switch (dialogErrorType) {
            case 'system':
                setDialogContent(<SystemError />);
                break;
            case 'empty':
                setDialogContent(<EmptyResponseError />);
                break;
            default:
                setDialogContent(null);
                break;
        }
    }, [dialogErrorType, setDialogContent]);

    return (
        <>
            <div className={style.discSelect}>
                {search === 'analysis' ? <HandicapAnalysisForm /> : <HintsForm />}
            </div>
            <ErrorDialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                onClose={() => {
                    setOpenNormalDialog(false);
                }}
                openDialog={openNoramlDialog}
            />
        </>
    );
}

export default DiscSelect;
