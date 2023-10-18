'use client';
import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs } from '../../components/tabs/tabs';
import style from './guess.module.scss';

function GuessLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const paramName = usePathname();

    useEffect(() => {
        if (paramName === '/recommend/guess') {
            router.push('/recommend/guess/contest');
        }
    }, [router, paramName]);

    return (
        <div className={style.guess}>
            <Tabs
                labels={['賽事競猜', '週榜', '月榜', '季榜', '連紅榜']}
                paths={[
                    '/recommend/guess/contest',
                    '/recommend/guess/rank',
                    '/recommend/guess/rank',
                    '/recommend/guess/rank',
                    '/recommend/guess/masterRank'
                ]}
                styling="button"
            />
            {children}
        </div>
    );
}

export default GuessLayout;
