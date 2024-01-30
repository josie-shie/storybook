import type { ReactNode } from 'react';
import GoalIcon from './img/goal.svg';
import ShotOnTargetIcon from './img/shotOnTarget.svg';
import ShotOffTargetIcon from './img/shotOffTarget.svg';
import PenaltyIcon from './img/penalty.svg';
import MissPenaltyIcon from './img/missPenalty.svg';
import OwnGoalIcon from './img/ownGoal.svg';
import AssistIcon from './img/assist.svg';
import CornerIcon from './img/corner.svg';
import YellowCardIcon from './img/yellowCard.svg';
import RedCardIcon from './img/redCard.svg';
import SecondYellowCardIcon from './img/secondYellowCard.svg';
import SubstitutionIcon from './img/substitution.svg';
import VideoAssistantRefereeIcon from './img/videoAssistantReferee.svg';

export interface EventStatus {
    id: number;
    label: string;
    image: ReactNode | string;
}

export const eventStatusList: EventStatus[] = [
    { id: 1, label: '进球', image: <GoalIcon /> },
    { id: 24, label: '射正', image: <ShotOnTargetIcon /> },
    { id: 25, label: '射偏', image: <ShotOffTargetIcon /> },
    { id: 7, label: '点球', image: <PenaltyIcon /> },
    { id: 13, label: '点球未进', image: <MissPenaltyIcon /> },
    { id: 8, label: '乌龙球', image: <OwnGoalIcon /> },
    { id: 10, label: '助攻', image: <AssistIcon /> },
    { id: 18, label: '角球', image: <CornerIcon /> },
    { id: 3, label: '黄牌', image: <YellowCardIcon /> },
    { id: 2, label: '红牌', image: <RedCardIcon /> },
    { id: 9, label: '两黄一红', image: <SecondYellowCardIcon /> },
    { id: 11, label: '换人', image: <SubstitutionIcon /> },
    { id: 14, label: 'VAR', image: <VideoAssistantRefereeIcon /> },
    { id: 4, label: '中场', image: 'half_time' },
    { id: 5, label: '结束', image: 'match_end' },
    { id: 6, label: '伤停补时', image: 'injury_time' },
    { id: 12, label: '加时赛结束', image: 'extra_time_end' },
    { id: 15, label: '点球大战结束', image: 'penalty_shootout_end' },
    { id: 16, label: '点球(点球大战)', image: 'penalty_shootout' },
    { id: 17, label: '点球未进(点球大战)', image: 'penalty_shootout_miss' },
    { id: 19, label: '越位', image: 'offside' },
    { id: 20, label: '任意球', image: 'free_kick' },
    { id: 21, label: '球门球', image: 'goal_kick' },
    { id: 22, label: '比赛开始', image: 'match_start' },
    { id: 23, label: '半场比分', image: 'half_score' },
    { id: 26, label: '进攻', image: 'attack' },
    { id: 27, label: '危险进攻', image: 'dangerous_attack' },
    { id: 28, label: '控球率', image: 'possession' }
];

export const eventStatusMap: Record<number, string> = eventStatusList.reduce((map, item) => {
    map[item.id] = item.image;
    return map;
}, {});
