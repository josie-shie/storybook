'use client';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Carousel from './components/carousel/carousel';
import HomeTeamIcon from './img/homeTeam.png';
import AwayTeamIcon from './img/awayTeam.png';
import liveImg from './img/live.png';
import { creatHomeStore } from './homeStore';
import LeagueCardList from './components/leagueCardList/leagueCardList';
import northBangKokClubIcon from './img/northBangkokClubIcon.png';
import thaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';

function Home() {
    creatHomeStore({
        slideList: [
            {
                id: 1,
                image: liveImg.src,
                leagueChs: '美国职业联赛',
                homeIcon: HomeTeamIcon.src,
                awayIcon: AwayTeamIcon.src,
                homeChs: '欧锦U20A',
                awayChs: '斯洛文尼亚U20',
                homeScore: 1,
                awayScore: 1,
                roundCn: 2,
                startTime: 1700619530,
                leagueChsShort: '英议联'
            },
            {
                id: 2,
                image: liveImg.src,
                leagueChs: '美国职业联赛',
                homeIcon: HomeTeamIcon.src,
                awayIcon: AwayTeamIcon.src,
                homeChs: '欧锦U20A',
                awayChs: '斯洛文尼亚U20',
                homeScore: 1,
                awayScore: 1,
                roundCn: 2,
                startTime: 1700619530,
                leagueChsShort: '英议联'
            },
            {
                id: 3,
                image: liveImg.src,
                leagueChs: '美国职业联赛',
                homeIcon: HomeTeamIcon.src,
                awayIcon: AwayTeamIcon.src,
                homeChs: '欧锦U20A',
                awayChs: '斯洛文尼亚U20',
                homeScore: 1,
                awayScore: 1,
                roundCn: 2,
                startTime: 1700619530,
                leagueChsShort: '英议联'
            }
        ],
        contestList: {
            英超: [
                {
                    matchId: 1,
                    leagueChsShort: '英超',
                    startTime: 1699583734,
                    matchTime: 57,
                    state: 0, // 進行中
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                },
                {
                    matchId: 2,
                    leagueChsShort: '英超',
                    matchTime: 0,
                    startTime: 1699583734,
                    state: 1, // 未開始
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                },
                {
                    matchId: 3,
                    leagueChsShort: '英超',
                    matchTime: 0,
                    startTime: 1699583734,
                    state: 1, // 未開始
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                }
            ],
            西甲: [
                {
                    matchId: 4,
                    leagueChsShort: '西甲',
                    matchTime: 0,
                    startTime: 1699583734,
                    state: 1, // 未開始
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                }
            ],
            德甲: [
                {
                    matchId: 5,
                    leagueChsShort: '德甲',
                    matchTime: 0,
                    startTime: 1699583734,
                    state: 1, // 未開始
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                }
            ],
            法甲: [
                {
                    matchId: 6,
                    leagueChsShort: '法甲',
                    matchTime: 0,
                    startTime: 1699583734,
                    state: 1, // 未開始
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                }
            ],
            義甲: [
                {
                    matchId: 7,
                    leagueChsShort: '義甲',
                    matchTime: 0,
                    startTime: 1699583734,
                    state: 1, // 未開始
                    homeChs: '北曼谷學院',
                    homeIcon: northBangKokClubIcon.src,
                    awayChs: '泰国国立法政大学',
                    awayIcon: thaiUniversityClubIcon.src,
                    onlineTotal: 1199,
                    homeScore: 1,
                    awayScore: 1
                }
            ]
        }
    });

    return (
        <>
            <Carousel />
            <LeagueCardList />
        </>
    );
}

export default Home;
