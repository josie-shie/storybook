import Image from 'next/image';
import { motion } from 'framer-motion';
import { timestampToString } from 'lib';
import Link from 'next/link';
import type { BigDataHint } from 'data-center';
import { useHintsFormStore } from '../../hintsFormStore';
import style from './handicapTips.module.scss';
import iconHot from './img/hot.png';
import teamLogo from './img/homeTeam.png';
import Tag from '@/components/tag/tag';

interface PropsType {
    tipsData: BigDataHint;
    hintsSelected: string;
}

type OddsType = '赢' | '输' | '大' | '小';

const backgroundColorMap = { 赢: '#FF4F4F', 输: '#9B9B9B', 大: '#4489FF', 小: '#FF844F' };
const commentColorMap = { 赢: '#ED3A45', 输: '#8D8D8D', 大: '#222222', 小: '#222222' };
const textMap = { 赢: '紅', 输: '输', 大: '大', 小: '小' };

function HandicapTips({ tipsData, hintsSelected }: PropsType) {
    const playList = useHintsFormStore.use.playList();
    const playWay = playList.find(item => item.value === hintsSelected);

    const tagLabel = textMap[tipsData.longOddsType as OddsType];
    const tagBgColor = backgroundColorMap[tipsData.longOddsType as OddsType];
    const commentColor = commentColorMap[tipsData.longOddsType as OddsType];

    return (
        <div className={style.handicapTips}>
            {tipsData.isFamous ? (
                <span className={style.flag}>
                    <Image alt="" className={style.image} src={iconHot} />熱
                </span>
            ) : null}
            <div className={style.tagContainer}>
                <Tag background="#F3F3F3" color="#4489FF" text={`${playWay?.label}`} />
                <Tag background={tagBgColor} text={`${tipsData.longOddsTimes}連${tagLabel}`} />
            </div>
            <div className={style.matchup}>
                <span>{tipsData.leagueChsShort}</span>
                <span> | {timestampToString(tipsData.startTime, 'MM-DD HH:mm')}</span>
                <span>
                    {' '}
                    | {tipsData.homeChs} vs {tipsData.awayChs}
                </span>
            </div>
            <div className={style.result}>
                <div className={style.comment} style={{ color: commentColor }}>
                    <Image alt="teamLogo" className={style.team} src={teamLogo} width={28} />
                    {tipsData.longOddsTeamId === tipsData.homeId
                        ? tipsData.homeChs
                        : tipsData.awayChs}
                    連{tipsData.longOddsType}
                    {tipsData.longOddsTimes}場
                </div>
                <Link href={`football/${tipsData.matchId}/analyze`}>
                    <motion.button className={style.button} type="button" whileTap={{ scale: 0.9 }}>
                        詳情
                    </motion.button>
                </Link>
            </div>
        </div>
    );
}

export default HandicapTips;
