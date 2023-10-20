import style from './news.module.scss';

function NewsMarquee() {
    return (
        <div className={style.marquee}>
            <div className={style.text}>#最熱門的比賽新聞跑馬燈跑馬燈跑馬燈跑馬</div>
        </div>
    );
}

export default NewsMarquee;
