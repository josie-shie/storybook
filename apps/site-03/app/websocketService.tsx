'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getForbiddenWords } from 'data-center';
import { initWebSocket, messageService } from 'lib';
import { createMessageStore, useMessageStore } from './messageStore';

function useMessageWs({ children }: { children: ReactNode }) {
    createMessageStore({ forbiddenWords: [] });
    const setForbiddenWords = useMessageStore.use.setForbiddenWords();

    useEffect(() => {
        messageService.closeWS();

        initWebSocket({
            url: process.env.NEXT_PUBLIC_MESSAGE_PATH || '',
            onOpen: () => {
                void messageService.send({
                    action: 'init',
                    token: Cookies.get('access') || ''
                });
            }
        });
        return () => {
            messageService.closeWS();
        };
    }, []);

    useEffect(() => {
        const fetchForbiddenWords = async () => {
            const forbiddenWords = await getForbiddenWords();

            if (forbiddenWords.success) {
                const forbiddenWordList = forbiddenWords.data.map(forbiddenWord => {
                    return forbiddenWord.forbidden_word;
                });

                setForbiddenWords({ forbiddenWords: forbiddenWordList });
            }
        };

        void fetchForbiddenWords();
    }, []);

    return <>{children}</>;
}

export default useMessageWs;
