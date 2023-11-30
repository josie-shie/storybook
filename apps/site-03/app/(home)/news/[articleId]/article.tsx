'use client';
import type { GetLeisuNewsContentResponse } from 'data-center';
import ArticleContent from './articleContent';
import style from './article.module.scss';
import { creatArticleStore } from './articleStore';

function Article({ article }: { article: GetLeisuNewsContentResponse }) {
    creatArticleStore({
        article
    });

    return (
        <div className={style.article}>
            <ArticleContent />
        </div>
    );
}

export default Article;
