'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useArticleFilterStore } from '../../filter/filterStore';
import style from './filterItem.module.scss';
import iconList from './img/list.png';

function FilterItem() {
    const router = useRouter();
    const filterList = useArticleFilterStore.use.filterList();

    const goDetail = () => {
        router.push('/recommend/predict/masterList');
    };

    return (
        <>
            {filterList.map(item => {
                return (
                    <div className={style.filterItem} key={item.id}>
                        <div className={style.left}>
                            <div className={style.top}>
                                <span className={style.name}>{item.gameName}</span>
                                <span className={style.time}>{item.gameTime}</span>
                            </div>
                            <div className={style.game}>
                                <span className={style.home}>{item.homeTeam}</span>
                                <span className={style.compete}>VS</span>
                                <span className={style.away}>{item.awayTeam}</span>
                            </div>
                        </div>
                        <motion.button
                            className={style.article}
                            onClick={goDetail}
                            type="button"
                            whileTap={{ scale: 0.9 }}
                        >
                            <Image alt="icon" height={16} src={iconList} width={16} />
                            {item.articleNumber}篇文章
                        </motion.button>
                    </div>
                );
            })}
        </>
    );
}

export default FilterItem;
