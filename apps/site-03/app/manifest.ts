import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'future sport',
        short_name: 'fsport',
        start_url: '/',
        display: 'fullscreen',
        theme_color: '#134BA8',
        background_color: '#134BA8',
        description: 'The best sport site!',
        icons: [
            {
                src: '/logo/launch-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/logo/launch-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/logo/launch-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/logo/launch-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ]
    };
}
