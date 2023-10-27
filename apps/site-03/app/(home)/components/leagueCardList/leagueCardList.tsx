import { Tab, Tabs } from 'ui';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useHomeStore } from '../../homeStore';
import playButtonImg from './img/playButton.png';
import planImg from './img/plan.png';
import professionalImg from './img/professional.png';
import style from './leagueCardList.module.scss';

interface Match {
    matchId: number;
    leagueChsShort: string;
    startTime: string;
    state: number;
    homeChs: string;
    awayChs: string;
    matchTime: number;
    onlineTotal: number;
    homeScore: number;
    awayScore: number;
    homeIcon: string | StaticImageData;
    awayIcon: string | StaticImageData;
}

interface MatchProps {
    match: Match;
}

function StateComponent({ state }: { state: number }) {
    return (
        <div className={`${style.text} ${style.live} ${style.liveText}`}>
            {state ? null : (
                <>
                    直播中
                    <Image alt="" className={style.playButton} src={playButtonImg} />
                </>
            )}
        </div>
    );
}

function NotStartedScore() {
    return <div className={style.versus}>VS</div>;
}

function StartedScore({
    homeScore,
    awayScore,
    matchTime
}: {
    homeScore: number;
    awayScore: number;
    matchTime: number | null;
}) {
    return (
        <>
            <div className={style.scoreNumber}>
                {homeScore}-{awayScore}
            </div>
            <div className={style.timeTotal}>{matchTime}‘</div>
        </>
    );
}

function LeagueCard({ match }: MatchProps) {
    const optionList = [
        { label: '競猜方案', icon: <Image alt="" height={18} src={planImg} width={18} /> },
        { label: '專家預測', icon: <Image alt="" height={18} src={professionalImg} width={18} /> }
    ];

    return (
        <div className={style.leagueCard}>
            <div className={style.matchInfo}>
                <div className={style.leagueInfo}>
                    <div className={`${style.text} ${style.liveText}`}>{match.leagueChsShort}</div>
                    <div className={style.time}>{match.startTime}</div>
                    <StateComponent state={match.state} />
                </div>
                <div className={style.clubInfo}>
                    <div className={style.team}>
                        <Image
                            alt=""
                            className={style.image}
                            height={40}
                            src={match.homeIcon}
                            width={40}
                        />
                        <div className={style.teamName}>{match.homeChs}</div>
                    </div>
                    <div className={style.score}>
                        {match.state ? (
                            <NotStartedScore />
                        ) : (
                            <StartedScore
                                awayScore={match.awayScore}
                                homeScore={match.homeScore}
                                matchTime={match.matchTime}
                            />
                        )}
                    </div>
                    <div className={style.team}>
                        <Image
                            alt=""
                            className={style.image}
                            height={40}
                            src={match.awayIcon}
                            width={40}
                        />
                        <div className={style.teamName}>{match.awayChs}</div>
                    </div>
                </div>
            </div>
            <div className={style.optionList}>
                {optionList.map(option => {
                    return (
                        <div className={style.option} key={option.label}>
                            {option.icon}
                            <div className={style.text}>{option.label}</div>
                        </div>
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

    return (
        <div className={style.leagueCardList}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="center"
                styling="button"
                swiperOpen={tabStyle.swiperOpen}
            >
                {Object.keys(matchList).map(leagueName => (
                    <Tab key={leagueName} label={leagueName}>
                        <div className={style.leagueList}>
                            {matchList[leagueName].map(match => {
                                return <LeagueCard key={match.matchId} match={match} />;
                            })}
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default LeagueCardList;
