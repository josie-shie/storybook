'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getFollowers, updateFollow, unFollow } from 'data-center';
import type { GetFollowersResponse } from 'data-center';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';
import NoData from '@/components/baseNoData/noData';
import Loading from '@/components/loading/loading';
import backLeftArrowImg from '../img/backLeftArrow.png';
import { useFocusMemberStore } from './myFocusStore';
import MasterItem from './components/masterItem/masterItem';
import style from './myFocus.module.scss';

function MyFocus() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const userInfo = useUserStore.use.userInfo();
    const focusMemberItem = useFocusMemberStore.use.focusMemberItem();
    const setFocusMemberItem = useFocusMemberStore.use.setFocusMemberItem();
    const [filteredMasterItems, setFilteredMasterItems] =
        useState<GetFollowersResponse>(focusMemberItem);
    const [isLoading, setIsLoading] = useState(true);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const filteredItems = focusMemberItem.filter(item =>
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMasterItems(filteredItems);
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
            return <Loading />;
        }

        if (filteredMasterItems.length > 0) {
            return (
                <div className={style.filteredMasterItems}>
                    {filteredMasterItems.map(item => (
                        <MasterItem
                            item={item}
                            key={item.memberId}
                            onFollowToggle={toggleFollow}
                            uid={userInfo.uid}
                        />
                    ))}
                </div>
            );
        }

        return <NoData />;
    };

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
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder="请输入用户名"
                        type="text"
                        value={searchTerm}
                    />
                    <button onClick={handleSearch} type="button">
                        搜索
                    </button>
                </div>
                {renderContent()}
            </div>
        </>
    );
}

export default MyFocus;
