import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import style from './disSelect.module.scss';
import starIcon from './img/star.png';
import selectIcon from './img/select.png';
import switchIcon from './img/switch.png';

function StepIndicator({ stepNumber, text }: { stepNumber: string; text: string }) {
    return (
        <div className={style.step}>
            <span className={style.stepNumber}>
                <span className={style.number}>{stepNumber}</span>
                <span className={style.text}>{text}</span>
            </span>
        </div>
    );
}

function OptionButton({
    active,
    onClick,
    label,
    imageSrc
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    imageSrc: string;
}) {
    return (
        <button
            className={`${style.option} ${active ? style.active : ''}`}
            onClick={onClick}
            type="button"
        >
            {active ? (
                <Image alt="" className={style.select} height={15} src={imageSrc} width={16} />
            ) : null}
            {label}
        </button>
    );
}

function HandicapAnalysisForm() {
    const [hintsSelectPlay, setHintsSelectPlay] = useState('HANDICAP');
    const [hintsSelectType, setHintsSelectType] = useState('OVER');
    const [hintsSelectProgres, setHintsSelectProgres] = useState('HALF');

    const selectsPlay = (name: string) => {
        setHintsSelectPlay(name);
        localStorage.setItem('getSelectsPlay', name);
        if (name === 'HANDICAP') {
            setHintsSelectType('OVER');
            localStorage.setItem('getSelectsType', 'OVER');
        }
        if (name === 'OVERUNDER') {
            setHintsSelectType('WIN');
            localStorage.setItem('getSelectsType', 'WIN');
        }
    };

    const selectsType = (name: string) => {
        setHintsSelectType(name);
        localStorage.setItem('getSelectsType', name);
    };

    const selectsProgress = (name: string) => {
        setHintsSelectProgres(name);
        localStorage.setItem('getSelectsProgres', name);
    };

    useEffect(() => {
        localStorage.setItem('getSelectsPlay', 'HANDICAP');
        localStorage.setItem('getSelectsType', 'OVER');
        localStorage.setItem('getSelectsProgres', 'HALF');
    }, []);

    return (
        <>
            <div className={style.step}>
                <StepIndicator stepNumber="1" text="选择玩法" />
                <div className={style.options}>
                    <OptionButton
                        active={hintsSelectPlay === 'HANDICAP'}
                        imageSrc={selectIcon.src}
                        label="大小球"
                        onClick={() => {
                            selectsPlay('HANDICAP');
                        }}
                    />
                    <OptionButton
                        active={hintsSelectPlay === 'OVERUNDER'}
                        imageSrc={selectIcon.src}
                        label="让球"
                        onClick={() => {
                            selectsPlay('OVERUNDER');
                        }}
                    />
                </div>
            </div>
            <div className={style.step}>
                <StepIndicator stepNumber="2" text="连续方式" />
                <div className={style.options}>
                    {hintsSelectPlay === 'HANDICAP' && (
                        <>
                            <OptionButton
                                active={hintsSelectType === 'OVER'}
                                imageSrc={selectIcon.src}
                                label="连续大球"
                                onClick={() => {
                                    selectsType('OVER');
                                }}
                            />
                            <OptionButton
                                active={hintsSelectType === 'UNDER'}
                                imageSrc={selectIcon.src}
                                label="连续小球"
                                onClick={() => {
                                    selectsType('UNDER');
                                }}
                            />
                        </>
                    )}
                    {hintsSelectPlay === 'OVERUNDER' && (
                        <>
                            <OptionButton
                                active={hintsSelectType === 'WIN'}
                                imageSrc={selectIcon.src}
                                label="连续赢盘"
                                onClick={() => {
                                    selectsType('WIN');
                                }}
                            />
                            <OptionButton
                                active={hintsSelectType === 'LOSE'}
                                imageSrc={selectIcon.src}
                                label="连续输盘"
                                onClick={() => {
                                    selectsType('LOSE');
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={style.step}>
                <StepIndicator stepNumber="3" text="半/全场" />
                <div className={style.special}>
                    <div className={style.specialOptions}>
                        <button
                            className={`${style.option} ${
                                hintsSelectProgres === 'HALF' ? style.first : ''
                            }`}
                            onClick={() => {
                                selectsProgress('HALF');
                            }}
                            type="button"
                        >
                            半場
                        </button>
                        <Image
                            alt=""
                            className={style.switch}
                            height={13}
                            src={switchIcon.src}
                            width={16}
                        />
                        <button
                            className={`${style.option} ${
                                hintsSelectProgres === 'FULL' ? style.second : ''
                            }`}
                            onClick={() => {
                                selectsProgress('FULL');
                            }}
                            type="button"
                        >
                            全場
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.tips}>
                数据中心会將符合您条件设定的24小時內即將開場賽事汇整列出
            </div>
            {/* <div className={style.error}>{hintsError}</div> */}
            <Link href="bigData/longDragon">
                <motion.button className={style.search} type="button" whileTap={{ scale: 0.9 }}>
                    <Image alt="" height={14} src={starIcon.src} width={14} />
                    获得今日长龙赛事
                </motion.button>
            </Link>
        </>
    );
}

export default HandicapAnalysisForm;
