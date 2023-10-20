import style from './page.module.scss';

function Page() {
    return (
        <div className={style.contest}>
            <div className={style.control}>
                <div className={style.right}>
                    <div className={style.rule}>
                        <span>規則</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
