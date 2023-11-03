import style from './recordFilter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function RecordFilter({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.recordFilter}>
                <div className={style.container}>
                    <div className={style.title}>
                        <div className={style.name}>查詢紀錄3</div>
                        <div className={style.time}>2023-10-16 11:00</div>
                    </div>
                    <div className={style.content}>
                        <div className={style.top}>
                            <span className={style.title}>全場讓球</span>
                            <span className={style.game}>
                                讓方<span className={style.color}>主</span>、盤口
                                <span className={style.color}>2</span>
                            </span>
                        </div>
                        <div className={style.middle}>
                            <span className={style.title}>全場大小</span>
                            <span className={style.game}>
                                盤口<span className={style.color}>不挑選</span>
                            </span>
                        </div>
                        <div className={style.bottom}>
                            <span className={style.title}>時間區間</span>
                            <span className={style.time}>2023-10-09 ~ 2023-10-16</span>
                        </div>
                    </div>
                </div>
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;
