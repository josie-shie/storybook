import type { Metadata } from 'next';
import MyGuess from './myGuess';

export const metadata: Metadata = {
    title: '我的竟猜 | FutureSport'
};

function Page() {
    return (
        <div className="myGuess">
            <MyGuess />
        </div>
    );
}

export default Page;
