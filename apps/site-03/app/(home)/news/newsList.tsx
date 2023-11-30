import Image from 'next/image';
import Link from 'next/link';
import { timestampToString } from 'lib';
import style from './news.module.scss';
import { useNewsStore } from './newsStore';

interface News {
    title: string;
    publishedAt: number;
    id: number;
    imagePath: string;
}

interface NewsProps {
    newsInfo: News;
}

function NewsCard({ newsInfo }: NewsProps) {
    return (
        <Link href={`/news/${newsInfo.id}`}>
            <div className={style.newsCard}>
                <div className={style.image}>
                    <Image
                        alt=""
                        className={style.newsImage}
                        height={79}
                        src={newsInfo.imagePath}
                        width={120}
                    />
                </div>
                <div className={style.newsDetail}>
                    <div className={style.newsTitle}>{newsInfo.title}</div>
                    {newsInfo.publishedAt ? (
                        <div className={style.newsTime}>
                            {timestampToString(newsInfo.publishedAt, 'YYYY-M-DD')} 發佈
                        </div>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}

function NewsList() {
    const newsList = useNewsStore.use.newsList();
    return (
        <div className={style.newsList}>
            {newsList.map(news => {
                return <NewsCard key={news.id} newsInfo={news} />;
            })}
        </div>
    );
}

export default NewsList;
