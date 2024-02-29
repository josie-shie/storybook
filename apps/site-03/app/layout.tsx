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
        <html lang="zh-Hans">
            <head>
                <meta content="yes" name="apple-mobile-web-app-capable" />
                <link href="/logo/launch-192.png" rel="apple-touch-icon" />
                <link
                    href="/logo/apple-splash-2048-2732.jpg"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2732-2048.jpg"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1668-2388.jpg"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2388-1668.jpg"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1536-2048.jpg"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2048-1536.jpg"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1488-2266.jpg"
                    media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2266-1488.jpg"
                    media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1640-2360.jpg"
                    media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2360-1640.jpg"
                    media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1668-2224.jpg"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2224-1668.jpg"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1620-2160.jpg"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2160-1620.jpg"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1290-2796.jpg"
                    media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2796-1290.jpg"
                    media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1179-2556.jpg"
                    media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2556-1179.jpg"
                    media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1284-2778.jpg"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2778-1284.jpg"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1170-2532.jpg"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2532-1170.jpg"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1125-2436.jpg"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2436-1125.jpg"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1242-2688.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2688-1242.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-828-1792.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1792-828.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1242-2208.jpg"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-2208-1242.jpg"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-750-1334.jpg"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1334-750.jpg"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-640-1136.jpg"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/logo/apple-splash-1136-640.jpg"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    rel="apple-touch-startup-image"
                />
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
