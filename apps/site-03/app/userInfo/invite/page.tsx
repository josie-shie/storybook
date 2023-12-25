import type { Metadata } from 'next';
import Invite from './invite';

export const metadata: Metadata = {
    title: '推荐给朋友 | FutureSport'
};

function Page() {
    return (
        <div className="invite">
            <Invite />
        </div>
    );
}

export default Page;
