'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import style from './filterItem.module.scss';
import iconList from './img/list.png';

interface PropsType {
    id: number;
    gameName: string;
    gameTime: string;
    homeTeam: string;
    awayTeam: string;
    articleNumber: number;
}

function FilterItem({ item }: { item: PropsType }) {
    const router = useRouter();

    const goDetail = () => {
        router.push('/recommend/predict/masterList');
    };

    return (
        <div className={style.filterItem}>
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
}

export default FilterItem;
