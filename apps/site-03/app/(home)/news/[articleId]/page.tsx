import { getLeisuNewsContent } from 'data-center';
import Article from './article';

async function Page({ params }: { params: { articleId: number } }) {
    const article = await getLeisuNewsContent({ id: params.articleId });

    if (!article.success) {
        return new Error();
    }

    return <Article article={article.data} />;
}

export default Page;
