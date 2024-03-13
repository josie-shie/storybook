import type { Metadata } from 'next';
import Disclaimer from './disclaimer';

export const metadata: Metadata = {
    title: '免责声明 | FutureSport'
};

function Page() {
    return <Disclaimer />;
}

export default Page;
