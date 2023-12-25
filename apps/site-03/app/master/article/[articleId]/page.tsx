import type { Metadata } from 'next';
import Footer from '@/components/footer/footer';
import ArticleDetail from './articleDetail';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
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
