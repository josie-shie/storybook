import Image from 'next/image';
import style from './article.module.scss';
import { useArticleStore } from './articleStore';
import shareIcon from './img/share.png';
import Notification from '@/components/notification/notification';

type NotificationType = 'success' | 'error';

function ArticleContent() {
    const article = useArticleStore.use.article();
    const notification = useArticleStore.use.notification();
    const setNotification = useArticleStore.use.setNotification();

    const copyToClip = async () => {
        try {
            await navigator.clipboard.writeText(`${article?.title}:  ${window.location.href}`);
            handleOpenNotification('success', true, '複製成功');
        } catch (error) {
            // eslint-disable-next-line no-console -- console error
            console.dir(error);
            handleOpenNotification('error', true, '複製失敗');
        }
    };

    const handleCloseNotification = () => {
        setNotification({ type: 'success', visible: false, message: '' });
    };

    const handleOpenNotification = (type: NotificationType, visible: boolean, message: string) => {
        setNotification({ type, visible, message });
    };

    return (
        <div className={style.articleContent}>
            {article ? (
                <>
                    <div className={style.publishDetail}>
                        <p className={style.time}>{article.time} 发表</p>
                        <Image alt="" height={24} onClick={copyToClip} src={shareIcon} width={24} />
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

            <Notification
                handleClose={handleCloseNotification}
                isVisible={notification.visible}
                message={notification.message}
                type={notification.type}
            />
        </div>
    );
}

export default ArticleContent;
