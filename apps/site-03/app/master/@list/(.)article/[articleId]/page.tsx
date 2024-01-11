'use client';

import Footer from '@/components/footer/footer';
import ArticleDetail from '../../../article/[articleId]/articleDetail';

function Page({ params }: { params: { articleId } }) {
    return (
        <>
            <ArticleDetail params={params} />
            <Footer />
        </>
    );
}

export default Page;
