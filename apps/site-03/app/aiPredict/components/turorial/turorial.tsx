'use client';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Win from '../../(list)/img/homeWin.svg';
import Close from '../../(list)/img/close.svg';
// import WaterMark from '../../img/waterMark.png';
import Home from '../../(list)/img/home.svg';
import Away from '../../(list)/img/away.svg';
import IdeaIcon from '../../(list)/img/idea.svg';
import AiAvatarSmall from '../../(list)/img/aiAvatarSmall.svg';
import style from './turorial.module.scss';

function Ai() {
    return (
        <div className={style.aiTab}>
            <div className={style.info}>
                <div className={style.future}>
                    <span className={style.text}>FutureAI</span> 预测
                </div>
                <div className={style.content}>
                    根据目前的形势和球队的表现，预测这场比赛将是一场激烈的对决。队伍001可能会以小比分胜出，但队伍001也有机会展示他们的实力和战术能力。预计队伍001以1-0战胜队伍002的。
                </div>
            </div>
            <div className={style.info}>
                <div className={style.title}>总结</div>
                <div className={style.content}>
                    总的来说，这场比赛对双方来说都极为关键，特别是考虑到他们都希望在欧冠杯中有所作为。从战术角度看，队伍001将依靠其防守的坚固和快速反击，而队伍002则需要在中场展现控制力，尝试打破队伍001的防线。虽然预测队伍001将以微弱优势获胜，但比赛结果仍有可能出现变数。
                </div>
            </div>
        </div>
    );
}
function Analyze() {
    return (
        <div className={style.aiTab}>
            <div className={style.detail}>
                这场比赛对于双方来说都至关重要，特别是考虑到他们在比赛中的当前表现和排名。
            </div>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <Home />
                    <span>队伍001</span>
                </div>
                <div className={style.content}>
                    他们最近的比赛成绩为L-D-D-D-L。球队的关键球员是后卫阿卜杜勒，他以稳健的防守和中断对方攻势而闻名。他一直是队伍001的稳定表现者，将在控制队伍001的讲攻动作中发挥关键作用。
                </div>
            </div>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <Away />
                    <span>队伍002</span>
                </div>
                <div className={style.content}>
                    他们最近的比赛成绩为L-L-L-W-L。值得注意的球员是中场马维亚，他是一位聪明、敏税的中场球员，以其对球的控制和分配而闻名。他在关键位置赢得球权并启动下一阶段比赛的能力非常出色，还经常参与关键的解国、铲断和封堵冂。
                </div>
            </div>
        </div>
    );
}
function Cornor() {
    return (
        <div className={style.aiTab}>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <IdeaIcon />
                    <span>队伍001的策略</span>
                </div>
                <div className={style.content}>
                    从阿尔特塔的视角来看，队伍001可能会利用奥埃斯的防守稳固和快速反击的能力来打击队伍002。他们的战术可能会更倾向于保持防守的紧凑和在适当时机进行快速进攻。
                </div>
            </div>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <IdeaIcon />
                    <span>队伍002的策略</span>
                </div>
                <div className={style.content}>
                    队伍002可能会依赖Apuia在中场的控制来建立攻势，并尝试通过紧凑的组织和快传递来破坏队伍001的防守。他们需要在攻守转换时保持集中和敏捷，以应对队伍001的反击威胁。
                </div>
            </div>
        </div>
    );
}

function Tutorial() {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('ai');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    const tabList = [
        { title: 'AI预测', value: 'ai' },
        { title: '战略分析', value: 'analyze' },
        { title: '战术角度', value: 'cornor' }
    ];

    const selectedMap = {
        ai: <Ai />,
        analyze: <Analyze />,
        cornor: <Cornor />
    };

    return (
        <>
            <div className={style.tutorialBar} onClick={handleClickOpen}>
                <span>教学说明</span>
            </div>
            <Dialog
                PaperProps={{
                    style: {
                        width: '100%',
                        margin: 0,
                        overflow: 'initial',
                        background: 'initial',
                        boxShadow: 'initial'
                    }
                }}
                className={style.tutorialDialog}
                onClose={handleClose}
                open={open}
            >
                <div className={style.close}>
                    <Close onClick={handleClose} />
                    <span>关闭</span>
                </div>
                <div className={style.tutorialContent}>
                    <div className={style.tutorialBox}>
                        <div className={style.message}>
                            <AiAvatarSmall className={style.icon} />
                            <div className={style.text}>
                                以下是我分析即将进行的<span>2024年1月23日 13:00 亚洲杯足球赛</span>
                                中 队伍001 对队伍002的比赛。
                            </div>
                        </div>

                        <div className={style.teamTitle}>
                            <div className={`${style.name} ${style.active}`}>
                                <Win className={style.icon} />
                                <Home />
                                <span>队伍001</span>
                            </div>
                            <div className={style.name}>
                                <Away />
                                <span>队伍002</span>
                            </div>
                        </div>

                        <div className={style.information}>
                            <div className={style.minTabBar}>
                                {tabList.map(tab => (
                                    <motion.div
                                        animate={
                                            selectedOption === tab.value ? tabActive : tabDefault
                                        }
                                        className={style.tab}
                                        key={tab.value}
                                        onClick={() => {
                                            setSelectedOption(tab.value);
                                        }}
                                    >
                                        {tab.title}
                                    </motion.div>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    animate={{ opacity: 1, y: 0 }}
                                    className={style.content}
                                    exit={{ opacity: 0, y: -4 }}
                                    initial={{ opacity: 0, y: 4 }}
                                    key={selectedOption}
                                    transition={{ duration: 0.16 }}
                                >
                                    {selectedMap[selectedOption]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default Tutorial;
