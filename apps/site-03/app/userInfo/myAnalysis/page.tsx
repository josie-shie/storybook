import type { Metadata } from 'next';
import MyAnaylsis from './myAnalysis';

export const metadata: Metadata = {
    title: '個人中心'
};

function Page() {
    return (
        <div>
            <MyAnaylsis />
        </div>
    );
}

export default Page;
