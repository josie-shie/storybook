'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import style from './predict.module.scss';
import { Tabs } from '@/components/tabs/tabs';

function PredictLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isMasterListRoute = pathname.includes('masterList');
    const isPredictMatchIdRoute = /\/recommend\/predict\/\d+/.test(pathname);

    if (isMasterListRoute || isPredictMatchIdRoute) {
        return <>{children}</>;
    }

    return (
        <div className={style.predict}>
            <Tabs
                labels={['文章', '专家', '赛事筛选']}
                paths={[
                    '/recommend/predict',
                    '/recommend/predict/master',
                    '/recommend/predict/filter'
                ]}
                styling="button"
            />
            {children}
        </div>
    );
}

export default PredictLayout;
