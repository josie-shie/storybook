import type { Metadata } from 'next';
import { getContestList } from 'data-center';
import { cookies } from 'next/headers';
import List from './list';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: '未来体育 | FutureSport'
};

async function Page() {
    const timestamp = Math.floor(Date.now() / 1000);
    const todayContest = await getContestList(timestamp);
    const cookieStore = cookies();
    const pinnedContest = JSON.parse(cookieStore.get('pinnedContest')?.value || '[]') as number[];

    if (!todayContest.success) {
        return new Error();
    }

    return (
        <div className="footballContest">
            <List pinnedContest={pinnedContest} todayContest={todayContest.data} />
        </div>
    );
}

export default Page;
