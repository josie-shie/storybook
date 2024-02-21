import { motion } from 'framer-motion';
import style from './matchCountOptionBar.module.scss';

function MatchCountOptionBar({
    option,
    count,
    setCount
}: {
    option: number[];
    count: number;
    setCount: (value: number) => void;
}) {
    return (
        <div className={style.matchCountBar}>
            {option.map((value, idx) => (
                <motion.button
                    className={`${style.button} ${value === count && style.isActive}`}
                    key={`${count}_${idx.toString()}`}
                    onClick={() => {
                        setCount(value);
                    }}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                >
                    {value}
                    {value === count && '场'}
                </motion.button>
            ))}
        </div>
    );
}

export default MatchCountOptionBar;
