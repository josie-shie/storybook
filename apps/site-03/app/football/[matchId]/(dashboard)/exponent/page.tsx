import { getExponent } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const exponentData = await getExponent(params.matchId, 0);

    if (!exponentData.success) {
        return new Error();
    }

    return (
        <TabContent
            fetchInitData={{ exponent: exponentData.data }}
            initStatus="exponent"
            matchId={params.matchId}
        />
    );
}

export default Page;
