import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getMemberInfo, type GetMemberInfoResponse } from 'data-center';
import Script from 'next/script';
import Notification from '@/app/notification';
import Auth from '@/app/(auth)/auth';
import GlobalStore from './globalStore';
import MqttService from './mqttService';
import WebsocketService from './websocketService';
import GoalAlert from './goalAlert';
import NewMessageAlert from './newMessageAlert';
import Pwa from './pwa';

export const metadata: Metadata = {
    title: '未来体育 | FutureSport',
    description: 'The best sport site'
};

function GoogleAnalytics() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="google-analytics">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
   
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
            </Script>
        </>
    );
}

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
            <head>
                <link href="/logo/launch_192.png" rel="apple-touch-icon" sizes="192x192" />
                <link href="/logo/launch_192.png" rel="apple-touch-startup-image" sizes="192x192" />
                <link href="/logo/launch_512.png" rel="apple-touch-startup-image" sizes="512x512" />
                <meta content="yes" name="apple-mobile-web-app-capable" />
                <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
                <meta content="fsport" name="apple-mobile-web-app-title" />
                <meta content="#134BA8" name="theme-color" />
            </head>
            <body className="rootStyle">
                <GlobalStore>
                    <MqttService>
                        <WebsocketService>
                            <GoalAlert />
                            <NewMessageAlert />
                            <Auth userInfo={userInfo} />
                            <Notification />
                            <main>{children}</main>
                        </WebsocketService>
                    </MqttService>
                </GlobalStore>
                <GoogleAnalytics />
                <Pwa />
            </body>
        </html>
    );
}

export default RootLayout;
