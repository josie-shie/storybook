'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { OddsHashTable } from 'lib';
import { mqttService } from 'lib';
import type { OriginalContestInfo } from 'data-center';
import { useContestInfoStore } from './contestInfoStore';

function MqttService({ children }: { children: ReactNode }) {
    const updateInfo = useContestInfoStore.use.setContestInfoContest();
    const updateOdds = useContestInfoStore.use.setContestOdds();

    useEffect(() => {
        const syncGlobalStore = (message: Partial<OriginalContestInfo>) => {
            updateInfo(message);
        };
        const syncGlobalOddsStore = (message: OddsHashTable) => {
            updateOdds(message);
        };
        mqttService.init();
        mqttService.getMessage(syncGlobalStore);
        mqttService.getOdds(syncGlobalOddsStore);
    }, []);

    return <>{children}</>;
}

export default MqttService;
