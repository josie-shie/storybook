import type { Metadata } from 'next';
import { getContestList } from 'data-center';
import CreateArticle from './createArticle';

export const metadata: Metadata = {
    title: '发布文章 | FutureSport'
};

async function Page() {
    const timestamp = Math.floor(Date.now() / 1000);
    const todayContest = await getContestList(timestamp);

    if (!todayContest.success) {
        return new Error();
    }

    return (
        <div>
            <CreateArticle todayContest={todayContest.data} />
        </div>
    );
}

export default Page;
