import { getTodayGuessMatches } from 'data-center';
import GuessIndex from './guessIndex';

async function Page() {
    const todayGuess = await getTodayGuessMatches();

    if (!todayGuess.success) {
        return new Error();
    }

    return <GuessIndex todayGuess={todayGuess.data} />;
}

export default Page;
