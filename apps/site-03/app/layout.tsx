import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import GlobalStore from './globalStore';
import MqttService from './mqttService';
import GoalAlert from './goalAlert';
import ContestStoreHandler from './contestStoreHandler';

export const metadata: Metadata = {
    title: 'Sport',
    description: 'The best sport site'
};

function RootLayout({ children }: { children: ReactNode }) {
    function printMemoryUsage() {
        const memoryUsage = process.memoryUsage();
        // eslint-disable-next-line -- check memory
        console.log({
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
        });
    }
    printMemoryUsage();

    return (
        <html lang="en">
            <body>
                <GlobalStore>
                    <MqttService>
                        <ContestStoreHandler />
                        <GoalAlert />
                        <main>{children}</main>
                    </MqttService>
                </GlobalStore>
            </body>
        </html>
    );
}

export default RootLayout;
