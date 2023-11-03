'use client';
import { useState } from 'react';
import Image from 'next/image';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import RecommendationItem from './recommendationItem';
import Star from './img/star.png';
import Push from './img/push.png';
import style from './articleContent.module.scss';

function ArticleContent() {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const recommendations = [
        {
            id: 1,
            time: '发表于今天 17:45',
            leagueName: { name: '欧锦U20A', time: '09-05 16:45' },
            teamName: '德國U20A vs 斯洛文尼亚U20'
        },
        {
            id: 2,
            time: '发表于今天 17:45',
            leagueName: { name: '欧锦U20A', time: '09-05 16:45' },
            teamName: '德國U20A vs 斯洛文尼亚U20'
        },
        {
            id: 3,
            time: '发表于今天 17:45',
            leagueName: { name: '欧锦U20A', time: '09-05 16:45' },
            teamName: '德國U20A vs 斯洛文尼亚U20'
        }
    ];

    return (
        <div className={style.articleContent}>
            <div className={style.container}>
                <div className={style.time}>发表于今天 17:45</div>
                <div className={style.title}>格鲁吉亚vs西班牙，来看我的精心推荐吧</div>
                <div className={style.article}>
                    <div className={style.start}>赛情預測</div>
                    <div className={style.leagueName}>歐錦U20A 7-14 01:00</div>
                    <div className={style.clubInfo}>
                        <div className={style.team}>
                            <Image alt="" height={48} src={ThaiUniversityClubIcon} width={48} />
                            <div className={style.name}>泰国国立法政大学</div>
                        </div>
                        <div className={style.fight}>VS</div>
                        <div className={style.team}>
                            <Image alt="" height={48} src={NorthBangKokClubIcon} width={48} />
                            <div className={style.name}>北曼谷學院</div>
                        </div>
                    </div>

                    {!isUnlocked && (
                        <div className={style.paidButton}>
                            <div className={style.content}>
                                【推荐分析】赛事前瞻：乌兰巴托FC主队近5场3胜1平1负，台中未来客队近5场2胜2平1负，谁能更胜一筹。
                            </div>
                            <div className={style.buttonArea}>
                                <div className={style.backDrop} />
                                <div className={style.text}>
                                    两支球队实力相当，往绩近12次交锋中都处于...
                                </div>
                            </div>
                            <div
                                className={style.button}
                                onClick={() => {
                                    setIsUnlocked(true);
                                }}
                            >
                                <Image alt="" className={style.image} src={Star} width={14} />
                                <span className={style.text}>10 金币解锁本场预测</span>
                            </div>
                        </div>
                    )}

                    {isUnlocked ? (
                        <div className={style.paidArea}>
                            <article className={style.content}>
                                两支球队实力相当，往绩近12次交锋中都处于五五开的局面，目前伊斯洛奇明斯克已经连续3场不胜，竞技状态不佳！戈梅利上一场也是惨遭大败，士气上受到打击！本场数据开出主场作战的伊斯洛奇明斯克做出-0.25力度支持，大小进球2.5的数据。以目前两队的状况来看，小编认为伊斯洛奇明斯克以微弱的主场优势小胜戈梅利。据开出主场作战的伊斯洛奇明斯克做出-0.25力度支持，大小进球2.5的数据。以目前两队的状况来看，小编认为伊斯洛奇明斯克以微弱的主
                            </article>
                            <div className={style.team}>
                                <div className={`${style.table} ${style.active}`}>
                                    <Image alt="" height={24} src={Push} width={26} />
                                    <div className={style.header}>泰国国立法政大学</div>
                                    <div className={style.score}>
                                        <span>-0.5</span>
                                        <span>1.925</span>
                                    </div>
                                </div>
                                <div className={style.table}>
                                    <div className={style.header}>北曼谷学院</div>
                                    <div className={style.score}>
                                        <span>+0.5</span>
                                        <span>1.775</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={style.otherList}>
                <div className={style.title}>Ta还推荐了... (5)</div>
                {recommendations.map(rec => (
                    <RecommendationItem key={rec.id} {...rec} />
                ))}
            </div>
        </div>
    );
}

export default ArticleContent;
