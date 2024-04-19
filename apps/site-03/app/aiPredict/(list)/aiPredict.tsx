'use client';
import { Slick } from 'ui';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import style from './aiPredict.module.scss';
import AiTodayMatches from './aiTodayMatches';
import AiHistory from './aiHistory';

function AiPredict() {
    const tabList = [
        {
            label: 'AI 今日赛事预测',
            status: 'today'
        },
        {
            label: 'AI 历史预测',
            status: 'history'
        }
    ];

    return (
        <>
            <Header />
            <div className={style.aiPredict}>
                <Slick
                    autoHeight
                    className={style.slick}
                    fixedTabs
                    isSliderMove={false}
                    onSlickEnd={() => {
                        return null;
                    }}
                    resetHeightKey="aiPredictContent"
                    styling="button"
                    tabs={tabList}
                >
                    <div className={style.largeGap}>
                        <AiTodayMatches />
                    </div>
                    <div className={style.largeGap}>
                        <AiHistory />
                    </div>
                </Slick>
            </div>
            <Footer />
        </>
    );
}

export default AiPredict;
