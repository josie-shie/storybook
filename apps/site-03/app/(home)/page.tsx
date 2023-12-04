import { getHotMatchList, getHomepageBanner } from 'data-center';
import Home from './home';

async function Page() {
    const timestamp = Math.floor(Date.now() / 1000);

    const hotMatchList = await getHotMatchList({ dateTime: timestamp });
    const carouselList = await getHomepageBanner({ dateTime: timestamp });

    if (!hotMatchList.success || !carouselList.success) {
        return new Error();
    }

    return <Home carouselList={carouselList.data} hotMatchList={hotMatchList.data} />;
}

export default Page;
