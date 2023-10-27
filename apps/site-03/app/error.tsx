'use client';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>ERROR:: Are you stupid?</h2>
            <div>Please check your head, if you have.</div>
        </div>
    );
}
