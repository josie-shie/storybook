import GameCard from './components/gameCard';
import style from './football.module.scss';

function Football() {
    return (
        <div className={style.football}>
            <ul>
                <GameCard />
                <GameCard />
            </ul>
        </div>
    );
}

export default Football;
