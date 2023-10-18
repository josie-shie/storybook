import { Tab, Tabs } from 'ui';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.svg';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.svg';
import PlayButton from './img/playButton.svg';
import Plan from './img/plan.svg';
import Professional from './img/professional.svg';
import Analysis from './img/analysis.svg';
import User from './img/user.svg';
import style from './leagueCardList.module.scss';

interface Match {
    matchId: number;
    leagueChsShort: string;
    startTime: string;
    state: number;
    homeChs: string;
    awayChs: string;
    matchTime: number | null;
    onlineTotal: number;
    homeScore: number;
    awayScore: number;
}

interface MatchProps {
    match: Match;
}

function StartedComponent() {
    return (
        <div className={`${style.text} ${style.live} ${style.liveText}`}>
            直播中
            <PlayButton className={style.playButton} />
        </div>
    );
}

function NotStartedComponent({ total }: { total: number }) {
    return (
        <div className={`${style.text} ${style.notStartedText}`}>
            <User />
            <span>{total}</span>
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
        { label: '專家預測', icon: <Professional className={style.image} /> },
        { label: '風向數據分析', icon: <Analysis className={style.image} /> }
    ];

    return (
        <div className={style.leagueCard}>
            <div className={style.matchInfo}>
                <div className={style.leagueInfo}>
                    <div className={style.text}>{match.leagueChsShort}</div>
                    <div className={style.time}>2023-8-23 11:30</div>
                    {match.state ? <NotStartedComponent total={1199} /> : <StartedComponent />}
                </div>
                <div className={style.clubInfo}>
                    <div className={style.team}>
                        <NorthBangKokClubIcon className={style.image} />
                        <div className={style.teamName}>北曼谷學院</div>
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
                        <div className={style.teamName}>泰国国立法政大学</div>
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
        background: '#F8F8F8',
        textColor: '#8D8D8D',
        fontSize: 14,
        buttonRadius: 30,
        buttonColor: 'transparent'
    };

    const matchList: Match[] = [
        {
            matchId: 1,
            leagueChsShort: '英超',
            startTime: '2023-8-23 11:30',
            matchTime: 57,
            state: 0, // 進行中
            homeChs: '北曼谷學院',
            awayChs: '泰国国立法政大学',
            onlineTotal: 1199,
            homeScore: 1,
            awayScore: 1
        },
        {
            matchId: 2,
            leagueChsShort: '英超',
            matchTime: null,
            startTime: '2023-8-23 11:30',
            state: 1, // 未開始
            homeChs: '北曼谷學院',
            awayChs: '泰国国立法政大学',
            onlineTotal: 1199,
            homeScore: 1,
            awayScore: 1
        }
    ];

    return (
        <Tabs
            buttonRadius={tabStyle.buttonRadius}
            gap={tabStyle.gap}
            position="center"
            styling="button"
            swiperOpen={tabStyle.swiperOpen}
        >
            <Tab label="英超">
                <div className={style.tabContentForTest}>
                    <div className={style.leagueList}>
                        {matchList.map(option => {
                            return <LeagueCard key={option.matchId} match={option} />;
                        })}
                    </div>
                </div>
            </Tab>
            <Tab label="西甲">
                <div className={style.tabContentForTest}>Content for Tab 2</div>
            </Tab>
            <Tab label="德甲">
                <div className={style.tabContentForTest}>Content for Tab 3</div>
            </Tab>
            <Tab label="法甲">
                <div className={style.tabContentForTest}>Content for Tab 4</div>
            </Tab>
            <Tab label="義甲">
                <div className={style.tabContentForTest}>Content for Tab 5</div>
            </Tab>
        </Tabs>
    );
}

export default LeagueCardList;
