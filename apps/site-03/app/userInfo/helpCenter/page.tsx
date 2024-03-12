import type { Metadata } from 'next';
import HelpCenter from './helpCenter';

export const metadata: Metadata = {
    title: '说明中心 | FutureSport'
};

function Page() {
    return (
        <div className="helpCenter">
            <HelpCenter />
        </div>
    );
}

export default Page;
