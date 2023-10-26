import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from './themeRegistry';

export const metadata: Metadata = {
    title: 'Sport',
    description: 'The best sport site'
};

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <main>{children}</main>
                </ThemeRegistry>
            </body>
        </html>
    );
}

export default RootLayout;
