import { Skeleton } from '@mui/material';
import style from '../components/historyCard/historyCard.module.scss';

function TeamDisplay() {
    return (
        <div className={style.team}>
            <div className={style.teamName} style={{ gap: '4px' }}>
                <Skeleton height={20} variant="circular" width={20} />
                <Skeleton height={20} variant="rounded" width={56} />
            </div>
            <span>0</span>
        </div>
    );
}

function AiHistoryLoader() {
    const list = Array.from({ length: 8 });

    return (
        <>
            {list.map((_, idx) => (
                <div className={style.historyRow} key={idx}>
                    <div className={style.top}>
                        <div style={{ display: 'flex', gap: '25px' }}>
                            <Skeleton sx={{ fontSize: '12px' }} variant="text" width={30} />
                            <Skeleton sx={{ fontSize: '12px' }} variant="text" width={30} />
                        </div>
                        <span>0人解鎖</span>
                    </div>
                    <div className={style.bottom}>
                        <div className={style.teamBox}>
                            <TeamDisplay />
                            <TeamDisplay />
                        </div>
                        <div className={style.icon}>
                            <Skeleton height={24} variant="rounded" width={62} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default AiHistoryLoader;
