import Skeleton from '@mui/material/Skeleton';
import style from './tableSkeleton.module.scss';

function TableSkeleton({ rowNumber }: { rowNumber: number }) {
    return (
        <span className={style.tableSkeleton}>
            {Array.from({ length: rowNumber }).map((_, idx) => (
                <div className="tr" key={`skeleton_${idx.toString()}`}>
                    <div className="td">
                        <Skeleton height={25} variant="rectangular" width="90%" />
                    </div>
                </div>
            ))}
        </span>
    );
}

export default TableSkeleton;
