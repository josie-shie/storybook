'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from './img/logo.png';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function PredictLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Image alt="logo" src={Logo} width={66} />,
        total: 999999
    };
    const pathname = usePathname();
    const isMasterListRoute = pathname.includes('masterList');
    const isMasterAvatarRoute = pathname.includes('masterAvatar');
    const isPredictMatchIdRoute = /\/recommend\/predict\/\d+/.test(pathname);

    if (isMasterListRoute || isPredictMatchIdRoute || isMasterAvatarRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <div className={style.predict}>
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
                        labels={['文章', '专家', '赛事筛选']}
                        paths={[
                            '/recommend/predict',
                            '/recommend/predict/master',
                            '/recommend/predict/filter'
                        ]}
                        styling="button"
                    />
                </div>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default PredictLayout;
