'use client';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import type { GetHotMatchListResponse, GetHomepageBannerResponse } from 'data-center';
import Carousel from './components/carousel/carousel';
import { creatHomeStore } from './homeStore';
import LeagueCardList from './components/leagueCardList/leagueCardList';

function Home({
    hotMatchList,
    carouselList
}: {
    hotMatchList: GetHotMatchListResponse;
    carouselList: GetHomepageBannerResponse;
}) {
    creatHomeStore({
        slideList: carouselList.matchs,
        bannerList: carouselList.banners,
        contestList: hotMatchList
    });

    return (
        <>
            <Carousel />
            <LeagueCardList />
        </>
    );
}

export default Home;
