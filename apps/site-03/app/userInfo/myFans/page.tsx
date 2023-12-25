import type { Metadata } from 'next';
import MyFans from './myFans';

export const metadata: Metadata = {
    title: '我的粉絲 | FutureSport'
};

function Page() {
    return (
        <div className="myFans">
            <MyFans />
        </div>
    );
}

export default Page;
