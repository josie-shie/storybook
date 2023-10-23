'use client';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { Tab, Tabs } from 'ui';
import style from './layout.module.scss';
import FilterIcon from './img/filter.png';
import SettingIcon from './img/setting.png';
import Logo from './img/logo.png';
// import { Tabs } from '@/components/tabs/tabs';
import HeaderFilter from '@/components/header/headerFilter';
import Footer from '@/components/footer/footer';

function ContestListLayout({ children }: { children: ReactNode }) {
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    const tabList = [
        {
            label: '全部',
            to: '/contest/football'
        },
        {
            label: '已開賽',
            to: '/contest/football?status=progress'
        },
        {
            label: '未開賽',
            to: '/contest/football?status=notyet'
        },
        {
            label: '賽程',
            to: '/contest/football?status=scheule'
        },
        {
            label: '賽果',
            to: '/contest/football?status=result'
        }
    ];
    return (
        <div className="contestListLayout">
            <HeaderFilter logo={<Image alt="logo" height={16} src={Logo} />}>
                <div className={style.tool}>
                    <Image alt="filter" className={style.mr} sizes="32" src={FilterIcon} />
                    <Image alt="setting" sizes="32" src={SettingIcon} />
                </div>
            </HeaderFilter>
            <div className={style.main}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="center"
                    styling="button"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                {children}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <Footer />
        </div>
    );
}

export default ContestListLayout;
