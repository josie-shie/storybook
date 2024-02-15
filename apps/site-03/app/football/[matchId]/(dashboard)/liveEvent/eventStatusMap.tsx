import type { ReactNode } from 'react';
import Image from 'next/image';
import GoalIcon from './img/goal.png';
import ShotOnTargetIcon from './img/shotOnTarget.png';
import ShotOffTargetIcon from './img/shotOffTarget.png';
import PenaltyIcon from './img/penalty.png';
import MissPenaltyIcon from './img/missPenalty.png';
import OwnGoalIcon from './img/ownGoal.png';
import AssistIcon from './img/assist.png';
import CornerIcon from './img/corner.png';
import YellowCardIcon from './img/yellowCard.png';
import RedCardIcon from './img/redCard.png';
import SecondYellowCardIcon from './img/secondYellowCard.png';
import SubstitutionIcon from './img/substitution.png';
import VideoAssistantRefereeIcon from './img/videoAssistantReferee.png';

export interface EventStatus {
    id: number;
    label: string;
    image: ReactNode | string;
}

export const eventStatusList: (size: number) => EventStatus[] = (size = 16) => {
    return [
        {
            id: 1,
            label: '进球',
            image: <Image alt="进球" height={size} src={GoalIcon} width={size} />
        },
        {
            id: 24,
            label: '射正',
            image: <Image alt="进球" height={size} src={ShotOnTargetIcon} width={size} />
        },
        {
            id: 25,
            label: '射偏',
            image: <Image alt="进球" height={size} src={ShotOffTargetIcon} width={size} />
        },
        {
            id: 7,
            label: '点球',
            image: <Image alt="进球" height={size} src={PenaltyIcon} width={size} />
        },
        {
            id: 13,
            label: '点球未进',
            image: <Image alt="进球" height={size} src={MissPenaltyIcon} width={size} />
        },
        {
            id: 8,
            label: '乌龙球',
            image: <Image alt="进球" height={size} src={OwnGoalIcon} width={size} />
        },
        {
            id: 10,
            label: '助攻',
            image: <Image alt="进球" height={size} src={AssistIcon} width={size} />
        },
        {
            id: 18,
            label: '角球',
            image: <Image alt="进球" height={size} src={CornerIcon} width={size} />
        },
        {
            id: 3,
            label: '黄牌',
            image: <Image alt="进球" height={size} src={YellowCardIcon} width={size} />
        },
        {
            id: 2,
            label: '红牌',
            image: <Image alt="进球" height={size} src={RedCardIcon} width={size} />
        },
        {
            id: 9,
            label: '两黄一红',
            image: <Image alt="进球" height={size} src={SecondYellowCardIcon} width={size} />
        },
        {
            id: 11,
            label: '换人',
            image: <Image alt="进球" height={size} src={SubstitutionIcon} width={size} />
        },
        {
            id: 14,
            label: 'VAR',
            image: <Image alt="进球" height={size} src={VideoAssistantRefereeIcon} width={size} />
        },
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
};

export const eventStatusMap: (size?: number) => Record<number, string> = (size = 20) => {
    const eventList = eventStatusList(size);

    return eventList.reduce((map, item) => {
        map[item.id] = item.image;
        return map;
    }, {});
};
