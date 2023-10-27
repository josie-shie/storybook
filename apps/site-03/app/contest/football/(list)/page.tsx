import type { Metadata } from 'next';
import { getContestList } from 'data-center';
import Football from './football';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

async function Page() {
    const todayContest = await getContestList(1692038043);

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
