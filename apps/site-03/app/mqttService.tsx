'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { mqttService } from 'lib';
import type { OriginalContestInfo } from 'data-center';
import { useContestInfoStore } from './contestInfoStore';

function MqttService({ children }: { children: ReactNode }) {
    const update = useContestInfoStore.use.setContestInfoContest();

    useEffect(() => {
        const syncGlobalStore = (message: Partial<OriginalContestInfo>) => {
            update(message);
        };
        mqttService.init();
        mqttService.getMessage(syncGlobalStore);
    }, []);

    return <>{children}</>;
}

export default MqttService;
