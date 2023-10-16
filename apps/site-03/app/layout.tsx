import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from './themeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sport',
    description: 'The best sport site'
};

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeRegistry>
                    <main>{children}</main>
                </ThemeRegistry>
            </body>
        </html>
    );
}

export default RootLayout;
