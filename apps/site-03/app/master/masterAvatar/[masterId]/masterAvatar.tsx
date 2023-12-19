'use client';
import type { Metadata } from 'next';
import InfoTabs from './infoTabs';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterAvatar({ params }: { params: { masterId: string } }) {
    return (
        <div className="masterAvatar">
            <InfoTabs params={params} />
        </div>
    );
}

export default MasterAvatar;
