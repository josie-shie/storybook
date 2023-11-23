'use client';
import type { Metadata } from 'next';
import InfoTabs from './infoTabs';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterAvatar() {
    return (
        <div className="masterAvatar">
            <InfoTabs />
        </div>
    );
}

export default MasterAvatar;
