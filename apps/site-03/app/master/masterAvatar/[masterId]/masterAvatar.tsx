'use client';
import type { Metadata } from 'next';
import InfoTabs from './infoTabs';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterAvatar({
    params,
    setArticleLength
}: {
    params: { masterId: string };
    setArticleLength: (val: number) => void;
}) {
    return (
        <div className="masterAvatar">
            <InfoTabs params={params} setArticleLength={setArticleLength} />
        </div>
    );
}

export default MasterAvatar;
