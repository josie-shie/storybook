import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '未来体育 | FutureSport',
    description: 'The best sport site'
};

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="zh-Hans">
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}

export default RootLayout;
