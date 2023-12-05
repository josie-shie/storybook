'use client';
import { useEffect, useRef } from 'react';
import { mqttService } from 'lib';

function OddMqttService() {
    const initRef = useRef(false);
    useEffect(() => {
        mqttService.oddRunningInit();
        initRef.current = true;
        return () => {
            if (initRef.current) {
                mqttService.oddRunningDeinit();
            }
        };
    }, []);

    return null;
}

export default OddMqttService;
