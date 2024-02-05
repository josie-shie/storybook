import { getLineup } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const lineUpData = await getLineup(params.matchId);

    if (!lineUpData.success) {
        return new Error();
    }
    return (
        <TabContent
            fetchInitData={{ lineUpData: lineUpData.data }}
            initStatus="lineUp"
            matchId={params.matchId}
        />
    );
}

export default Page;
