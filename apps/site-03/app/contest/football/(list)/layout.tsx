'use client';
import { useState, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import { Slick } from 'ui';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import style from './layout.module.scss';
import FilterIcon from './img/filter.png';
import SettingIcon from './img/setting.png';
import Logo from './img/logo.png';
import Setting from './components/setting';
import HeaderFilter from '@/components/header/headerFilter';
import Footer from '@/components/footer/footer';

function ContestListLayout({ children }: { children: ReactNode }) {
    const [showSetting, setShowSetting] = useState(false);

    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const isFliterOpen = searchParams.get('filter');
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const tabList = [
        {
            label: '全部',
            href: '/contest/football',
            status: null
        },
        {
            label: '已开赛',
            href: '/contest/football?status=progress',
            status: 'progress'
        },
        {
            label: '赛程',
            href: '/contest/football?status=schedule',
            status: 'schedule'
        },
        {
            label: '赛果',
            href: '/contest/football?status=result',
            status: 'result'
        }
    ];

    const initialSlide = status ? tabList.findIndex(tab => tab.status === status) : 0;

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
                <Slick
                    initialSlide={initialSlide}
                    styling="button"
                    tabs={tabList}
                    touchMove={!isFliterOpen}
                >
                    {tabList.map(item => {
                        return <div key={item.label}>{item.status === status && children}</div>;
                    })}
                </Slick>
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
