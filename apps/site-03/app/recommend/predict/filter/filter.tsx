'use client';
import { IconFilter } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import FilterItem from '../components/filterItem/filterItem';
import style from './filter.module.scss';
import { creatArticleFilterStore } from './filterStore';

function Filter() {
    creatArticleFilterStore({
        filterList: [
            {
                id: 113,
                gameName: '亞運男足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 1
            },
            {
                id: 114,
                gameName: '亞運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 2
            },
            {
                id: 221,
                gameName: '奧運男足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 24
            },
            {
                id: 223,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            }
        ]
    });

    return (
        <div className={style.filter}>
            <div className={style.block}>
                <span />
                <motion.button
                    className={style.filterButton}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                >
                    <span>筛选</span>
                    <IconFilter color="#4489FF" size={16} />
                </motion.button>
            </div>
            <div className={style.listContainer}>
                <FilterItem />
            </div>
        </div>
    );
}

export default Filter;
