import type { Metadata } from 'next';
import ArticleDetail from './articleDetail';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: '专家预测'
};

function Page({ params }: { params: { articleId: string } }) {
    return (
        <>
            <ArticleDetail params={params} />
            <Footer />
        </>
    );
}

export default Page;
