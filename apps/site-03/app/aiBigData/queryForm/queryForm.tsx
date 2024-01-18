'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useQueryFormStore } from '../queryFormStore';
import style from './queryForm.module.scss';
import Tips from './components/tips/tips';
import LeagueDrawer from './components/leagueDrawer/leagueDrawer';
import Form from './components/form/form';
import CoinIcon from './img/coin.svg';

function SubmitButton() {
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();
    const isVip = useUserStore.use.memberSubscribeStatus().planId; // 1是VIP
    const setOpenNormalDialog = useQueryFormStore.use.setOpenNormalDialog();
    const setIsOpenPayDrawer = useQueryFormStore.use.setIsOpenPayDrawer();
    const setIsAnalysisBySearch = useQueryFormStore.use.setIsAnalysisBySearch();

    const submit = () => {
        if (!isVip) {
            if (userInfo.balance < 80) {
                setOpenNormalDialog(true);
                return;
            }
            setIsOpenPayDrawer(true);
            return;
        }

        setIsAnalysisBySearch(true);
        router.push('/aiBigData/result');
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

function FormContent() {
    return (
        <div className={style.formContent}>
            <Tips />
            <div className={style.formSelect}>
                <LeagueDrawer />
                <Form />
            </div>
            <SubmitButton />
        </div>
    );
}

function QueryForm() {
    return (
        <div className={style.queryForm}>
            <FormContent />
        </div>
    );
}

export default QueryForm;
