'use client';
import type { EventInfo, GetLiveTextResponse } from 'data-center';
import { slickOption } from 'ui/stories/slickPro/slick';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { mqttService } from 'lib';
import style from './liveEvent.module.scss';
import TextLive from './textLive';
import Event from './event';
import TipBar from './tipBar';

const eventListMock = [
    {
        matchId: 4068982,
        isHome: false,
        kind: 3,
        time: '12',
        nameEn: '0',
        nameChs: '0',
        nameCht: '0',
        playerId: '0',
        nameEn2: '0',
        nameChs2: '0',
        nameCht2: '0',
        playerId2: '0',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: true,
        kind: 3,
        time: '24',
        nameEn: 'Paulo Victor da Costa Miranda Alves',
        nameChs: '米兰达·阿尔维斯',
        nameCht: '米兰达·阿尔维斯',
        playerId: '1616917',
        nameEn2: '0',
        nameChs2: '0',
        nameCht2: '0',
        playerId2: '0',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 1,
        time: '33',
        nameEn: 'Leanderson da Silva Genésio',
        nameChs: '利安德森·达席尔瓦·热内西奥',
        nameCht: '利安德森·達席爾瓦·熱內西奧',
        playerId: '1541095',
        nameEn2: 'João Batista da Cruz Santos Neto',
        nameChs2: '若奥·内托',
        nameCht2: '若奥·内托',
        playerId2: '1401728',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: true,
        kind: 3,
        time: '35',
        nameEn: 'Patrick',
        nameChs: '帕特里克',
        nameCht: '帕特里克',
        playerId: '1109695',
        nameEn2: '0',
        nameChs2: '0',
        nameCht2: '0',
        playerId2: '0',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 6,
        time: '46',
        nameEn: '',
        nameChs: '',
        nameCht: '',
        playerId: '',
        nameEn2: '',
        nameChs2: '',
        nameCht2: '',
        playerId2: '',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: true,
        kind: 11,
        time: '46',
        nameEn: 'Edilson',
        nameChs: '爱迪尔森',
        nameCht: '爱迪尔森',
        playerId: '1745238',
        nameEn2: 'Victor Gualberto Araújo',
        nameChs2: '维克托·瓜尔贝托·阿劳霍',
        nameCht2: '维克托·瓜尔贝托·阿劳霍',
        playerId2: '1316201',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 11,
        time: '51',
        nameEn: 'Marcos Pedro Braga Maciel',
        nameChs: '马科斯·佩德罗·布拉加·马谢尔',
        nameCht: '馬科斯·佩德羅·布拉加·馬謝爾',
        playerId: '1448776',
        nameEn2: 'Rafael Monteiro·Reis',
        nameChs2: '拉斐尔·蒙泰罗·雷斯',
        nameCht2: '拉斐爾·蒙泰羅·雷斯',
        playerId2: '1657618',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 3,
        time: '52',
        nameEn: 'Felipe·De Andrade Vieira',
        nameChs: '费利佩·德安德拉德·维埃拉',
        nameCht: '費利佩·德安德拉德·維埃拉',
        playerId: '1448779',
        nameEn2: '0',
        nameChs2: '0',
        nameCht2: '0',
        playerId2: '0',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 11,
        time: '59',
        nameEn: 'Éder Maciel Lopes',
        nameChs: '埃德尔·马希尔·洛佩斯',
        nameCht: '埃德尔·马希尔·洛佩斯',
        playerId: '1521901',
        nameEn2: 'Gustavo',
        nameChs2: '古斯塔沃',
        nameCht2: '古斯塔沃',
        playerId2: '1123794',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: true,
        kind: 11,
        time: '65',
        nameEn: 'Clisman Miller Mendes Cunha',
        nameChs: '门德斯·库尼亚',
        nameCht: '门德斯·库尼亚',
        playerId: '1379717',
        nameEn2: 'Gerson Jose',
        nameChs2: '杰森·何塞',
        nameCht2: '杰森·何塞',
        playerId2: '1144327',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: true,
        kind: 3,
        time: '67',
        nameEn: 'João Victor Alves de Brito Martins',
        nameChs: '布里托·马丁斯',
        nameCht: '布里托·马丁斯',
        playerId: '1364583',
        nameEn2: '0',
        nameChs2: '0',
        nameCht2: '0',
        playerId2: '0',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: true,
        kind: 11,
        time: '74',
        nameEn: 'Pablo Alves de Lima',
        nameChs: '帕布罗',
        nameCht: '帕布罗',
        playerId: '1287061',
        nameEn2: 'Ítalo Barbosa de Andrade',
        nameChs2: '伊塔洛',
        nameCht2: '伊塔洛',
        playerId2: '1295977',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 11,
        time: '75',
        nameEn: 'Jhonny Cardinoti Pedro',
        nameChs: '佩德罗',
        nameCht: '佩德罗',
        playerId: '1612420',
        nameEn2: 'Lucas Justen',
        nameChs2: '卢卡斯·贾斯汀',
        nameCht2: '卢卡斯·贾斯汀',
        playerId2: '1693685',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 11,
        time: '76',
        nameEn: 'Kauã Elias',
        nameChs: '埃拉斯',
        nameCht: '埃拉斯',
        playerId: '1648769',
        nameEn2: 'Arthur Wenderrosky Sanches',
        nameChs2: '阿瑟·温德罗斯基·桑切斯',
        nameCht2: '阿瑟·温德罗斯基·桑切斯',
        playerId2: '1399801',
        overtime: ''
    },
    {
        matchId: 4068982,
        isHome: false,
        kind: 5,
        time: '90',
        nameEn: '',
        nameChs: '',
        nameCht: '',
        playerId: '',
        nameEn2: '',
        nameChs2: '',
        nameCht2: '',
        playerId2: '',
        overtime: ''
    }
];

interface TextLiveMqttResponse {
    matchId: number;
    textLiveData: GetLiveTextResponse;
}

function EventContainer({
    initEvent,
    tabKey,
    matchId
}: {
    initEvent: EventInfo[];
    tabKey: string;
    matchId: number;
}) {
    const [eventList, setEventList] = useState(initEvent);
    const syncEvent = (message: Partial<EventInfo>) => {
        if (message.matchId === matchId) {
            const liveEvent = JSON.parse(JSON.stringify(message)) as EventInfo;

            setEventList([...eventList, liveEvent]);
        }
    };

    mqttService.getEventList(syncEvent);

    if (tabKey !== 'event') return null;

    return <Event eventList={eventList} />;
}

function LiveContainer({
    initLive,
    tabKey,
    matchId
}: {
    initLive: GetLiveTextResponse;
    tabKey: string;
    matchId: number;
}) {
    const [liveList, setLiveList] = useState<GetLiveTextResponse>(initLive);
    const syncLiveText = (message: TextLiveMqttResponse) => {
        if (message.matchId === Number(matchId)) {
            if (liveList.length === message.textLiveData.length) {
                return;
            }
            setLiveList(message.textLiveData);
        }
    };
    mqttService.getTextLiveList(syncLiveText);

    if (tabKey !== 'live') return null;

    return <TextLive liveList={liveList} />;
}

function LiveEvent({ textLive, matchId }: { textLive: GetLiveTextResponse; matchId: number }) {
    const [tabKey, setTabKey] = useState('live');
    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f3f3f3',
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
                        <LiveContainer initLive={textLive} matchId={matchId} tabKey={tabKey} />
                    ) : (
                        <EventContainer
                            initEvent={eventListMock}
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
