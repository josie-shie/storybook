import Image from 'next/image';
import { motion } from 'framer-motion';
import { timestampToString } from 'lib';
import Link from 'next/link';
import style from './handicapTips.module.scss';
import iconHot from './img/hot.png';
import teamLogo from './img/homeTeam.png';
import { useDiscSelectStore } from '@/app/recommend/bigData/(list)/discSelectStore';
import Tag from '@/components/tag/tag';

type OddsResultType = '赢' | '输' | '大' | '小';

interface HandicapTipType {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeId: number;
    homeChs: string;
    awayId: number;
    awayChs: string;
    teamId: number;
    teamChs: string; // 哪一隊連
    oddsResult: OddsResultType; // 輸、贏、大、小
    longOddsTimes: number; // n場
    isFamous: boolean; // 是否熱門賽事
    leagueLevel: number;
}

interface PropsType {
    tipsData: HandicapTipType;
}

const backgroundColorMap = { 赢: '#FF4F4F', 输: '#9B9B9B', 大: '#4489FF', 小: '#FF844F' };
const commentColorMap = { 赢: '#ED3A45', 输: '#8D8D8D', 大: '#222222', 小: '#222222' };
const textMap = { 赢: '紅', 输: '输', 大: '大', 小: '小' };

function HandicapTips({ tipsData }: PropsType) {
    const hintsSelected = useDiscSelectStore.use.hintsSelected();
    const playList = useDiscSelectStore.use.playList();
    const playWay = playList.find(item => item.value === hintsSelected);

    const tagLabel = textMap[tipsData.oddsResult];
    const tagBgColor = backgroundColorMap[tipsData.oddsResult];
    const commentColor = commentColorMap[tipsData.oddsResult];

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
                    {tipsData.teamChs}連{tipsData.oddsResult}
                    {tipsData.longOddsTimes}場
                </div>
                <Link href={`/contest/football/${tipsData.matchId}`}>
                    <motion.button className={style.button} type="button" whileTap={{ scale: 0.9 }}>
                        詳情
                    </motion.button>
                </Link>
            </div>
        </div>
    );
}

export default HandicapTips;
