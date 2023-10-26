'use client';
import { Tab, Tabs } from 'ui';
import style from './infoTabs.module.scss';

function InfoTabs() {
    return (
        <div className={style.infoTabs}>
            <Tabs styling="underline" swiperOpen>
                <Tab label="分析">
                    <div className={style.tabContest} />
                </Tab>
                <Tab label="竟猜">
                    <div className={style.tabContest} />
                </Tab>
                <Tab label="关注">
                    <div className={style.tabContest} />
                </Tab>
            </Tabs>
        </div>
    );
}

export default InfoTabs;
