'use client';
import GuessDetail from '@/app/guess/detail/[matchId]/guessDetail';
import { useLockBodyScroll } from '@/hooks/lockScroll';

function GuessDetailLayout() {
    useLockBodyScroll();

    return <GuessDetail backHistory />;
}

export default GuessDetailLayout;
