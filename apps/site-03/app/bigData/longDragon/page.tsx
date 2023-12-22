import type { Metadata } from 'next';
import LongDragonResult from './longDragonResult';

export const metadata: Metadata = {
    title: '今日长龙赛事'
};

function Page() {
    return (
        <div className="longDragon">
            <LongDragonResult />
        </div>
    );
}

export default Page;
