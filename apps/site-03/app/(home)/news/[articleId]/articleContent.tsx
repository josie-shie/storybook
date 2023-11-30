import Image from 'next/image';
import { timestampToString } from 'lib';
import style from './article.module.scss';
import { useArticleStore } from './articleStore';
import shareIcon from './img/share.png';
import { useNotificationStore } from '@/app/notificationStore';

function ArticleContent() {
    const article = useArticleStore.use.article();
    const setNotificationVisible = useNotificationStore.use.setIsVisible();

    const copyToClip = async () => {
        try {
            await navigator.clipboard.writeText(`${article.title}:  ${window.location.href}`);
            setNotificationVisible('複製成功', 'success');
        } catch (error) {
            // eslint-disable-next-line no-console -- console error
            console.dir(error);
            setNotificationVisible('複製失敗', 'error');
        }
    };

    return (
        <div className={style.articleContent}>
            <div className={style.publishDetail}>
                {article.publishedAt ? (
                    <p className={style.time}>
                        {timestampToString(article.publishedAt, 'YYYY-M-DD HH:mm')} 发表
                    </p>
                ) : null}
                <Image alt="" height={24} onClick={copyToClip} src={shareIcon} width={24} />
            </div>
            <article className={style.articleDetail}>
                <h3 className={style.articleTitle}>{article.title}</h3>
                {article.imagePath ? (
                    <Image
                        alt=""
                        height={238}
                        src={article.imagePath}
                        style={{ objectFit: 'contain' }}
                        width={342}
                    />
                ) : null}
                <section className={style.contentText}>{article.content}</section>
            </article>
            <div className={style.bottomAlert}>已滑到底啰</div>
        </div>
    );
}

export default ArticleContent;
