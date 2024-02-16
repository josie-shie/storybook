'use client';
import BallGoal from './img/ballGoal.svg';
import BallShotTarget from './img/ballShotTarget.svg';
import BallShotFail from './img/ballShotFail.svg';
import BallShotPoint from './img/ballShotPoint.svg';
import BallShotPointFail from './img/ballShotPointFail.svg';
import BallBigFail from './img/ballBigFail.svg';
import BallShotSup from './img/ballShotSup.svg';
import Corner from './img/corner.svg';
import YellowCard from './img/yellowCard.svg';
import RedCard from './img/redCard.svg';
import ChangePlayer from './img/changePlayer.svg';
import YellowRedCard from './img/yellowRedCard.svg';
import Vars from './img/VAR.svg';
import style from './playerIconList.module.scss';

function PlayerIconList() {
    return (
        <div className={style.playerIconList}>
            <div className={style.list}>
                <div className={style.icon}>
                    <BallGoal />
                    <span>进球</span>
                </div>
                <div className={style.icon}>
                    <BallShotTarget />
                    <span>射正</span>
                </div>
                <div className={style.icon}>
                    <BallShotFail />
                    <span>射偏</span>
                </div>
                <div className={style.icon}>
                    <BallShotPoint />
                    <span>点球</span>
                </div>
                <div className={style.icon}>
                    <BallShotPointFail />
                    <span>点球未进</span>
                </div>
            </div>
            <div className={style.list}>
                <div className={style.icon}>
                    <BallBigFail />
                    <span>乌龙球</span>
                </div>
                <div className={style.icon}>
                    <BallShotSup />
                    <span>助攻</span>
                </div>
                <div className={style.icon}>
                    <Corner />
                    <span>角球</span>
                </div>
                <div className={style.icon}>
                    <YellowCard />
                    <span>黄牌</span>
                </div>
                <div className={style.icon}>
                    <RedCard />
                    <span>紅牌</span>
                </div>
            </div>
            <div className={style.list}>
                <div className={style.icon}>
                    <ChangePlayer />
                    <span>换人</span>
                </div>
                <div className={style.icon}>
                    <YellowRedCard />
                    <span>两黄一红</span>
                </div>
                <div className={style.icon}>
                    <Vars />
                    <span>VAR</span>
                </div>
                <div className={style.icon} />
                <div className={style.icon} />
            </div>
        </div>
    );
}

export default PlayerIconList;
