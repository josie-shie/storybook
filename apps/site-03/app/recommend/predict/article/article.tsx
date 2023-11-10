import ArticleItem from '../components/articleItem/articleItem';
import { creatArticleStore } from '../articleStore';
import style from './article.module.scss';

function Article() {
    creatArticleStore({
        articleList: [
            {
                id: 116,
                name: '老蕭聊球',
                unlock: false,
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
            }
        ]
    });

    return (
        <div className={style.article}>
            <ArticleItem />
        </div>
    );
}

export default Article;
