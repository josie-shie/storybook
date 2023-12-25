import type { Metadata } from 'next';
import MyAnaylsis from './myAnalysis';

export const metadata: Metadata = {
    title: '未来体育 | FutureSport'
};

function Page() {
    return (
        <div>
            <MyAnaylsis />
        </div>
    );
}

export default Page;
