'use client';
import type { Metadata } from 'next';
import Info from './info';
import ArticleContent from './articleContent';
import Header from '@/components/header/headerTitle';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterDetail() {
    const headerProps = {
        title: '专家预测',
        total: 999999
    };
    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            <Info />
            <ArticleContent />
        </>
    );
}

export default MasterDetail;
