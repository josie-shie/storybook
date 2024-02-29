'use client';
import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
import Rule from '../components/rule/rule';
import style from './layout.module.scss';
import AnimationBanner from './components/animationBanner/animationBanner';

function QueryFormLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.queryFormLayout}>
            <Header back={false} title="数据分析" />
            <Rule />
            <AnimationBanner />
            {children}
            <Footer />
        </div>
    );
}

export default QueryFormLayout;
