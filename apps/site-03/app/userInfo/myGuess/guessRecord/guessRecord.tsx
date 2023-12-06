import RecordCard from '../components/recordCard/recordCard';
import style from './guessRecord.module.scss';
import { creatGuessRecordListStore, useGuessRecordListStore } from './guessRecordStore';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function RecordContent() {
    const recordList = useGuessRecordListStore.use.guessRecordList();
    return (
        <div className={style.guessRecord}>
            <div className={style.title}>
                <span>競猜瀏覽紀錄</span>
            </div>
            {recordList.map(item => (
                <RecordCard key={item.id} recordItem={item} />
            ))}
        </div>
    );
}

function GuessRecord({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    creatGuessRecordListStore({
        isOpen: false,
        guessRecordList: [
            {
                id: 7,
                avatar: '',
                name: '老不休聊球',
                hotStreak: 2,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'big',
                result: 'win',
                guessValue: 0.5
            },
            {
                id: 7,
                avatar: '',
                name: '老梁聊球',
                hotStreak: 2,
                homeTeam: '欧锦2A',
                awayTeam: '斯洛文尼亚U0',
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'home',
                result: 'lose',
                guessValue: 0.5
            },
            {
                id: 7,
                avatar: '',
                name: '老張聊球',
                hotStreak: 2,
                homeTeam: '欧锦U200A',
                awayTeam: '斯洛文尼亚U300',
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'away',
                result: 'draw',
                guessValue: 0.5
            }
        ]
    });
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <RecordContent />
        </BottomDrawer>
    );
}

export default GuessRecord;
