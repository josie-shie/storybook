'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slickOption } from 'ui/stories/slickPro/slick';
import type {
    GetExponentResponse,
    ExponentHandicapsInfo,
    ExponentWinDrawLoseInfo,
    ExponentOverUnderInfo,
    CompanyInfo
} from 'data-center';
import { mqttService } from 'lib';
import type { TabListType } from '@/types/exponent';
import { createExponentStore, useExponentStore } from '../../exponentStore';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './exponent.module.scss';
import Handicap from './handicap';
import OverUnder from './overUnder';
import WinLose from './winLose';
import Corners from './corners';
import ExponentInfoDrawer from './detailDrawer/exponentInfoDrawer';

interface OddsRunningMqttResponse {
    matchId: number;
    companyId: number;
    odds1: string;
    odds2: string;
    odds3: string;
    type: number;
    modifytime: number;
}

function ExponentContainer({ matchId }: { matchId: number }) {
    const companyInfo = useExponentStore.use.companyInfo();
    const setCompanyInfo = useExponentStore.use.setCompanyInfo();
    const matchDetail = useContestDetailStore.use.matchDetail();
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

    const syncExponent = (message: OddsRunningMqttResponse) => {
        if (message.matchId === Number(matchId)) {
            const newData = { ...companyInfo } as CompanyInfo;
            let updateType = '' as TabListType;
            let updateData = {} as
                | ExponentHandicapsInfo
                | ExponentWinDrawLoseInfo
                | ExponentOverUnderInfo;

            switch (message.type) {
                case 1:
                case 6:
                    updateType = 'handicap';
                    updateData = {
                        handicap: parseFloat(message.odds2),
                        homeOdds: parseFloat(message.odds1),
                        awayOdds: parseFloat(message.odds3),
                        closed: message.type === 6
                    };
                    break;
                case 2:
                case 7:
                    updateType = 'overUnder';
                    updateData = {
                        line: parseFloat(message.odds2),
                        overOdds: parseFloat(message.odds1),
                        underOdds: parseFloat(message.odds3),
                        closed: message.type === 7
                    };
                    break;
                case 4:
                case 5:
                    updateType = 'winDrawLose';
                    updateData = {
                        homeWin: parseFloat(message.odds1),
                        draw: parseFloat(message.odds2),
                        awayWin: parseFloat(message.odds3),
                        closed: message.type === 5
                    };
                    break;
                case 8:
                case 9:
                    updateType = 'corners';
                    updateData = {
                        line: parseFloat(message.odds2),
                        overOdds: parseFloat(message.odds1),
                        underOdds: parseFloat(message.odds3),
                        closed: message.type === 9
                    };
                    break;
                default:
                    console.error('Unknown type');
                    break;
            }

            if (message.companyId in newData[updateType]) {
                newData[updateType][message.companyId].live = updateData;

                if (matchDetail.state < 1) {
                    newData[updateType][message.companyId].beforeMatch = updateData;
                }

                setCompanyInfo(newData);
            }
        }
    };

    mqttService.getOddsRunning(syncExponent);

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

function Exponent({
    exponentData,
    matchId
}: {
    exponentData: GetExponentResponse;
    matchId: number;
}) {
    createExponentStore({
        companyList: exponentData.companyList,
        companyInfo: exponentData.companyInfo
    });

    return <ExponentContainer matchId={matchId} />;
}

export default Exponent;
