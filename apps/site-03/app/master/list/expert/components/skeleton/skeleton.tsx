import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import style from './skeleton.module.scss';

function SkeletonLayout() {
    const data = [1, 2, 3, 4, 5];

    return (
        <div className={style.container}>
            {data.map(item => {
                return (
                    <Stack className={style.skeletonLayout} key={item} spacing={1}>
                        <div className={style.top}>
                            <div>
                                <Skeleton
                                    animation="wave"
                                    height={40}
                                    variant="circular"
                                    width={40}
                                >
                                    <Avatar />
                                </Skeleton>
                            </div>
                            <div className={style.title}>
                                <Skeleton
                                    animation="wave"
                                    height={18}
                                    sx={{ marginBottom: '8px' }}
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
                        <div>
                            <Skeleton
                                animation="wave"
                                height={18}
                                sx={{ marginLeft: '50px' }}
                                variant="rounded"
                                width="40%"
                            />
                        </div>
                        <Skeleton animation="wave" height={36} variant="rounded" width="100%" />
                    </Stack>
                );
            })}
        </div>
    );
}

export default SkeletonLayout;
