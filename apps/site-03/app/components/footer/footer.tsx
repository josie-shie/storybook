import { Footer } from 'ui';
import Image from 'next/image';
import HomeIcon from './img/HomeIcon.svg';
import GameIcon from './img/Game.svg';
import RecommendIcon from './img/Recommend.svg';
import DataIcon from './img/Data.svg';
import NewsIcon from './img/News.svg';

const CategoryList = [
    {
        label: '首頁',
        value: '/',
        icon: <Image alt="" src={HomeIcon as string} />
    },
    {
        label: '賽事',
        value: '/game',
        icon: <Image alt="" src={GameIcon as string} />
    },
    {
        label: '推薦',
        value: '/recommedn',
        icon: <Image alt="" src={RecommendIcon as string} />
    },
    {
        label: '數據',
        value: '/data',
        icon: <Image alt="" src={DataIcon as string} />
    },
    {
        label: '消息',
        value: '/message',
        icon: <Image alt="" src={NewsIcon as string} />
    }
];

function FooterComponent() {
    return <Footer activeColor="#276CE1" bgColor="#FFF" menuList={CategoryList} />;
}

export default FooterComponent;
