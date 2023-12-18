'use client';
import Switch from '@mui/material/Switch';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { soundList, soundMap, soundSource, soundDefault } from 'lib';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import style from './setting.module.scss';
import RightIcon from './img/right.png';

function SoundSelector({
    isOpen,
    onOpen,
    onClose,
    current,
    update,
    label
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    current: string;
    update: (newSound: string) => void;
    label: string;
}) {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <h3 className={style.soundTitle}>
                {label === 'home' ? '主队进球声音' : '客队进球声音'}
            </h3>

            {soundList.map(item => {
                return (
                    <div
                        className={`${style.soundSelector} ${
                            current === item ? style.selected : ''
                        }`}
                        key={item}
                        onClick={() => {
                            update(item);
                            onClose();
                        }}
                    >
                        {soundMap[item]}
                    </div>
                );
            })}
            <div
                className={`${style.soundSelector} ${style.cancel}`}
                onClick={() => {
                    onClose();
                }}
            >
                取消
            </div>
        </BottomDrawer>
    );
}

function Setting({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const [onMounted, setOnMounted] = useState(false);
    const [openTip, setOpenTip] = useState(false);
    const [openSound, setOpenSound] = useState(false);
    const [homeSound, setHomeSound] = useState('');
    const [awaySound, setAwaySound] = useState('');
    const [showSoundList, setShowSoundList] = useState('');
    const soundSourceList = useRef<{ source: Record<string, HTMLAudioElement> }>({ source: {} });

    useEffect(() => {
        setOnMounted(true);
    }, []);

    useEffect(() => {
        setOpenTip(Boolean(localStorage.getItem('openTip')));
        setOpenSound(Boolean(localStorage.getItem('openSound')));
        setHomeSound(localStorage.getItem('homeSound') || soundDefault.homeSound);
        setAwaySound(localStorage.getItem('awaySound') || soundDefault.awaySound);
    }, []);

    useEffect(() => {
        const table: Record<string, HTMLAudioElement> = {};
        for (const [key, value] of Object.entries(soundSource)) {
            table[key] = new Audio(value);
        }
        soundSourceList.current.source = table;
    });

    return (
        <>
            {onMounted ? (
                <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
                    <div className={style.setting}>
                        <div className={style.topLine} />
                        <h2 className={style.settingTitle}>比赛设置</h2>
                        <div className={style.item}>
                            <span>进球提示</span>
                            <span>
                                <Switch
                                    checked={openTip}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    onChange={event => {
                                        setOpenTip(event.target.checked);
                                        localStorage.setItem(
                                            'openTip',
                                            event.target.checked ? 'open' : ''
                                        );
                                    }}
                                />
                            </span>
                        </div>
                        <div className={style.item}>
                            <span>进球声音</span>
                            <span>
                                <Switch
                                    checked={openSound}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    onChange={event => {
                                        setOpenSound(event.target.checked);
                                        localStorage.setItem(
                                            'openSound',
                                            event.target.checked ? 'open' : ''
                                        );
                                    }}
                                />
                            </span>
                        </div>
                        <div
                            className={style.item}
                            onClick={() => {
                                setShowSoundList('home');
                            }}
                        >
                            <span>主隊进球声音</span>
                            <span className={style.selector}>
                                {soundMap[homeSound]} <Image alt="arrow" src={RightIcon} />
                            </span>
                        </div>
                        <div
                            className={style.item}
                            onClick={() => {
                                setShowSoundList('away');
                            }}
                        >
                            <span>客隊进球声音</span>
                            <span className={style.selector}>
                                {soundMap[awaySound]} <Image alt="arrow" src={RightIcon} />
                            </span>
                        </div>
                    </div>
                    <SoundSelector
                        current={homeSound}
                        isOpen={showSoundList === 'home'}
                        label="home"
                        onClose={() => {
                            setShowSoundList('');
                        }}
                        onOpen={() => {
                            setShowSoundList('home');
                        }}
                        update={(newSound: string) => {
                            setHomeSound(newSound);
                            localStorage.setItem('homeSound', newSound);
                            void soundSourceList.current.source[newSound].play();
                        }}
                    />
                    <SoundSelector
                        current={awaySound}
                        isOpen={showSoundList === 'away'}
                        label="away"
                        onClose={() => {
                            setShowSoundList('');
                        }}
                        onOpen={() => {
                            setShowSoundList('away');
                        }}
                        update={(newSound: string) => {
                            setAwaySound(newSound);
                            localStorage.setItem('awaySound', newSound);
                            void soundSourceList.current.source[newSound].play();
                        }}
                    />
                </BottomDrawer>
            ) : null}
        </>
    );
}

export default Setting;
