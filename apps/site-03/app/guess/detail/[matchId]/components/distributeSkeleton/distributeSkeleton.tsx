import { ProgressBar } from 'ui';
import { Skeleton } from '@mui/material';
import style from './distributeSkeleton.module.scss';

function DistributeSkeleton() {
    return (
        <div className={style.DistributeSkeleton}>
            <div className={style.skeleton}>
                <Skeleton height={18} variant="rounded" width={32} />
                <span>%</span>
            </div>
            <div className={style.progress}>
                <div className={style.play}>
                    <span className={style.ing}>-</span>
                </div>
                <ProgressBar background="#F3F3F3" fill="#D9D9D9" height={10} radius value={50} />
            </div>
            <div className={style.skeleton}>
                <Skeleton height={18} variant="rounded" width={32} />
                <span>%</span>
            </div>
        </div>
    );
}

export default DistributeSkeleton;
