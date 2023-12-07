import { getTodayGuessMatches } from 'data-center';
import Contest from './contest/contest';

async function Page() {
    const todayGuess = await getTodayGuessMatches({ memberId: 1 });

    if (!todayGuess.success) {
        return new Error();
    }

    return (
        <div className="recommendContest">
            <Contest todayGuess={todayGuess.data} />
        </div>
    );
}

export default Page;
