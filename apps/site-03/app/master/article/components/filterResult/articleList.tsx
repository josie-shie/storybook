'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ArticleCard from '../articleCard/articleCard';
import { useArticleStore } from '../../articleStore';
import BackIcon from '../../img/back.png';
import style from './articleList.module.scss';

function ArticleList() {
    const articleList = useArticleStore.use.filterSelectedMatchList();
    const setSelectedMatchList = useArticleStore.use.setSelectedMatchList();

    const variants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '100%', opacity: 0 }
    };

    const handleBack = () => {
        setSelectedMatchList({ filterSelectedMatchList: [] });
    };
    return (
        <motion.div
            animate={articleList.length > 0 ? 'open' : 'closed'}
            className={style.articleList}
            transition={{ duration: 0.2 }}
            variants={variants}
        >
            <div
                className={style.back}
                onClick={() => {
                    handleBack();
                }}
            >
                <Image alt="back" height={24} src={BackIcon} />
                返回
            </div>
            <ul className={style.articleBox}>
                {articleList.length > 0 &&
                    articleList.map(article => {
                        return <ArticleCard article={article} key={article.id} />;
                    })}
            </ul>
        </motion.div>
    );
}

export default ArticleList;
