'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './disSelect.module.scss';
import HandicapAnalysisForm from './handicapAnalysisForm';
import HintsForm from './hintsForm';
import { useDiscSelectStore } from './discSelectStore';
import systemErrorImage from './img/systemError.png';
import EmptyDataImage from './img/emptyData.png';
import ErrorDialog from './components/dialog/dialog';

function InsufficientBalance() {
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

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
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

    return (
        <>
            <div className={style.dialogMessage}>
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
    const [message, setMessage] = useState('');
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();
    const dialogErrorType = useDiscSelectStore.use.dialogContentType();

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
                    回报错误
                </div>
            </div>
        </>
    );
}

function DiscSelect() {
    const router = useRouter();
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

    useEffect(() => {
        if (!search) {
            router.push('/bigData/analysis?status=analysis');
        }
    }, [router, search]);

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
