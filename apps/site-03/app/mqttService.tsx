'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { OddsHashTable } from 'lib';
import { mqttService } from 'lib';
import type { OriginalContestInfo } from 'data-center';
import { useContestInfoStore } from './contestInfoStore';
import { useUserStore } from './userStore';

function MqttService({ children }: { children: ReactNode }) {
    const updateInfo = useContestInfoStore.use.setContestInfoContest();
    const updateOdds = useContestInfoStore.use.setContestOdds();

    useEffect(() => {
        const memberId = useUserStore.getState().userInfo.uid;
        const syncGlobalStore = (message: Partial<OriginalContestInfo>) => {
            updateInfo(message);
        };
        const syncGlobalOddsStore = (message: OddsHashTable) => {
            updateOdds(message);
        };
        mqttService.init({ memberId });
        mqttService.getMessage(syncGlobalStore);
        mqttService.getOdds(syncGlobalOddsStore);
    }, []);

    return <>{children}</>;
}

export default MqttService;
