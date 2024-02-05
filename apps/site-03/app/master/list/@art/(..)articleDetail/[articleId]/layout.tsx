'use client';

import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
import style from '@/app/master/list/layout.module.scss';
import ArticleDetail from '@/app/master/articleDetail/[articleId]/articleDetail';
import { useLockBodyScroll } from '@/hooks/lockScroll';

function Layout({ params }: { params: { articleId: string } }) {
    useLockBodyScroll();

    return (
        <div className={style.articleLayout}>
            <Header title="专家预测文章" />
            <ArticleDetail params={params} />
            <Footer />
        </div>
    );
}

export default Layout;
