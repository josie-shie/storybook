import style from './pageEndText.module.scss';

function PageEndText({ paddingBottom, paddingTop }: { paddingBottom: number; paddingTop: number }) {
    return (
        <div className={style.pageEndText} style={{ paddingBottom, paddingTop }}>
            已滑到底啰
        </div>
    );
}

export default PageEndText;
