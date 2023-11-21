import type { Metadata } from 'next';
import ApplyExpert from './applyExpert';

export const metadata: Metadata = {
    title: '专家申请'
};

function Page() {
    return (
        <div className="applyExpert">
            <ApplyExpert />
        </div>
    );
}

export default Page;
