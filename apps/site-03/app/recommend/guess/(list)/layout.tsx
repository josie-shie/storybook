'use client';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Logo from './img/logo.png';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';

function ContestLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Image alt="logo" src={Logo} width={66} />,
        total: 999999
    };

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <div className={style.guess}>
                <div className={style.layoutTab}>
                    <Tabs
                        labels={['竟猜', '专家预测', '大数据分析']}
                        paths={[
                            '/recommend/guess',
                            '/recommend/predict',
                            '/recommend/bigData?status=analysis'
                        ]}
                    />
                </div>
                <div className={style.childrenTab}>
                    <Tabs
                        labels={['賽事', '週榜', '月榜', '季榜', '連紅榜']}
                        paths={[
                            '/recommend/guess',
                            '/recommend/guess/rank?status=week',
                            '/recommend/guess/rank?status=month',
                            '/recommend/guess/rank?status=season',
                            '/recommend/guess/masterRank'
                        ]}
                        styling="button"
                    />
                </div>
                {children}
            </div>
        </>
    );
}

export default ContestLayout;
