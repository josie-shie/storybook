import Image from 'next/image';
import Link from 'next/link';
import style from './news.module.scss';
import { useNewsStore } from './newsStore';

interface News {
    id: number;
    image: string;
    title: string;
    time: string;
}

interface NewsProps {
    newsInfo: News;
}

function NewsCard({ newsInfo }: NewsProps) {
    return (
        <Link href={`/news/${newsInfo.id}`}>
            <div className={style.newsCard}>
                <Image
                    alt=""
                    className={style.newsImage}
                    height={79}
                    src={newsInfo.image}
                    width={120}
                />
                <div className={style.newsDetail}>
                    <div className={style.newsTitle}>{newsInfo.title}</div>
                    <div className={style.newsTime}>{newsInfo.time}發佈</div>
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
