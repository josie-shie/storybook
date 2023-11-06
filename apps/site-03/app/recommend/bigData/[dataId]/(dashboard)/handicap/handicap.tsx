import { Switch } from 'ui/stories/switch/switch';
import { useState } from 'react';
import ContestDrawerList from '../components/contestDrawerList';
import TextRadio from './switch/textSwitch';
import style from './handicap.module.scss';

function Handicap() {
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('full');
    const [currentSwitch, setCurrentSwitch] = useState('day');
    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className={style.handicap}>
                <div className={style.control}>
                    <div className={style.left}>
                        <Switch
                            onChange={setCurrentSwitch}
                            options={[
                                { label: '日', value: 'day' },
                                { label: '月', value: 'month' }
                            ]}
                            value={currentSwitch}
                        />
                    </div>
                    <div className={style.right}>
                        <TextRadio
                            onChange={value => {
                                setHandicapRadio(value as 'half' | 'full');
                            }}
                            value={handicapRadio}
                        />
                    </div>
                </div>
                <div className={style.eChat}>
                    <ul>
                        {Array(9)
                            .fill(null)
                            .map((_, index) => (
                                <li key={`${9 - index}`}>
                                    <span className={style.bar} />
                                    <span className={style.text}>{`W${9 - index}`}</span>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={style.dot}>
                    <span className={style.top}>上盤</span>
                    <span className={style.middle}>走盤</span>
                    <span className={style.bottom}>下盤</span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>半場讓球</div>
                <div className={style.header}>半場大小</div>
                <div className={style.header}>半場獨贏</div>

                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>

                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>

                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        定 20
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        定 20
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        定 20
                    </span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>全場讓球</div>
                <div className={style.header}>全場大小</div>
                <div className={style.header}>全場獨贏</div>

                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>

                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>

                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        定 20
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        定 20
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        定 20
                    </span>
                </div>
            </div>
            <ContestDrawerList
                isOpen={showList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                title="讓球大小/全場讓球/上盤"
            />
        </>
    );
}

export default Handicap;
