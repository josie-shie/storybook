import { getInformation } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const information = await getInformation(params.matchId);

    if (!information.success) {
        return new Error();
    }

    return (
        <TabContent
            fetchInitData={{ information: information.data }}
            initStatus="information"
            matchId={params.matchId}
        />
    );
}

export default Page;
