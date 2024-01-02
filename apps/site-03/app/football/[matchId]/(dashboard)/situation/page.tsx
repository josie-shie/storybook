import { getDetailStatus } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const situationData = await getDetailStatus(params.matchId);

    if (!situationData.success) {
        return new Error();
    }

    return (
        <TabContent
            fetchInitData={{ situation: situationData.data }}
            initStatus="situation"
            matchId={params.matchId}
        />
    );
}

export default Page;
