'use client';
import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import Rule from '../components/rule/rule';
import Title from './img/title.svg';
import style from './masterPlan.module.scss';

function MasterPlan() {
    return (
        <div className={style.masterPlan}>
            <div className={style.title}>
                <div className={style.name}>
                    <Title />
                    <span>近20场高胜率玩家风向</span>
                </div>
                <Rule />
            </div>
            <div className={style.analyze}>
                <div className={style.column}>
                    <div className={style.button}>
                        <span className={style.team}>主</span>
                        <span className={style.user}>888人</span>
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>
                            <span className={style.home}>88%</span>
                            <span className={style.ing}>一球/球半</span>
                            <span className={style.away}>4%</span>
                        </div>
                        <ProgressBar
                            background="#c3c3c3"
                            fill="#276ce1"
                            gapSize="large"
                            height={10}
                            radius
                            skewGap
                            value={88}
                        />
                    </div>
                    <div className={style.button}>
                        <span className={style.team}>客</span>
                        <span className={style.user}>14人</span>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.button}>
                        <span className={style.team}>大</span>
                        <span className={style.user}>888人</span>
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>
                            <span className={style.home}>88%</span>
                            <span className={style.ing}>一球/球半</span>
                            <span className={style.away}>4%</span>
                        </div>
                        <ProgressBar
                            background="#c3c3c3"
                            fill="#276ce1"
                            gapSize="large"
                            height={10}
                            radius
                            skewGap
                            value={88}
                        />
                    </div>
                    <div className={style.button}>
                        <span className={style.team}>小</span>
                        <span className={style.user}>14人</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterPlan;
