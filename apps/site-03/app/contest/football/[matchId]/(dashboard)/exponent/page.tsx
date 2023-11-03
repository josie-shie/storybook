import { getExponent } from 'data-center';
import Exponent from './exponent';

async function Page({ params }: { params: { matchId: number } }) {
    const exponentData = await getExponent(params.matchId, 0);

    if (!exponentData.success) {
        return new Error();
    }

    return <Exponent exponentData={exponentData.data} />;
}

export default Page;
