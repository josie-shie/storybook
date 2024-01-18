'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
import style from '@/app/master/list/layout.module.scss';
import ArticleDetail from '@/app/master/articleDetail/[articleId]/articleDetail';

function Layout({ children, params }: { children: ReactNode; params: { articleId: string } }) {
    return (
        <div className={style.articleLayout}>
            <Header title="专家预测文章" />
            <ArticleDetail params={params} />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
