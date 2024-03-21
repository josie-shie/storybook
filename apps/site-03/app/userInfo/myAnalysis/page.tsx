import type { Metadata } from 'next';
import MyAnalysis from './myAnalysis';

export const metadata: Metadata = {
    title: '文章解锁纪录 | FutureSport'
};

function Page() {
    return (
        <div>
            <MyAnalysis />
        </div>
    );
}

export default Page;
