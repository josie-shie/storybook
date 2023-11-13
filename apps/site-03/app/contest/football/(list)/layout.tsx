'use client';
import { useState, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import { Tab, Tabs } from 'ui';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import style from './layout.module.scss';
import FilterIcon from './img/filter.png';
import SettingIcon from './img/setting.png';
import Logo from './img/logo.png';
import Setting from './components/setting';
import BaseDatePicker from './components/baseDatePicker/baseDatePicker';
import HeaderFilter from '@/components/header/headerFilter';
import Footer from '@/components/footer/footer';

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function ContestListLayout({ children }: { children: ReactNode }) {
    const [showSetting, setShowSetting] = useState(false);

    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const pathname = usePathname();
    const router = useRouter();

    const resultDate = searchParams.get('resultsDate');
    const scheduleDate = searchParams.get('scheduleDate');

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleDate = (date: Date) => {
        const dateFormat = formatDate(date);
        if (status === 'result') {
            router.push(`?status=${status}&scheduleDate=${scheduleDate}&resultsDate=${dateFormat}`);
        }
        if (status === 'schedule') {
            router.push(`?status=${status}&scheduleDate=${dateFormat}&resultsDate=${resultDate}`);
        }
    };

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const tabList = [
        {
            label: '全部',
            to: '/contest/football',
            status: null
        },
        {
            label: '已開賽',
            to: '/contest/football?status=progress',
            status: 'progress'
        },
        {
            label: '未開賽',
            to: '/contest/football?status=notyet',
            status: 'notyet'
        },
        {
            label: '賽程',
            to: '/contest/football?status=schedule',
            status: 'schedule'
        },
        {
            label: '賽果',
            to: '/contest/football?status=result',
            status: 'result'
        }
    ];

    return (
        <div className="contestListLayout">
            <HeaderFilter logo={<Image alt="logo" height={16} src={Logo} />}>
                <div className={style.tool}>
                    <Image
                        alt="filter"
                        className={style.mr}
                        onClick={() => {
                            router.push(`${pathname}?${createQueryString('filter', 'open')}`);
                        }}
                        sizes="32"
                        src={FilterIcon}
                    />
                    <Image
                        alt="setting"
                        onClick={() => {
                            setShowSetting(true);
                        }}
                        sizes="32"
                        src={SettingIcon}
                    />
                </div>
            </HeaderFilter>
            <div className={style.main}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="spaceBetween"
                    styling="button"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                {status === 'schedule' && (
                                    <BaseDatePicker
                                        defaultDate={dayjs(scheduleDate).toDate()}
                                        direction="schedule"
                                        onDateChange={date => {
                                            handleDate(date);
                                        }}
                                    />
                                )}
                                {status === 'result' && (
                                    <BaseDatePicker
                                        defaultDate={dayjs(resultDate).toDate()}
                                        direction="result"
                                        onDateChange={date => {
                                            handleDate(date);
                                        }}
                                    />
                                )}
                                {item.status === status && children}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <Setting
                isOpen={showSetting}
                onClose={() => {
                    setShowSetting(false);
                }}
                onOpen={() => {
                    setShowSetting(true);
                }}
            />

            <Footer />
        </div>
    );
}

export default ContestListLayout;
