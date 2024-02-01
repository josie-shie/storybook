'use client';
import type { Metadata } from 'next';
import { Slick } from 'ui/stories/slickPro/slick';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './memberAvatar.module.scss';
import Guess from './components/guess/guess';
import MemberItem from './components/memberItem/memberItem';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
};

function MasterAvatar({ params }: { params: { memberId: string } }) {
    const [secondRender, setSecondRender] = useState(false);

    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    const tabList = [
        {
            label: '猜球',
            href: `/master/memberAvatar/${params.memberId}?status=guess`,
            status: 'guess'
        },
        {
            label: '关注',
            href: `/master/memberAvatar/${params.memberId}?status=focus`,
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
        <div className={style.memberAvatar}>
            <Slick
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
                    {secondRender || status === 'focus' ? <MemberItem params={params} /> : null}
                </div>
            </Slick>
        </div>
    );
}

export default MasterAvatar;
