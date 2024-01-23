import { ProgressBar } from 'ui';
import style from './distributeSkeleton.module.scss';

function DistributeSkeleton() {
    return (
        <div className={style.DistributeSkeleton}>
            <div className={style.skeleton}>
                <span />
                <span>%</span>
            </div>
            <div className={style.progress}>
                <ProgressBar background="#F3F3F3" fill="#D9D9D9" height={10} radius value={50} />
            </div>
            <div className={style.skeleton}>
                <span />
                <span>%</span>
            </div>
        </div>
    );
}

export default DistributeSkeleton;
