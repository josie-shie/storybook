import Loading from '@/components/loading/loading';
import style from './layout.module.scss';

function LoadingProcess() {
    return (
        <div className={style.loading}>
            <Loading />
        </div>
    );
}

export default LoadingProcess;
