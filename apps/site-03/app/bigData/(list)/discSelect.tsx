'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import style from './disSelect.module.scss';
import HandicapAnalysisForm from './handicapAnalysisForm';
import HintsForm from './hintsForm';
import { useDiscSelectStore } from './discSelectStore';
import NormalDialog from '@/components/normalDialog/normalDialog';

function DiscSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const openNoramlDialog = useDiscSelectStore.use.openNoramlDialog();
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

    return (
        <>
            <div className={style.discSelect}>
                {search === 'analysis' ? <HandicapAnalysisForm /> : <HintsForm />}
            </div>
            <NormalDialog
                cancelText="取消"
                confirmText="马上升级"
                content={
                    <div className={style.dialogContent}>
                        <p className={style.text}>今日可用次数已用完，</p>
                        <p className={style.text}>升级为VIP会员即可无限次使用！</p>
                    </div>
                }
                onClose={() => {
                    setOpenNormalDialog(false);
                }}
                onConfirm={() => {
                    router.push('/userInfo/subscribe');
                }}
                openDialog={openNoramlDialog}
            />
        </>
    );
}

export default DiscSelect;
