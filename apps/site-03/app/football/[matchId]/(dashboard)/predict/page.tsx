import { getPostList } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const predictData = await getPostList({
        memberId: 1,
        filterId: [params.matchId],
        postFilter: ['match'],
        pagination: {
            currentPage: 1,
            perPage: 10
        }
    });

    if (!predictData.success) {
        return new Error();
    }
    return (
        <TabContent
            fetchInitData={{ predict: predictData.data }}
            initStatus="predict"
            matchId={params.matchId}
        />
    );
}

export default Page;
