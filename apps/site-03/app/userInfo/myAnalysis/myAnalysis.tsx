'use client';
import { useRouter } from 'next/navigation';
import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import backLeftArrowImg from '../img/backLeftArrow.png';
import { creatArticleStore } from './components/articleItem/articleStore';
import AnalysisItem from './components/analysisItem/analysisItem';
import ArticleItem from './components/articleItem/articleItem';
import style from './myAnalysis.module.scss';

function MyAnalysis() {
    const router = useRouter();
    creatArticleStore({
        articleList: [
            {
                id: 116,
                name: '老蕭聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 9,
                ranking: 10,
                title: '【11连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 563,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 564,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 565,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 566,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 567,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            }
        ]
    });

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const createArticle = () => {
        router.push('/userInfo/myAnalysis/createArticle');
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
                                router.back();
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的分析</div>
                        <button
                            className={style.publish}
                            onClick={() => {
                                createArticle();
                            }}
                            type="button"
                        >
                            发布文章
                        </button>
                    </div>
                </div>
            </div>

            <div className={style.main}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="center"
                    styling="underline"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    <Tab label="解锁记录" to="/userInfo/myAnalysis?status=unlock">
                        <ArticleItem />
                    </Tab>
                    <Tab label="我的分析" to="/userInfo/myAnalysis?status=myanalysis">
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default MyAnalysis;
