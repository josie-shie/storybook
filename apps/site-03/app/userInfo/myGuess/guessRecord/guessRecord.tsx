import { useEffect, useState } from 'react';
import RecordCard from '../components/recordCard/recordCard';
import { useMyGuessStore, type RecordItem } from '../myGuessStore';
import style from './guessRecord.module.scss';
import NoData from '@/components/baseNoData/noData';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import Loading from '@/components/loading/loading';

function RecordContent() {
    const guessRecordList = useMyGuessStore.use.myGuess().guessRecordList;

    return (
        <div className={style.guessRecord}>
            <div className={style.title}>
                <span>竞猜浏览纪录</span>
            </div>
            {guessRecordList.length > 0 ? (
                guessRecordList.map(item => <RecordCard key={item.id} recordItem={item} />)
            ) : (
                <NoData />
            )}
        </div>
    );
}

function GuessRecord() {
    const isOpenRecord = useMyGuessStore.use.myGuess().isOpen;
    const setIsOpenRecord = useMyGuessStore.use.setOpen();
    const setGuessRecordList = useMyGuessStore.use.setGuessRecordList();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchListData = () => {
            setIsLoading(true);
            const data = [
                {
                    id: 7,
                    avatar: '',
                    name: '羅曼琉球',
                    hotStreak: 2,
                    homeTeam: '欧锦U20A',
                    awayTeam: '斯洛文尼亚U20',
                    history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                    guess: 'home',
                    result: 'win',
                    guessValue: 0.5
                },
                {
                    id: 3,
                    avatar: '',
                    name: '小羅聊球',
                    hotStreak: 2,
                    homeTeam: '欧锦U20A',
                    awayTeam: '斯洛文尼亚U20',
                    history: ['win', 'win', 'win', 'win', 'lose', 'draw', 'win', 'win', 'draw'],
                    guess: 'big',
                    result: 'lose',
                    guessValue: 0.5
                },
                {
                    id: 2,
                    avatar: '',
                    name: '小羅聊球',
                    hotStreak: 2,
                    homeTeam: '欧锦U20A',
                    awayTeam: '斯洛文尼亚U20',
                    history: ['win', 'win', 'draw', 'win', 'win', 'draw', 'win', 'win', 'draw'],
                    guess: 'home',
                    result: 'draw',
                    guessValue: 0.5
                },
                {
                    id: 1,
                    avatar: '',
                    name: '小羅聊球',
                    hotStreak: 2,
                    homeTeam: '欧锦U20A',
                    awayTeam: '斯洛文尼亚U20',
                    history: ['win', 'win', 'draw', 'win', 'win', 'draw', 'win', 'win', 'draw'],
                    guess: 'small',
                    result: 'draw',
                    guessValue: 0.5
                }
            ];
            setGuessRecordList(data as RecordItem[]);
            setIsLoading(false);
        };
        fetchListData();
    }, [setGuessRecordList]);

    return (
        <BottomDrawer
            isOpen={isOpenRecord}
            onClose={() => {
                setIsOpenRecord(false);
            }}
            onOpen={() => {
                setIsOpenRecord(true);
            }}
        >
            {isLoading ? (
                <div className={style.loderBox}>
                    <Loading />
                </div>
            ) : (
                <RecordContent />
            )}
        </BottomDrawer>
    );
}

export default GuessRecord;
