'use client';
import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import style from './layout.module.scss';
import AnimationBanner from './components/animationBanner/animationBanner';

function QueryFormLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.queryFormLayout}>
            <Header back={false} title="智能分析" />
            <AnimationBanner />
            {children}
        </div>
    );
}

export default QueryFormLayout;
