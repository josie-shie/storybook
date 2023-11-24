import { getContestList } from 'data-center';
import Contest from './contest/contest';

async function Page() {
    const timestamp = Math.floor(Date.now() / 1000);
    const todayContest = await getContestList(timestamp);

    // eslint-disable-next-line -- Timestamp for testing
    console.log('現在時間戳記：', timestamp);

    if (!todayContest.success) {
        return new Error();
    }

    return (
        <div className="recommendContest">
            <Contest todayContest={todayContest.data} />
        </div>
    );
}

export default Page;
