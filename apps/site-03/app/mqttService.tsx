'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { mqttService } from 'lib';
import type { OriginalContestInfo } from 'data-center';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useUserStore } from '@/store/userStore';

interface OddsRunningMqttResponse {
    matchId: number;
    companyId: number;
    odds1: string;
    odds2: string;
    odds3: string;
    type: number;
    modifytime: number;
}

function MqttService({ children }: { children: ReactNode }) {
    useEffect(() => {
        const updateInfo = useLiveContestStore.getState().setContestInfoContest;
        const updateOdds = useLiveContestStore.getState().setContestOdds;
        const memberId = useUserStore.getState().userInfo.uid;
        const syncGlobalStore = (message: Partial<OriginalContestInfo>) => {
            updateInfo(message);
        };
        const syncGlobalOddsStore = (message: OddsRunningMqttResponse) => {
            updateOdds(message);
        };
        mqttService.init({ memberId });
        mqttService.getMessage(syncGlobalStore);
        mqttService.getOddsRunning(syncGlobalOddsStore);
    }, []);

    return <>{children}</>;
}

export default MqttService;
