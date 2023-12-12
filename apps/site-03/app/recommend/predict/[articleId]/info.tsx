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
                <Avatar borderColor="#fff" size={54} src={master.mentorImage} />
                <div className={style.content}>
                    <div className={style.top}>
                        <span className={style.name}>{master.mentorName}</span>
                    </div>
                    <div>
                        <Tag
                            icon={<IconFlame size={10} />}
                            text={`${master.tag.winMaxAccurateStreak} 連紅`}
                        />
                        {master.tag.quarterRanking > 0 && (
                            <Tag
                                background="#fff"
                                color="#4489ff"
                                text={`季榜 ${master.tag.quarterRanking}`}
                            />
                        )}
                        {master.tag.monthRanking > 0 && (
                            <Tag
                                background="#fff"
                                color="#4489ff"
                                text={`月榜 ${master.tag.monthRanking}`}
                            />
                        )}
                        {master.tag.weekRanking > 0 && (
                            <Tag
                                background="#fff"
                                color="#4489ff"
                                text={`周榜 ${master.tag.weekRanking}`}
                            />
                        )}
                    </div>
                    <div className={style.bottom}>
                        {master.fansNumber > 0 && <span>粉絲: {master.fansNumber} </span>}
                        {master.unlockNumber > 0 && <span>解鎖: {master.unlockNumber} </span>}
                        {master.tag.quarterHitRate > 0 && (
                            <span>近一季猜球胜率: {master.tag.quarterHitRate}%</span>
                        )}
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
