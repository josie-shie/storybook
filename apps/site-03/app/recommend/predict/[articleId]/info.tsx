'use client';
import { IconFlame } from '@tabler/icons-react';
import style from './info.module.scss';
import { useArticleStore } from './articleStore';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

function Info() {
    const master = useArticleStore.use.articleDetail();

    const onIsFocused = () => {
        // 取消關注/新增關注
    };

    return (
        <section className={style.info}>
            <div className={style.detail}>
                <Avatar borderColor="#fff" size={54} />
                <div className={style.content}>
                    <div className={style.top}>
                        <span className={style.name}>{master.mentorName}</span>
                        <Tag icon={<IconFlame size={10} />} text={`${master.hotStreak}連紅`} />
                        <Tag background="#fff" color="#4489ff" text={`月榜 ${master.ranking}`} />
                    </div>
                    <div className={style.bottom}>
                        <span>粉絲: {master.fansNumber} </span>
                        <span>解鎖: {master.unlockNumber}</span>
                    </div>
                </div>
            </div>

            <div
                className={master.followed ? style.focused : style.focus}
                onClick={() => {
                    onIsFocused;
                }}
            >
                {master.followed ? '已关注' : '关注'}
            </div>
        </section>
    );
}

export default Info;
