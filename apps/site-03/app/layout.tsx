import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import GlobalStore from './globalStore';

export const metadata: Metadata = {
    title: 'Sport',
    description: 'The best sport site'
};

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <GlobalStore>
                    <main>{children}</main>
                </GlobalStore>
            </body>
        </html>
    );
}

export default RootLayout;
