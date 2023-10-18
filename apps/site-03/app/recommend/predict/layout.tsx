'use client';
import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs } from '../../components/tabs/tabs';
import style from './predict.module.scss';

function PredictLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const paramName = usePathname();

    useEffect(() => {
        if (paramName === '/recommend/predict') {
            router.push('/recommend/predict/article');
        }
    }, [router, paramName]);

    return (
        <div className={style.predict}>
            <Tabs
                labels={['文章', '专家', '赛事筛选']}
                paths={[
                    '/recommend/predict/article',
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
