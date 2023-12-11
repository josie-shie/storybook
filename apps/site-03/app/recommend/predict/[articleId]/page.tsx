import type { Metadata } from 'next';
import { getPostDetail } from 'data-center';
import ArticleDetail from './articleDetail';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: '专家预测'
};

async function Page({ params }: { params: { articleId: string } }) {
    const articleDetail = await getPostDetail({ postId: Number(params.articleId) });
    if (!articleDetail.success) {
        return new Error();
    }

    return (
        <>
            <ArticleDetail articleDetail={articleDetail.data} params={params} />
            <Footer />
        </>
    );
}

export default Page;
