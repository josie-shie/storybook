import type { Metadata } from 'next';
import ArticleDetail from './articleDetail';

export const metadata: Metadata = {
    title: '专家预测'
};

function Page() {
    return <ArticleDetail />;
}

export default Page;
