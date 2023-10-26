'use client';
import type { Metadata } from 'next';
import Info from './info';
import InfoTabs from './infoTabs';
import Header from '@/components/header/headerTitle';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterAvatar() {
    const headerProps = {
        title: '专家预测',
        total: 999999
    };
    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            <Info />
            <InfoTabs />
        </>
    );
}

export default MasterAvatar;
