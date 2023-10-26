export const soundSource: Record<string, string> = {
    bell: '/sound/bell.mp3',
    drum: '/sound/drum.mp3',
    horn: '/sound/horn.mp3',
    whistle: '/sound/whistle.mp3'
};

export const soundList = ['whistle', 'bell', 'drum', 'horn'];

export const soundMap: Record<string, string> = {
    whistle: '哨子声',
    bell: '铃铛声',
    drum: '鼓声',
    horn: '号角'
};

export const soundDefault = {
    goalTip: false,
    goalSound: false,
    homeSound: 'whistle',
    awaySound: 'whistle'
};

export interface Sound {
    goalTip: boolean;
    goalSound: boolean;
    homeSound: string;
    awaySound: string;
}
