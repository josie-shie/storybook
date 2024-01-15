'use client';

import ArticleDetail from '../../../../articleDetail/[articleId]/articleDetail';

function Page({ params }: { params: { articleId } }) {
    return <ArticleDetail params={params} />;
}

export default Page;
