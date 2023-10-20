import GameCard from './components/gameCard';
import style from './football.module.scss';

function Football() {
    return (
        <div className={style.football}>
            <div>
                <GameCard />
            </div>
        </div>
    );
}

export default Football;
