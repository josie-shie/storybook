import { getPostList } from 'data-center';
import Predict from './predict';

async function Page({ params }: { params: { matchId: number } }) {
    const predictData = await getPostList({
        memberId: 1,
        filterId: [params.matchId],
        postFilter: ['match'],
        currentPage: 1,
        pageSize: 10
    });

    if (!predictData.success) {
        return new Error();
    }
    return <Predict matchId={params.matchId} predictData={predictData.data} />;
}

export default Page;
