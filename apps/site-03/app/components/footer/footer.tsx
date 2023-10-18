import { Footer } from 'ui';
import HomeIcon from './img/HomeIcon.svg';
import GameIcon from './img/Game.svg';
import RecommendIcon from './img/Recommend.svg';
import DataIcon from './img/Data.svg';
import NewsIcon from './img/News.svg';

const CategoryList = [
    {
        label: '首頁',
        value: '/',
        icon: <HomeIcon />
    },
    {
        label: '賽事',
        value: '/game',
        icon: <GameIcon />
    },
    {
        label: '推薦',
        value: '/recommedn',
        icon: <RecommendIcon />
    },
    {
        label: '數據',
        value: '/data',
        icon: <DataIcon />
    },
    {
        label: '消息',
        value: '/message',
        icon: <NewsIcon />
    }
];

function FooterComponent() {
    return <Footer activeColor="#276CE1" bgColor="#FFF" menuList={CategoryList} />;
}

export default FooterComponent;
