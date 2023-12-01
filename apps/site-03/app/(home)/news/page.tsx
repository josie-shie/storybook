import { getLeisuNewsList } from 'data-center';
import News from './news';

async function Page() {
    const newsList = await getLeisuNewsList();

    if (!newsList.success) {
        return new Error();
    }

    return <News newsList={newsList.data} />;
}

export default Page;
