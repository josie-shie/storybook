'use client';
import { useEffect, useState } from 'react';
import type { EventInfo, GetLiveTextResponse } from 'data-center';
import { getEventData } from 'data-center';
import { slickOption } from 'ui/stories/slickPro/slick';
import { motion, AnimatePresence } from 'framer-motion';
import { mqttService } from 'lib';
import style from './liveEvent.module.scss';
import TextLive from './textLive';
import Event from './event';
import TipBar from './tipBar';

interface TextLiveMqttResponse {
    matchId: number;
    textLiveData: GetLiveTextResponse;
}

function EventContainer({
    tabKey,
    matchId,
    handleResetHeight
}: {
    tabKey: string;
    matchId: number;
    handleResetHeight: () => void;
}) {
    const [eventList, setEventList] = useState<EventInfo[]>([]);

    const fetchEventData = async () => {
        const res = await getEventData(Number(matchId));
        if (res.success) {
            setEventList(res.data);
            handleResetHeight();
        }
    };

    useEffect(() => {
        if (eventList.length === 0) {
            void fetchEventData();
        }
    }, []);

    const syncEvent = (message: Partial<EventInfo>) => {
        if (message.matchId === matchId) {
            const liveEvent = JSON.parse(JSON.stringify(message)) as EventInfo;

            setEventList([...eventList, liveEvent]);
            handleResetHeight();
        }
    };

    mqttService.getEventList(syncEvent);

    if (tabKey !== 'event') {
        return null;
    }
    return <Event eventList={eventList} />;
}

function LiveContainer({
    initLive,
    tabKey,
    matchId,
    handleResetHeight
}: {
    initLive: GetLiveTextResponse;
    tabKey: string;
    matchId: number;
    handleResetHeight: () => void;
}) {
    const [liveList, setLiveList] = useState<GetLiveTextResponse>(initLive);
    const syncLiveText = (message: TextLiveMqttResponse) => {
        if (message.matchId === Number(matchId)) {
            if (liveList.length === message.textLiveData.length) {
                return;
            }
            setLiveList(message.textLiveData);
            handleResetHeight();
        }
    };
    mqttService.getTextLiveList(syncLiveText);

    useEffect(() => {
        setLiveList(initLive);
    }, [initLive]);

    if (tabKey !== 'live') {
        return null;
    }
    return <TextLive liveList={liveList} />;
}

function LiveEvent({ textLive, matchId }: { textLive: GetLiveTextResponse; matchId: number }) {
    const [tabKey, setTabKey] = useState('live');
    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    const tabList: { title: string; value: string }[] = [
        { title: '文字直播', value: 'live' },
        { title: '重要事件', value: 'event' }
    ];
    const handleResetHeight = () => {
        if ('contestInfoResetHeight' in slickOption) {
            slickOption.contestInfoResetHeight();
        }
    };

    return (
        <div className={style.liveEvent}>
            <div className="minTabBar">
                {tabList.map(tab => (
                    <motion.div
                        animate={tabKey === tab.value ? tabActive : tabDefault}
                        className="tab"
                        key={tab.value}
                        onAnimationComplete={() => {
                            handleResetHeight();
                        }}
                        onClick={() => {
                            setTabKey(tab.value);
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
                    initial={{ opacity: 0, y: 0 }}
                    key={tabKey}
                    transition={{ duration: 0.16 }}
                >
                    {tabKey === 'live' ? (
                        <LiveContainer
                            handleResetHeight={handleResetHeight}
                            initLive={textLive}
                            matchId={matchId}
                            tabKey={tabKey}
                        />
                    ) : (
                        <EventContainer
                            handleResetHeight={handleResetHeight}
                            matchId={matchId}
                            tabKey={tabKey}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
            <TipBar />
        </div>
    );
}

export default LiveEvent;
