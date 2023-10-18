import type { Metadata } from 'next';
import Football from './football';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function Page() {
    return (
        <div className="footballContest">
            <Football />
        </div>
    );
}

export default Page;
