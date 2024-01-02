'use client';
import { useState, type ReactNode, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Tabs } from '@/components/tabs/tabs';
import headBg from './img/detailbg.png';
import backLeftArrowImg from './img/backLeftArrow.png';
import teamLogo from './img/teamLogo.png';
import down from './img/down.png';
import style from './layout.module.scss';

interface DropdownOption {
    label: string;
    value: string | number;
}

interface DropdownProps {
    value: string | number;
    options: DropdownOption[];
    onChange: (value: string | number) => void;
}

function Dropdown({ value, options, onChange }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLButtonElement | null>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = (optionValue: string | number) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <button className={style.dropdown} onClick={toggleDropdown} ref={dropdownRef} type="button">
            {options.find(el => el.value === value)?.label}
            <Image alt="" src={down} width={24} />
            <div className={`${style.select} ${isOpen ? style.open : ''}`}>
                {options.map((option, idx) => (
                    <div
                        className={style.option}
                        key={idx}
                        onClick={() => {
                            handleOptionClick(option.value);
                        }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </button>
    );
}

function DetailLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const params = useParams();
    const matchId = params.matchId as string;
    const [period, setPeriod] = useState(36);

    const selectOptions = [
        { label: '第36轮', value: 36 },
        { label: '第37轮', value: 37 },
        { label: '第38轮', value: 38 }
    ];

    const handlePeriodChange = (value: number) => {
        setPeriod(value);
    };

    return (
        <div className={style.layout}>
            <div className={style.header} style={{ backgroundImage: `url(${headBg.src})` }}>
                <Image
                    alt=""
                    className={style.backIcon}
                    height={24}
                    onClick={() => {
                        router.back();
                    }}
                    src={backLeftArrowImg}
                    width={24}
                />
                <div className={style.info}>
                    <section>
                        <Image alt="" src={teamLogo} width={64} />
                        斯洛文尼亚
                    </section>
                    <Dropdown
                        onChange={handlePeriodChange}
                        options={selectOptions}
                        value={period}
                    />
                </div>
            </div>
            <div className={style.tabsContainer}>
                <Tabs
                    labels={['积分', '赛程', '让分', '總進球', '射手榜']}
                    paths={[
                        `/analytics/league/${matchId}`,
                        `/analytics/league/${matchId}/schedule`,
                        `/analytics/league/${matchId}/handicap`,
                        `/analytics/league/${matchId}/totalGoals`,
                        `/analytics/league/${matchId}/topScorers`
                    ]}
                />
            </div>
            {children}
        </div>
    );
}

export default DetailLayout;
