'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slickOption } from 'ui/stories/slickPro/slick';
import type { GetExponentResponse } from 'data-center';
import { createExponentStore } from '../../exponentStore';
import style from './exponent.module.scss';
import Handicap from './handicap';
import OverUnder from './overUnder';
import WinLose from './winLose';
import Corners from './corners';
import ExponentInfoDrawer from './detailDrawer/exponentInfoDrawer';

function Exponent({ exponentData }: { exponentData: GetExponentResponse }) {
    createExponentStore({
        companyList: exponentData.companyList,
        companyInfo: exponentData.companyInfo
    });

    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    const tabList = [
        { title: '让分', value: 'handicap' },
        { title: '胜平负', value: 'winLose' },
        { title: '进球数', value: 'overUnder' },
        { title: '角球', value: 'corners' }
    ];
    const selectedMap = {
        handicap: <Handicap />,
        winLose: <WinLose />,
        overUnder: <OverUnder />,
        corners: <Corners />
    };

    const [selectedOption, setSelectedOption] = useState('handicap');

    const handleResetHeight = () => {
        slickOption.contestInfoResetHeight();
    };

    return (
        <>
            <div className={style.exponent}>
                <div className="minTabBar">
                    {tabList.map(tab => (
                        <motion.div
                            animate={selectedOption === tab.value ? tabActive : tabDefault}
                            className="tab"
                            key={tab.value}
                            onAnimationComplete={() => {
                                handleResetHeight();
                            }}
                            onClick={() => {
                                setSelectedOption(tab.value);
                            }}
                        >
                            {tab.title}
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className={style.content}
                        exit={{ opacity: 0, y: -4 }}
                        initial={{ opacity: 0, y: 4 }}
                        key={selectedOption}
                        transition={{ duration: 0.16 }}
                    >
                        {selectedMap[selectedOption]}
                    </motion.div>
                </AnimatePresence>
            </div>
            <ExponentInfoDrawer />
        </>
    );
}

export default Exponent;
