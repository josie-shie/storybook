'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getFollowers, updateFollow, unFollow } from 'data-center';
import type { GetFollowersResponse } from 'data-center';
import { Skeleton } from '@mui/material';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';
import NoData from '@/components/baseNoData/noData';
import backLeftArrowImg from '../img/backLeftArrow.png';
import { useFocusMemberStore } from './myFocusStore';
import MasterItem from './components/masterItem/masterItem';
import style from './myFocus.module.scss';

function MyFocusSkeleton() {
    return (
        <>
            {Array.from({ length: 7 }).map((_, idx) => (
                <div className={style.skeletonBox} key={`${idx.toString()}`}>
                    <div className={style.left}>
                        <Skeleton animation="wave" height={48} variant="circular" width={46} />
                        <div className={style.center}>
                            <Skeleton animation="wave" height={24} sx={{ mt: '4px' }} width={70} />
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <p>粉丝: 0</p>
                                <p>解锁: 0</p>
                            </div>
                        </div>
                    </div>
                    <Skeleton
                        animation="wave"
                        height={32}
                        sx={{ mt: '8px', borderRadius: '16px' }}
                        variant="rounded"
                        width={68}
                    />
                </div>
            ))}
        </>
    );
}

function MyFocus() {
    const router = useRouter();
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const userInfo = useUserStore.use.userInfo();
    const focusMemberItem = useFocusMemberStore.use.focusMemberItem();
    const setFocusMemberItem = useFocusMemberStore.use.setFocusMemberItem();
    const [filteredMasterItems, setFilteredMasterItems] =
        useState<GetFollowersResponse>(focusMemberItem);
    const [isLoading, setIsLoading] = useState(true);

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(debounceTimer.current);
        setSearchTerm(event.target.value);
        debounceTimer.current = setTimeout(() => {
            const filteredItems = focusMemberItem.filter(item =>
                item.username.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredMasterItems(filteredItems);
        }, 500);
    };

    const toggleFollow = async (uid: number, memberId: number, isFollowed: boolean) => {
        const apiFunction = isFollowed ? updateFollow : unFollow;
        const action = isFollowed ? '关注成功' : '取消关注';
        const errorMessage = '发生错误';

        const res = await apiFunction({ followerId: uid, followedId: memberId });
        if (res.success) {
            setIsVisible(action, 'success');
            const updatedItems = focusMemberItem.map(item =>
                item.memberId === memberId ? { ...item, isFollowed: !item.isFollowed } : item
            );
            setFocusMemberItem(updatedItems);
        } else {
            setIsVisible(errorMessage, 'error');
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <MyFocusSkeleton />;
        }

        if (filteredMasterItems.length > 0) {
            return (
                <>
                    {filteredMasterItems.map(item => (
                        <MasterItem
                            item={item}
                            key={item.memberId}
                            onFollowToggle={toggleFollow}
                            uid={userInfo.uid}
                        />
                    ))}
                </>
            );
        }

        if (searchTerm) {
            return <NoData text="此條件查无资料" textSecond="请重新修改搜寻条件" />;
        }

        return <NoData text="暂无资料" />;
    };

    useEffect(() => {
        setFilteredMasterItems(focusMemberItem);
    }, [focusMemberItem]);

    useEffect(() => {
        const getFollowersList = async () => {
            setIsLoading(true);
            const res = await getFollowers({ memberId: userInfo.uid, isFans: false });
            if (res.success) {
                setFocusMemberItem(res.data);
            }
            setIsLoading(false);
        };

        if (userInfo.uid) {
            void getFollowersList();
        }
    }, [userInfo]);

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.push('/userInfo');
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的关注</div>
                    </div>
                </div>
            </div>

            <div className={style.myFocus}>
                <div className={style.search}>
                    <input
                        onChange={onSearch}
                        placeholder="请输入用户名"
                        type="text"
                        value={searchTerm}
                    />
                </div>
                {renderContent()}
            </div>
        </>
    );
}

export default MyFocus;
