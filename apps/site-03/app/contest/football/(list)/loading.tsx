import style from './layout.module.scss';
import Loading from '@/components/loading/loading';

function LoadingProcess() {
    return (
        <div className={style.loading}>
            <Loading />
        </div>
    );
}

export default LoadingProcess;
