import type { Metadata } from 'next';
import { getContestList } from 'data-center';
import { cookies } from 'next/headers';
import List from './list';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: '智球网 - AI足球预测与全球即时比分 - 精准快速',
    description:
        '智球网结合先进的 AI 技术提供全球足球赛事的即时比分和精准预测。 无论是大联赛、杯赛或国际赛事，我们的 AI 预测让您领先一步，掌握比赛动态。 立即探索我们的即时比分和专业预测，不错过任何精彩瞬间！'
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
