import type { Metadata } from 'next';
import { getContestList } from 'data-center';
import Football from './football';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: '赛事 | Sport'
};

async function Page() {
    const timestamp = Math.floor(Date.now() / 1000);
    const todayContest = await getContestList(timestamp);

    // eslint-disable-next-line -- Timestamp for testing
    console.log('現在時間戳記：', timestamp);

    if (!todayContest.success) {
        return new Error();
    }

    return (
        <div className="footballContest">
            <Football todayContest={todayContest.data} />
        </div>
    );
}

export default Page;
