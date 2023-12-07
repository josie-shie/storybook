import RecordCard from '../components/recordCard/recordCard';
import { useMyGuessStore } from '../myGuessStore';
import style from './guessRecord.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function RecordContent() {
    const guessRecordList = useMyGuessStore.use.myGuess().guessRecordList;

    return (
        <div className={style.guessRecord}>
            <div className={style.title}>
                <span>竞猜浏览纪录</span>
            </div>
            {guessRecordList.map(item => (
                <RecordCard key={item.id} recordItem={item} />
            ))}
        </div>
    );
}

function GuessRecord() {
    const isOpenRecord = useMyGuessStore.use.myGuess().isOpen;
    const setIsOpenRecord = useMyGuessStore.use.setOpen();
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
            <RecordContent />
        </BottomDrawer>
    );
}

export default GuessRecord;
