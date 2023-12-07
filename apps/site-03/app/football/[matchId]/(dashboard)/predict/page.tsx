import { getMatchPosts } from 'data-center';
import Predict from './predict';

async function Page({ params }: { params: { matchId: number } }) {
    const predictData = await getMatchPosts({
        currentPage: 1,
        pageSize: 10,
        matchId: params.matchId
    });

    if (!predictData.success) {
        return new Error();
    }
    return <Predict predictData={predictData.data} />;
}

export default Page;
