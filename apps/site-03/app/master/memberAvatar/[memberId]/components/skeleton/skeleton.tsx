import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import style from './skeleton.module.scss';

function SkeletonLayout() {
    return (
        <div className={style.container}>
            <Stack className={style.skeletonLayout} spacing={1}>
                <div className={style.top}>
                    <div>
                        <Skeleton animation="wave" height={54} variant="circular" width={54}>
                            <Avatar />
                        </Skeleton>
                    </div>
                    <div className={style.title}>
                        <Skeleton
                            animation="wave"
                            height={18}
                            sx={{ marginBottom: '6px' }}
                            variant="rounded"
                            width="100%"
                        />
                        <Skeleton
                            animation="wave"
                            height={18}
                            sx={{ marginBottom: '6px' }}
                            variant="rounded"
                            width="100%"
                        />
                        <Skeleton animation="wave" height={18} variant="rounded" width="100%" />
                    </div>
                </div>
                <Skeleton
                    animation="wave"
                    height={50}
                    sx={{ marginBottom: '1rem' }}
                    variant="rounded"
                    width="100%"
                />
            </Stack>
        </div>
    );
}

export default SkeletonLayout;
