'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import backLeftArrowImg from '../img/backLeftArrow.png';
import { creatArticleStore } from './components/articleItem/articleStore';
import ArticleItem from './components/articleItem/articleItem';
import style from './myAnalysis.module.scss';

function MyAnalysis() {
    const router = useRouter();
    creatArticleStore({
        articleList: [
            {
                id: 116,
                name: '老萧聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 9,
                ranking: 10,
                title: '【11连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德国U20A',
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
                homeTeam: '德国U20A',
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
                homeTeam: '德国U20A',
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
                homeTeam: '德国U20A',
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
                homeTeam: '德国U20A',
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
                homeTeam: '德国U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            }
        ]
    });

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
                        <div className={style.text}>我的解锁</div>
                    </div>
                </div>
            </div>

            <div className={style.main}>
                <ArticleItem />
            </div>
        </>
    );
}

export default MyAnalysis;
