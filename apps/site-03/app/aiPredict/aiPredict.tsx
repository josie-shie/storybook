'use client';
import { Slick } from 'ui';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import ScrollTop from '@/components/scrollTop/scrollTop';
import style from './aiPredict.module.scss';
import AiTodayMatches from './aiTodayMatches';
import AiHistory from './aiHistory';

function AiPredict() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    const tabList = [
        {
            label: 'AI 今日赛事预测',
            href: '/aiPredict?status=today',
            status: 'today'
        },
        {
            label: 'AI 历史预测',
            href: '/aiPredict?status=history',
            status: 'history'
        }
    ];

    const initialSlide = status ? tabList.findIndex(tab => tab.status === status) : 0;

    return (
        <>
            <Header />
            <div className={style.aiPredict}>
                <Slick
                    autoHeight
                    className={style.slick}
                    fixedTabs
                    initialSlide={initialSlide}
                    onSlickEnd={() => {
                        return null;
                    }}
                    resetHeightKey="aiPredictContent"
                    styling="button"
                    tabs={tabList}
                >
                    <div className={style.largeGap}>{status === 'today' && <AiTodayMatches />}</div>
                    <div className={style.largeGap}>{status === 'history' && <AiHistory />}</div>
                </Slick>
            </div>
            <ScrollTop />
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
