'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getFollowers, updateFollow, unFollow } from 'data-center';
import backLeftArrowImg from '../img/backLeftArrow.png';
import { useFocusMemberStore } from './myFocusStore';
import MasterItem from './components/masterItem/masterItem';
import style from './myFocus.module.scss';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';

interface FocusData {
    memberId: number;
    username: string;
    avatarPath: string;
    profile: string;
    fans: number;
    unlocked: number;
    hotStreak: number;
    ranking: number;
    followed: boolean;
}

function MyFocus() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const userInfo = useUserStore.use.userInfo();
    const focusMemberItem = useFocusMemberStore.use.focusMemberItem();
    const setFocusMemberItem = useFocusMemberStore.use.setFocusMemberItem();
    const [filteredMasterItems, setFilteredMasterItems] = useState<FocusData[]>(focusMemberItem);

    useEffect(() => {
        setFilteredMasterItems(focusMemberItem);
    }, [focusMemberItem]);

    // 我的關注列表先接上，但還缺三個欄位，暫時先不使用
    useEffect(() => {
        const getFollowersList = async () => {
            const res = await getFollowers({ memberId: userInfo.uid, isFans: false });
            if (!res.success) {
                console.error(res.error);
            }
            // console.log(res.data);
            // setFocusMemberItem(res.data);
        };

        void getFollowersList();
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

    const toggleFollow = async (uid: number, memberId: number, followed: boolean) => {
        const apiFunction = followed ? updateFollow : unFollow;
        const action = followed ? '关注成功' : '取消关注';
        const errorMessage = '发生错误';

        const res = await apiFunction({ followerId: uid, followedId: memberId });
        if (res.success) {
            setIsVisible(action, 'success');
            const updatedItems = focusMemberItem.map(item =>
                item.memberId === memberId ? { ...item, followed: !item.followed } : item
            );
            setFocusMemberItem(updatedItems);
        } else {
            setIsVisible(errorMessage, 'error');
        }
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
                {filteredMasterItems.map(item => (
                    <MasterItem
                        item={item}
                        key={item.memberId}
                        onFollowToggle={toggleFollow}
                        uid={userInfo.uid}
                    />
                ))}
            </div>
        </>
    );
}

export default MyFocus;
