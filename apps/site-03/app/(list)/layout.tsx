'use client';
import { useState, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import { Slick } from 'ui';
import { useRouter, useSearchParams, usePathname, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import style from './layout.module.scss';
import FilterIcon from './img/filter.png';
import SettingIcon from './img/setting.png';
import Logo from './img/logo.png';
import Setting from './components/setting';
import HeaderFilter from '@/components/header/headerFilter';
import Footer from '@/components/footer/footer';

function InterceptingDetail({ modal }: { modal: ReactNode }) {
    const params = useParams();
    return (
        <AnimatePresence>
            {params.matchId ? (
                <motion.div
                    animate={{ transform: 'translateX(0)' }}
                    exit={{ transform: 'translateX(100%)' }}
                    initial={{ transform: 'translateX(100%)' }}
                    key="modalDetail"
                    style={{
                        background: '#fff',
                        width: '100%',
                        position: 'fixed',
                        top: 0,
                        zIndex: 10,
                        height: '100vh',
                        overflowY: 'auto'
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {' '}
                    <div className={style.modal}>{modal}</div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function ContestListLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
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
            href: '/',
            status: null
        },
        {
            label: '已开赛',
            href: '/?status=progress',
            status: 'progress'
        },
        {
            label: '赛程',
            href: '/?status=schedule',
            status: 'schedule'
        },
        {
            label: '赛果',
            href: '/?status=result',
            status: 'result'
        }
    ];

    const slideActive = status ? tabList.findIndex(tab => tab.status === status) : 0;

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
                    slideActive={slideActive}
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
            <InterceptingDetail modal={modal} />
        </div>
    );
}

export default ContestListLayout;
