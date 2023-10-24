'use client';
import type { ReactNode } from 'react';
import style from './predict.module.scss';
import { Tabs } from '@/components/tabs/tabs';

function PredictLayout({ children }: { children: ReactNode }) {
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
