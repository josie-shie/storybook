import { motion } from 'framer-motion';
import style from './sameOptionBar.module.scss';

function SameOptionBar({
    team = 0,
    teamActiveValue,
    setTeam,
    league = 0,
    leagueActiveValue,
    setLeague
}: {
    team: number;
    teamActiveValue: number;
    setTeam: (value: number) => void;
    league: number;
    leagueActiveValue: number;
    setLeague: (value: number) => void;
}) {
    return (
        <div className={style.sameOption}>
            <motion.button
                className={`${style.button} ${team !== 0 && style.isActive}`}
                onClick={() => {
                    setTeam(team === 0 ? teamActiveValue : 0);
                }}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                同主客
            </motion.button>
            <motion.button
                className={`${style.button} ${league && style.isActive}`}
                onClick={() => {
                    setLeague(league === 0 ? leagueActiveValue : 0);
                }}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                同赛事
            </motion.button>
        </div>
    );
}

export default SameOptionBar;
