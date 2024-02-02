import style from './footer.module.scss';
import BackTopIcon from './img/backTop.svg';

function Footer({ displayBack = true }: { displayBack?: boolean }) {
    const backTop = () => {
        window.scroll(0, 0);
    };

    return (
        <div className={style.footer}>
            <div className={style.text}>已经滑到底啰</div>
            {displayBack ? <BackTopIcon className={style.back} onClick={backTop} /> : null}
        </div>
    );
}

export default Footer;
