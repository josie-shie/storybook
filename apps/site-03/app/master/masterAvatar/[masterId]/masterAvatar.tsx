'use client';
import type { Metadata } from 'next';
import InfoTabs from './infoTabs';
import style from './masterAvatar.module.scss';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
};

function MasterAvatar({
    params,
    setArticleLength
}: {
    params: { masterId: string };
    setArticleLength: (val: number) => void;
}) {
    return (
        <div className={style.masterAvatar}>
            <InfoTabs params={params} setArticleLength={setArticleLength} />
        </div>
    );
}

export default MasterAvatar;
