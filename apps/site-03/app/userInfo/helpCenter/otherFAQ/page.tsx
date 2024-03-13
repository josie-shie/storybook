import type { Metadata } from 'next';
import Faq from './faq';

export const metadata: Metadata = {
    title: '其他FAQ | FutureSport'
};

function Page() {
    return <Faq />;
}

export default Page;
