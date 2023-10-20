import Image from 'next/image';
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
        <div className={style.newsCard}>
            <div className={style.image}>
                <Image alt="" height={79} src={newsInfo.image} width={120} />
            </div>
            <div className={style.newsDetail}>
                <div className={style.newsTitle}>{newsInfo.title}</div>
                <div className={style.newsTime}>{newsInfo.time}發佈</div>
            </div>
        </div>
    );
}

function NewsList() {
    const newsList = useNewsStore.use.newsList();
    return (
        <div className={style.newsList}>
            {newsList.map((news, index) => {
                return <NewsCard key={index} newsInfo={news} />;
            })}
        </div>
    );
}

export default NewsList;
