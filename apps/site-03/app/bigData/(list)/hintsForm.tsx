import { useEffect } from 'react';
import Image from 'next/image';
import type { OddsHintRequest } from 'data-center';
import { getBigdataHint } from 'data-center';
import { motion } from 'framer-motion';
import style from './disSelect.module.scss';
import SelectOption from './components/selectOption/selectOption';
import { useHintsFormStore } from './hintsFormStore';
import starIcon from './img/star.png';
import HandicapDrawer from './components/handicapDrawer/handicapDrawer';
import { useMatchFilterStore } from './matchFilterStore';
import { useNotificationStore } from '@/app/notificationStore';

function HintsSelect({ hintsSelected }: { hintsSelected: string }) {
    const playList = useHintsFormStore.use.playList();
    const setHintsSelected = useHintsFormStore.use.setHintsSelected();

    return (
        <SelectOption
            hideTitle
            options={playList}
            placeholder="选择全场大小球"
            selectTitle=""
            setSelected={setHintsSelected}
            title="玩法筛选"
            valueSelected={hintsSelected}
        />
    );
}

function HandicapAnalysisForm() {
    const setHandicapTips = useHintsFormStore.use.setHandicapTips();
    const hintsSelected = useHintsFormStore.use.hintsSelected();
    const hintsError = useHintsFormStore.use.hintsError();
    const setHintsError = useHintsFormStore.use.setHintsError();
    const showHintsDrawer = useHintsFormStore.use.showHintsDrawer();
    const setShowHintsDrawer = useHintsFormStore.use.setShowHintsDrawer();

    // for match filter
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();

    const openHintsDrawer = async () => {
        if (!hintsSelected) {
            setHintsError('请选择大小球类别');
            return;
        }

        setHintsError('');

        const res = await getBigdataHint(hintsSelected as unknown as OddsHintRequest);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得盘路提示资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        setHandicapTips(res.data);
        setContestList({
            contestList: res.data
        });
        setContestInfo({
            contestList: res.data
        });
        setShowHintsDrawer(true);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    return (
        <>
            <HintsSelect hintsSelected={hintsSelected} />
            <div className={style.tips}>
                数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
            </div>
            <div className={style.error}>{hintsError}</div>
            <motion.button
                className={style.search}
                onClick={openHintsDrawer}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                <Image alt="" height={14} src={starIcon.src} width={14} />
                获得盘路提示
            </motion.button>
            <HandicapDrawer
                hintsSelected={hintsSelected}
                isOpen={showHintsDrawer}
                onClose={() => {
                    setShowHintsDrawer(false);
                }}
                onOpen={() => {
                    setShowHintsDrawer(true);
                }}
            />
        </>
    );
}

export default HandicapAnalysisForm;
