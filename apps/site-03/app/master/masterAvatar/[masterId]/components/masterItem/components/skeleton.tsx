import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import style from './skeleton.module.scss';

function SkeletonLayout() {
    const data = [1, 2, 3, 4];

    return (
        <div className={style.container}>
            {data.map(item => {
                return (
                    <Stack className={style.skeletonLayout} key={item} spacing={1}>
                        <div className={style.top}>
                            <div>
                                <Skeleton
                                    animation="wave"
                                    height={54}
                                    variant="circular"
                                    width={54}
                                >
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
                                <Skeleton
                                    animation="wave"
                                    height={18}
                                    variant="rounded"
                                    width="100%"
                                />
                            </div>
                        </div>
                        <Skeleton animation="wave" height={64} variant="rounded" width="100%" />
                    </Stack>
                );
            })}
        </div>
    );
}

export default SkeletonLayout;
