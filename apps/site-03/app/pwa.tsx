'use client';
import { useEffect } from 'react';

function PWA() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then(registration => {
                        // eslint-disable-next-line -- PWA log
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        // eslint-disable-next-line -- PWA log
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }, []);
    return null;
}

export default PWA;
