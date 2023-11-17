'use client';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './layout.module.scss';

function MyAnalysisLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    // const pathname = usePathname();
    // const isBigDataDetail = pathname.includes('resultDetail');

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    const tabList = [
        {
            label: '解锁记录',
            to: '/userInfo/myAnalysis?status=unlock'
        },
        {
            label: '我的分析',
            to: '/userInfo/myAnalysis?status=myanalysis'
        }
    ];

    // if (isBigDataDetail) {
    //     return <>{children}</>;
    // }

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.back();
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的分析</div>
                        <button className={style.publish} type="button">
                            发布文章
                        </button>
                    </div>
                </div>
            </div>

            <div className={style.main}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="center"
                    styling="underline"
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
        </>
    );
}

export default MyAnalysisLayout;
