import Image from 'next/image';
import style from './article.module.scss';
import { useArticleStore } from './articleStore';

function ArticleContent() {
    const article = useArticleStore.use.article();

    return (
        <div className={style.articleContent}>
            {article ? (
                <>
                    <div className={style.publishTime}>
                        <span className={style.time}>{article.time} 发表</span>
                    </div>
                    <article className={style.articleDetail}>
                        <h3 className={style.articleTitle}>{article.title}</h3>
                        {article.content.map(content => {
                            if (content.type === 'image') {
                                return (
                                    <Image
                                        alt=""
                                        className={style.contentImage}
                                        key={content.id}
                                        src={content.data}
                                    />
                                );
                            }

                            return (
                                <section className={style.contentText} key={content.id}>
                                    {content.data}
                                </section>
                            );
                        })}
                    </article>
                    <div className={style.bottomAlert}>已滑到底啰</div>
                </>
            ) : null}
        </div>
    );
}

export default ArticleContent;
