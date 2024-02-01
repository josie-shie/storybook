'use client';
import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import style from './layout.module.scss';
import AnimationBanner from './components/animationBanner/animationBanner';
import Footer from '@/components/footer/footer';

function QueryFormLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.queryFormLayout}>
            <Header back={false} title="智能分析" />
            <AnimationBanner />
            {children}
            <Footer />
        </div>
    );
}

export default QueryFormLayout;
