import type { ReactNode } from 'react';
import Header from '../components/headerSwitch/header';
import { Tabs } from '../components/tabs/tabs';
import style from './recommend.module.scss';

function RecommendLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className={style.layout}>
                <Tabs
                    labels={['競猜', '專家預測', '大數據分析']}
                    paths={['/recommend/guess', '/recommend/predict', '/recommend/bigData']}
                />
                {children}
            </div>
        </>
    );
}

export default RecommendLayout;
