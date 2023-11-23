import type { Metadata } from 'next';
import MyFocus from './myFocus';

export const metadata: Metadata = {
    title: '我的关注'
};

function Page() {
    return (
        <div className="myFocus">
            <MyFocus />
        </div>
    );
}

export default Page;
