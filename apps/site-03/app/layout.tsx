import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getMemberInfo, type GetMemberInfoResponse } from 'data-center';
import Notification from '@/app/notification';
import Auth from '@/app/(auth)/auth';
import GlobalStore from './globalStore';
import MqttService from './mqttService';
import WebsocketService from './websocketService';
import GoalAlert from './goalAlert';
import ContestStoreHandler from './contestStoreHandler';
import NewMessageAlert from './newMessageAlert';

export const metadata: Metadata = {
    title: '未来体育 | FutureSport',
    description: 'The best sport site'
};

async function RootLayout({ children }: { children: ReactNode }) {
    function printMemoryUsage() {
        const memoryUsage = process.memoryUsage();
        // eslint-disable-next-line -- check memory
        console.log({
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
        });
    }

    printMemoryUsage();

    const isCookieExist = cookies().get('access')?.value;
    let userInfo: GetMemberInfoResponse | null = null;
    if (isCookieExist) {
        try {
            const res = await getMemberInfo(isCookieExist);
            if (res.success) userInfo = res.data;
        } catch (e) {
            // eslint-disable-next-line -- Error Log
            console.log('user info error:', e);
        }
    }

    return (
        <html lang="cn">
            <body className="rootStyle">
                <GlobalStore>
                    <MqttService>
                        <WebsocketService>
                            <ContestStoreHandler />
                            <GoalAlert />
                            <NewMessageAlert />
                            <Auth userInfo={userInfo} />
                            <Notification />
                            <main>{children}</main>
                        </WebsocketService>
                    </MqttService>
                </GlobalStore>
            </body>
        </html>
    );
}

export default RootLayout;
