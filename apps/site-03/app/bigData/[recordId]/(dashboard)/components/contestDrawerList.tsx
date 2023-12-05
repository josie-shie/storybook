import style from './contestDrawerList.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function ContestDrawerList({
    title,
    isOpen,
    onOpen,
    onClose
}: {
    title: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.contestDrawerList}>
                <h2>{title}</h2>
                <div className={style.cardList}>
                    <section className={style.contesntList}>
                        <div className={style.title}>
                            <span className={style.sport}>巴西甲</span>
                            <span className={style.time}>2023-09-12 11:30</span>
                        </div>
                        <div className={style.game}>
                            <div className={`${style.team} ${style.home}`}>
                                <div className={style.name}>泰国国立法政大学</div>
                            </div>
                            <div className={style.contest}>
                                <span className={`${style.status} ${style.ing}`}>1-1</span>
                                <span className={style.number}>(0-1)</span>
                            </div>
                            <div className={`${style.team} ${style.away}`}>
                                <div className={style.name}>泰国国立法政大学</div>
                            </div>
                        </div>
                    </section>
                    <section className={style.contesntList}>
                        <div className={style.title}>
                            <span className={style.sport}>巴西甲</span>
                            <span className={style.time}>2023-09-12 11:30</span>
                        </div>
                        <div className={style.game}>
                            <div className={`${style.team} ${style.home}`}>
                                <div className={style.name}>泰国国立法政大学</div>
                            </div>
                            <div className={style.contest}>
                                <span className={`${style.status} ${style.ing}`}>1-1</span>
                                <span className={style.number}>(0-1)</span>
                            </div>
                            <div className={`${style.team} ${style.away}`}>
                                <div className={style.name}>泰国国立法政大学</div>
                            </div>
                        </div>
                    </section>
                    <section className={style.contesntList}>
                        <div className={style.title}>
                            <span className={style.sport}>巴西甲</span>
                            <span className={style.time}>2023-09-12 11:30</span>
                        </div>
                        <div className={style.game}>
                            <div className={`${style.team} ${style.home}`}>
                                <div className={style.name}>泰国国立法政大学</div>
                            </div>
                            <div className={style.contest}>
                                <span className={`${style.status} ${style.ing}`}>1-1</span>
                                <span className={style.number}>(0-1)</span>
                            </div>
                            <div className={`${style.team} ${style.away}`}>
                                <div className={style.name}>泰国国立法政大学</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </BottomDrawer>
    );
}

export default ContestDrawerList;
