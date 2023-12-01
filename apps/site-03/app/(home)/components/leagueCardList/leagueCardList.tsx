import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import { timestampToString, handleGameTime } from 'lib';
import Link from 'next/link';
import { useHomeStore } from '../../homeStore';
import playButtonImg from './img/playButton.png';
import planImg from './img/plan.png';
import professionalImg from './img/professional.png';
import style from './leagueCardList.module.scss';
import { useContestInfoStore } from '@/app/contestInfoStore';

interface Match {
    homeScore: number;
    awayScore: number;
    startTime: number;
    state: number;
    matchId: number;
    homeChs: string;
    homeLogo: string;
    awayChs: string;
    awayLogo: string;
    roundCn: string;
}

interface GlobalMatch {
    state: number | undefined;
    homeScore: number | undefined;
    awayScore: number | undefined;
    startTime: number | undefined;
}

interface MatchProps {
    match: Match;
    leagueName: string;
    globalMatchDetail: GlobalMatch;
}

function StateComponent({ state, match }: { state: number; match: Match }) {
    const stateList = [1, 2, 3, 4, 5];

    return (
        <div className={`${style.text} ${style.live} ${style.liveText}`}>
            {stateList.includes(state) ? (
                <Link href={`/contest/football/${match.matchId}?live=true`}>
                    直播中
                    <Image alt="" className={style.playButton} src={playButtonImg} />
                </Link>
            ) : null}
        </div>
    );
}

function NotStartedScore() {
    return <div className={style.versus}>VS</div>;
}

function StartedScore({
    homeScore,
    awayScore,
    startTime,
    state
}: {
    homeScore: number;
    awayScore: number;
    startTime: number;
    state: number;
}) {
    const getStartTime = () => {
        return handleGameTime(startTime, state);
    };

    return (
        <>
            <div className={style.scoreNumber}>
                {homeScore}-{awayScore}
            </div>
            <div className={style.timeTotal}>
                <span className={getStartTime().state}>{getStartTime().time}</span>
            </div>
        </>
    );
}

function LeagueCard({ match, leagueName, globalMatchDetail }: MatchProps) {
    const optionList = [
        {
            label: '竞猜方案',
            icon: <Image alt="" height={18} src={planImg} width={18} />,
            path: `/recommend/guess/${match.matchId}`
        },
        {
            label: '专家预测',
            icon: <Image alt="" height={18} src={professionalImg} width={18} />,
            path: `/recommend/predict/masterList?matchId=${match.matchId}`
        }
    ];

    return (
        <div className={style.leagueCard}>
            <div className={style.matchInfo}>
                <div className={style.leagueInfo}>
                    <div className={`${style.text} ${style.liveText}`}>{leagueName}</div>
                    <div className={style.time}>
                        {timestampToString(match.startTime, 'YYYY-M-DD HH:mm')}
                    </div>
                    <StateComponent match={match} state={match.state} />
                </div>
                <div className={style.clubInfo}>
                    <div className={style.team}>
                        <Image
                            alt=""
                            className={style.image}
                            height={40}
                            src={match.homeLogo}
                            width={40}
                        />
                        <div className={style.teamName}>{match.homeChs}</div>
                    </div>
                    <div className={style.score}>
                        {match.state ? (
                            <NotStartedScore />
                        ) : (
                            <StartedScore
                                awayScore={globalMatchDetail.awayScore || match.awayScore}
                                homeScore={globalMatchDetail.homeScore || match.homeScore}
                                startTime={globalMatchDetail.startTime || match.startTime}
                                state={globalMatchDetail.state || match.state}
                            />
                        )}
                    </div>
                    <div className={style.team}>
                        <Image
                            alt=""
                            className={style.image}
                            height={40}
                            src={match.awayLogo}
                            width={40}
                        />
                        <div className={style.teamName}>{match.awayChs}</div>
                    </div>
                </div>
            </div>
            <div className={style.optionList}>
                {optionList.map(option => {
                    return (
                        <Link href={option.path} key={option.label}>
                            <div className={style.option}>
                                {option.icon}
                                <div className={style.text}>{option.label}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function LeagueCardList() {
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const matchList = useHomeStore.use.contestList();
    const globalStore = useContestInfoStore.use.contestInfo();

    return (
        <div className={style.leagueCardList}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="center"
                styling="button"
                swiperOpen={tabStyle.swiperOpen}
            >
                {Object.keys(matchList).map(leagueId => (
                    <Tab key={leagueId} label={matchList[Number(leagueId)].leagueChsShort}>
                        <div className={style.leagueList}>
                            {matchList[Number(leagueId)].list.map(match => {
                                return (
                                    <LeagueCard
                                        globalMatchDetail={{
                                            state: globalStore[match.matchId].state,
                                            homeScore: globalStore[match.matchId].homeScore,
                                            awayScore: globalStore[match.matchId].awayScore,
                                            startTime: globalStore[match.matchId].startTime
                                        }}
                                        key={match.matchId}
                                        leagueName={matchList[Number(leagueId)].leagueChsShort}
                                        match={match}
                                    />
                                );
                            })}
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default LeagueCardList;
