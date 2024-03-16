'use client';
import { Slick } from 'ui';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import style from './aiPredict.module.scss';
import AiTodayMatches from './aiTodayMatches';
import AiHistory from './aiHistory';

function AiPredict() {
    const tabList = [
        { label: 'AI 今日赛事预测', status: 'aiTodayMatches' },
        { label: 'AI 历史预测', status: 'aiHistory' }
    ];

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Header />
            <div className={style.aiPredict}>
                <Slick
                    autoHeight
                    className={style.slick}
                    fixedTabs
                    initialSlide={0}
                    onSlickEnd={scrollTop}
                    resetHeightKey="aiPredictContent"
                    styling="button"
                    tabs={tabList}
                >
                    <AiTodayMatches />
                    <AiHistory />
                </Slick>
            </div>
            {/* <ConfirmPayDrawer
                isOpen={openPaid}
                onClose={() => {
                    setOpenPaid(false);
                }}
                onOpen={() => {
                    setOpenPaid(true);
                }}
                onPay={onSubmit}
                price={80}
            />
            <NormalDialog
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={goSubscribe}
                openDialog={openDialog}
                srcImage={Wallet}
            /> */}
            <Footer />
        </>
    );
}

export default AiPredict;
