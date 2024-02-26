'use client';
import type { Metadata } from 'next';
import { Slick } from 'ui';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/footer/footer';
import style from './masterAvatar.module.scss';
import Guess from './components/guess/guess';
import MasterItem from './components/masterItem/masterItem';
import AnalysisItem from './components/analysisItem/analysisItem';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
};

function MasterAvatar({ params }: { params: { masterId: string } }) {
    const [secondRender, setSecondRender] = useState(false);
    const [articleLength, setArticleLength] = useState(0);

    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    const tabList = [
        {
            label: '猜球',
            href: `/master/masterAvatar/${params.masterId}?status=guess`,
            status: 'guess'
        },
        {
            label: `预测文章(${articleLength})`,
            href: `/master/masterAvatar/${params.masterId}?status=analysis`,
            status: 'analysis'
        },
        {
            label: '关注',
            href: `/master/masterAvatar/${params.masterId}?status=focus`,
            status: 'focus'
        }
    ];

    const initialSlide = status ? tabList.findIndex(tab => tab.status === status) : 0;

    const onSlickEnd = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        setSecondRender(true);
    }, []);

    return (
        <>
            <div className={style.masterAvatar}>
                <Slick
                    autoHeight
                    className={style.slick}
                    initialSlide={initialSlide}
                    onSlickEnd={onSlickEnd}
                    styling="underline"
                    tabs={tabList}
                >
                    <div className={`${style.largeGap}`}>
                        {secondRender || status === 'guess' ? <Guess params={params} /> : null}
                    </div>
                    <div className={`${style.largeGap}`}>
                        {secondRender || status === 'analysis' ? (
                            <AnalysisItem params={params} setArticleLength={setArticleLength} />
                        ) : null}
                    </div>
                    <div className={`${style.largeGap}`}>
                        {secondRender || status === 'focus' ? <MasterItem params={params} /> : null}
                    </div>
                </Slick>
            </div>
            <Footer />
        </>
    );
}

export default MasterAvatar;
