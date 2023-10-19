import style from './page.module.scss';

function Page() {
    return (
        <div className={style.rank}>
            <div>週榜、月榜、季榜、連紅榜，使用 query 分這 4 個</div>
        </div>
    );
}

export default Page;
