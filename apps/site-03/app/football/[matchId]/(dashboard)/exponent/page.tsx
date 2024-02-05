import { getExponent } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const exponentData = await getExponent(params.matchId);

    const errorHandleDate = {
        companyInfo: {
            handicap: [],
            overUnder: [],
            winDrawLose: [],
            corners: []
        },
        companyList: {
            handicap: [],
            overUnder: [],
            winDrawLose: [],
            corners: []
        }
    };

    if (!exponentData.success) {
        console.error(exponentData.error);
    }

    return (
        <TabContent
            fetchInitData={{ exponent: exponentData.success ? exponentData.data : errorHandleDate }}
            initStatus="exponent"
            matchId={params.matchId}
        />
    );
}

export default Page;
