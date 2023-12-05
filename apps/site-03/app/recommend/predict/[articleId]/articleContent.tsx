'use client';
import Image from 'next/image';
import { timestampToMonthDay, timestampToString } from 'lib';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import RecommendationList from './recommendationList';
import Star from './img/star.png';
import Push from './img/push.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Draw from './img/draw.png';
import style from './articleContent.module.scss';
import { useArticleStore } from './articleStore';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import type { GuessType } from '@/types/predict';

function Content() {
    const userInfo = useUserStore.use.userInfo();
    return (
        <>
            <div className={style.payContent}>
                <div className={style.price}>
                    <span className={style.text}>支付</span>
                    <span className={style.number}>
                        <Image alt="" className={style.image} src={Star} width={14} />
                        {10}
                    </span>
                </div>
                <span className={style.text}>开通年卡订阅</span>
            </div>
            <div className={style.balance}>
                我的餘額: {userInfo.balance ? userInfo.balance : 0}金幣
            </div>
        </>
    );
}

function ArticleContent({ params }: { params: { articleId: string } }) {
    const [openPaid, setOpenPaid] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const router = useRouter();

    const article = useArticleStore.use.articleDetail();
    const recommendationList = useArticleStore.use.recommendationList();

    const unlockArticle = () => {
        setOpenPaid(true);
    };

    const onSubmit = () => {
        try {
            // eslint-disable-next-line -- TODO: 取得預測文章Id,解鎖預測文章
            console.log(params.articleId);
            // await unLockArticle(params.articleId);
        } catch (error) {
            setOpenDialog(true);
            // eslint-disable-next-line -- console error
            console.log(error);
        }
        setOpenPaid(false);
    };

    const filterImage = (value: GuessType | undefined): string => {
        if (value !== undefined) {
            const result = {
                none: Push.src,
                win: Win.src,
                draw: Draw.src,
                lose: Lose.src
            };
            return result[value];
        }
        return Push.src;
    };

    const goSubscribe = () => {
        setOpenDialog(false);
        router.push('/userInfo/subscribe');
    };

    return (
        <div className={style.articleContent}>
            <div className={style.container}>
                <div className={style.time}>发表于今天 {timestampToMonthDay(article.postTime)}</div>
                <div className={style.title}>{article.title}</div>
                <div className={style.article}>
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
                                    Lorem ipsum dolor sit amet consectetur.
                                </div>
                            </div>
                            <div className={style.button} onClick={unlockArticle}>
                                <Image alt="" className={style.image} src={Star} width={14} />
                                <span className={style.text}>10 金币解锁本场预测</span>
                            </div>
                        </div>
                    )}

                    {article.unlock ? (
                        <div className={style.paidArea}>
                            <article className={style.content}>{article.content}</article>
                            <div className={style.team}>
                                <div
                                    className={`${style.table} ${
                                        article.masterGuess === 'home' ? style.active : ''
                                    }`}
                                >
                                    {article.masterGuess === 'home' && (
                                        <Image
                                            alt=""
                                            height={32}
                                            src={filterImage(article.guessResult)}
                                            width={32}
                                        />
                                    )}
                                    <div
                                        className={`${style.header} ${
                                            article.masterGuess === 'home'
                                                ? style[article.guessResult ?? 'none']
                                                : style.normal
                                        }`}
                                    >
                                        {article.homeTeamName}
                                    </div>
                                    <div className={style.score}>
                                        <span>{article.homeHandicap}</span>
                                    </div>
                                </div>
                                <div
                                    className={`${style.table} ${
                                        article.masterGuess === 'away' ? style.active : ''
                                    }`}
                                >
                                    {article.masterGuess === 'away' && (
                                        <Image
                                            alt=""
                                            height={32}
                                            src={filterImage(article.guessResult)}
                                            width={32}
                                        />
                                    )}
                                    <div
                                        className={`${style.header} ${
                                            article.masterGuess === 'away'
                                                ? style[article.guessResult ?? 'none']
                                                : style.normal
                                        }`}
                                    >
                                        {article.awayTeamName}
                                    </div>
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
            <NormalDialog
                cancelText="取消"
                confirmText="確認支付"
                content={<Content />}
                onClose={() => {
                    setOpenPaid(false);
                }}
                onConfirm={onSubmit}
                openDialog={openPaid}
            />
            <NormalDialog
                cancelText="取消"
                confirmText="去订阅"
                content={<div>余额不足，请订阅</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={goSubscribe}
                openDialog={openDialog}
            />
        </div>
    );
}

export default ArticleContent;
