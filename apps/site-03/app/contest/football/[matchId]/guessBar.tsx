import style from './guessBar.module.scss';

function GuessBar() {
    return (
        <div className={style.guessBar}>
            <div className={style.box}>
                <div className={style.team}>主</div>
                <div className={style.middle}>
                    <p className={style.lable}>半/ㄧ</p>
                    <div className={style.lineBar} />
                </div>
                <div className={style.team}>客</div>
            </div>
            <div className={style.box}>
                <div className={style.team}>主</div>
                <div className={style.middle}>
                    <p className={style.lable}>2/2.5</p>
                    <div className={style.lineBar} />
                </div>
                <div className={style.team}>客</div>
            </div>
        </div>
    );
}

export default GuessBar;
