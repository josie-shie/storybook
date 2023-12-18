'use client';
import { useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import style from './info.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

function Info() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className={style.info}>
            <div className={style.detail}>
                <Avatar borderColor="#fff" size={54} />
                <div className={style.content}>
                    <div className={style.top}>
                        <span className={style.name}>老梁聊球</span>
                        <Tag icon={<IconFlame size={10} />} text="9連紅" />
                        <Tag background="#fff" color="#4489ff" text="月榜 10" />
                    </div>
                    <div className={style.bottom}>
                        <span>粉絲: 34713</span>
                        <span>解鎖: 1000</span>
                    </div>
                </div>
            </div>

            <div
                className={isFocused ? style.focused : style.focus}
                onClick={() => {
                    setIsFocused(!isFocused);
                }}
            >
                {isFocused ? '已关注' : '关注'}
            </div>

            <div className={style.introduction}>
                资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！对各个赛事都有涉足。长期关注！对各个赛事都有涉足。长期关注！
            </div>
        </section>
    );
}

export default Info;
