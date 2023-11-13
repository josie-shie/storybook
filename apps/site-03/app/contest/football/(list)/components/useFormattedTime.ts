'use client';
import { timestampToString } from 'lib';
import { useEffect, useState } from 'react';

interface TimeAreaProps {
    timeStamp: number;
    formattedString?: string;
}

export function useFormattedTime({ timeStamp, formattedString = 'HH:mm' }: TimeAreaProps) {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const currentTime = timestampToString(timeStamp, formattedString);
        setTime(currentTime);
    }, [timeStamp, formattedString]);

    return time;
}
