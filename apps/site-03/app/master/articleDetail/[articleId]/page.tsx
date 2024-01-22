import type { Metadata } from 'next';
import ArticleDetail from './articleDetail';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
};

function Page({ params }: { params: { articleId: string } }) {
    return <ArticleDetail params={params} />;
}

export default Page;
