'use client';
import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import style from './info.module.scss';
import { getMentorList, type GetMentor } from 'data-center';
import { useUserStore } from '@/app/userStore';
import { unFollow, updateFollow } from 'data-center';

function Info({ params }: { params: { masterId: string } }) {
    const [info, setInfo] = useState({} as GetMentor);

    const userInfo = useUserStore.use.userInfo();

    const onIsFocused = async (id: number, follow: boolean) => {
        try {
            const res = follow
                ? await unFollow({ followerId: userInfo.uid, followedId: id })
                : await updateFollow({ followerId: userInfo.uid, followedId: id });
            if (!res.success) {
                return new Error();
            }

            setInfo(prevData => ({
                ...prevData,
                isFollowed: !prevData.isFollowed
            }));
        } catch (error) {
            return new Error();
        }
    };

    const fetchData = async () => {
        try {
            const res = await getMentorList({
                memberId: userInfo.uid ? userInfo.uid : 1,
                mentorId: Number(params.masterId)
            });

            if (!res.success) {
                return new Error();
            }
            setInfo(res.data[0]);
            console.log(res.data);
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);
    return (
        <section className={style.info}>
            <div className={style.detail}>
                <Avatar borderColor="#fff" size={54} />
                <div className={style.content}>
                    <span className={style.name}>{info.username}</span>
                    <div className={style.top}>
                        <Tag icon={<IconFlame size={10} />} text="9連紅" />
                        <Tag background="#fff" color="#4489ff" text="月榜 10" />
                    </div>
                    <div className={style.bottom}>
                        <span>粉絲: {info.fans}</span>
                        <span>解鎖: {info.unlocked}</span>
                        {!!info.tags && (
                            <span>
                                近一季猜球胜率: {Math.round(info.tags.quarterHitRate * 100)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={info.isFollowed ? style.focused : style.focus}
                onClick={() => {
                    onIsFocused(info.memberId, info.isFollowed);
                }}
            >
                {info.isFollowed ? '已关注' : '关注'}
            </div>

            <div className={style.introduction}>{info.profile}</div>
        </section>
    );
}

export default Info;
