import Image from 'next/image';
import Article from './article/article';
import Banner from './img/banner.png';
import Filter from './img/filter.png';
import style from './page.module.scss';
import WeekButton from './components/weekButton/weekButton';

function Page() {
    return (
        <>
            <Image alt="" className={style.banner} src={Banner} />
            <div className={style.filterButton}>
                赛事筛选
                <Image alt="" src={Filter} />
            </div>
            <div className={style.button}>
                <WeekButton />
            </div>
            <div className="recommendPredict">
                <Article />
            </div>
        </>
    );
}

export default Page;
