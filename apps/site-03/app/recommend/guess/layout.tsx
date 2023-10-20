'use client';
import type { ReactNode } from 'react';
import style from './guess.module.scss';
import { Tabs } from '@/components/tabs/tabs';

function GuessLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.guess}>
            <Tabs
                labels={['賽事競猜', '週榜', '月榜', '季榜', '連紅榜']}
                paths={[
                    '/recommend/guess',
                    '/recommend/guess/rank?status=week',
                    '/recommend/guess/rank?status=month',
                    '/recommend/guess/rank?status=season',
                    '/recommend/guess/masterRank'
                ]}
                styling="button"
            />
            {children}
        </div>
    );
}

export default GuessLayout;
