import type { Metadata } from 'next';
import Edit from './edit';

export const metadata: Metadata = {
    title: '個人資料'
};

function Page() {
    return (
        <div className="userInfo">
            <Edit />
        </div>
    );
}

export default Page;
