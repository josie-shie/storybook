import { Tab, Tabs } from 'ui';
import { useHomeStore } from '../../homeStore';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.svg';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.svg';
import PlayButton from './img/playButton.svg';
import Plan from './img/plan.svg';
import Professional from './img/professional.svg';
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
                    <PlayButton className={style.playButton} />
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
        { label: '競猜方案', icon: <Plan className={style.image} /> },
        { label: '專家預測', icon: <Professional className={style.image} /> }
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
                        <NorthBangKokClubIcon className={style.image} />
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
                        <ThaiUniversityClubIcon className={style.image} />
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
