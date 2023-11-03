import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import GlobalStore from './globalStore';
import MqttService from './mqttService';

export const metadata: Metadata = {
    title: 'Sport',
    description: 'The best sport site'
};

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <GlobalStore>
                    <MqttService>
                        <main>{children}</main>
                    </MqttService>
                </GlobalStore>
            </body>
        </html>
    );
}

export default RootLayout;
