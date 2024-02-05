import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'future sport',
        short_name: 'fsport',
        start_url: '/',
        display: 'fullscreen',
        theme_color: '#1055C8',
        background_color: '#1055C8',
        description: 'The best sport site!',
        icons: [
            {
                src: '/logo/launch_48.png',
                sizes: '48x48',
                type: 'image/png'
            },
            {
                src: '/logo/launch_72.png',
                sizes: '72x72',
                type: 'image/png'
            },
            {
                src: '/logo/launch_192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/logo/launch_512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    };
}
