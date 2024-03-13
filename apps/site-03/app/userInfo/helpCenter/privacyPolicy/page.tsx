import type { Metadata } from 'next';
import PrivacyPolicy from './privacyPolicy';

export const metadata: Metadata = {
    title: '说明中心 | FutureSport'
};

function Page() {
    return <PrivacyPolicy />;
}

export default Page;
