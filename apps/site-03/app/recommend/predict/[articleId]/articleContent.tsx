'use client';
import Image from 'next/image';
import { timestampToMonthDay, timestampToString } from 'lib';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import RecommendationList from './recommendationList';
import Star from './img/star.png';
import Push from './img/push.png';
import style from './articleContent.module.scss';
import { creatArticleStore, useArticleStore } from './articleStore';

function ArticleContent() {
    creatArticleStore({
        articleDetail: {
            id: 1,
            master: {
                id: 0,
                avatar: '',
                name: '',
                hotStreak: 0,
                ranking: 0,
                followed: false,
                unlockNumber: 0,
                fansNumber: 0
            },
            postTime: 1701679456,
            title: '格鲁吉亚vs西班牙，来看我的精心推荐吧',
            leagueName: '歐錦U20A',
            dateTime: 1701679456,
            homeTeamLogo: '',
            homeTeamName: '泰国国立法政大学',
            awayTeamLogo: '',
            awayTeamName: '北曼谷学院',
            content:
                '【推荐分析】赛事前瞻：乌兰巴托FC主队近5场3胜1平1负，台中未来客队近5场2胜2平1负，谁能更胜一筹。',
            unlock: false,
            homeHandicap: 0.5,
            awayHandicap: -0.5,
            guessResult: 'none',
            masterGuess: 'home'
        },
        recommendationList: [
            {
                id: 1,
                postTime: 1701679456,
                leagueName: '欧锦U20A',
                dateTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                handicap: 'handicap',
                amount: 20,
                lockCount: 5
            },
            {
                id: 2,
                postTime: 1701679456,
                leagueName: '欧锦U20A',
                dateTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                handicap: 'handicap',
                amount: 20,
                lockCount: 5
            },
            {
                id: 3,
                postTime: 1701679456,
                leagueName: '欧锦U20A',
                dateTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                handicap: 'overUnder',
                amount: 20,
                lockCount: 5
            }
        ]
    });

    const article = useArticleStore.use.articleDetail();
    const recommendationList = useArticleStore.use.recommendationList();

    const unlockArticle = (_id: number) => {
        //TODO: 解鎖文章
    };

    return (
        <div className={style.articleContent}>
            <div className={style.container}>
                <div className={style.time}>发表于今天 {timestampToMonthDay(article.postTime)}</div>
                <div className={style.title}>{article.title}</div>
                <div className={style.article}>
                    <div className={style.start}>赛情預測</div>
                    <div className={style.leagueName}>
                        {article.leagueName} {timestampToString(article.dateTime, 'MM-DD HH:mm')}
                    </div>
                    <div className={style.clubInfo}>
                        <div className={style.team}>
                            <Image alt="" height={48} src={ThaiUniversityClubIcon} width={48} />
                            <div className={style.name}>{article.homeTeamName}</div>
                        </div>
                        <div className={style.fight}>VS</div>
                        <div className={style.team}>
                            <Image alt="" height={48} src={NorthBangKokClubIcon} width={48} />
                            <div className={style.name}>{article.awayTeamName}</div>
                        </div>
                    </div>

                    {!article.unlock && (
                        <div className={style.paidButton}>
                            <div className={style.content}>{article.content}</div>
                            <div className={style.buttonArea}>
                                <div className={style.backDrop} />
                                <div className={style.text}>
                                    两支球队实力相当，往绩近12次交锋中都处于...
                                </div>
                            </div>
                            <div
                                className={style.button}
                                onClick={() => {
                                    unlockArticle(article.id);
                                }}
                            >
                                <Image alt="" className={style.image} src={Star} width={14} />
                                <span className={style.text}>10 金币解锁本场预测</span>
                            </div>
                        </div>
                    )}

                    {article.unlock ? (
                        <div className={style.paidArea}>
                            <article className={style.content}>{article.content}</article>
                            <div className={style.team}>
                                <div className={`${style.table} ${style.active}`}>
                                    <Image alt="" height={24} src={Push} width={26} />
                                    <div className={style.header}>{article.homeTeamName}</div>
                                    <div className={style.score}>
                                        <span>{article.homeHandicap}</span>
                                    </div>
                                </div>
                                <div className={style.table}>
                                    <div className={style.header}>{article.awayTeamName}</div>
                                    <div className={style.score}>
                                        <span>{article.awayHandicap}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={style.otherList}>
                <div className={style.title}>Ta还推荐了... ({recommendationList.length})</div>
                <RecommendationList />
            </div>
        </div>
    );
}

export default ArticleContent;
