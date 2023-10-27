import Predict from './predict';
import { creatPredictStore } from './predictStore';
import mentorIcon from './img/mentorIcon.jpg';

function Page() {
    creatPredictStore({
        predictList: [
            {
                mentor_avatar: mentorIcon,
                mentorId: 1,
                mentorName: '老梁聊球',
                rank: 10,
                onRoll: 9,
                homeChs: '格鲁吉亚',
                awayChs: '西班牙',
                max_accurate_streak: 11,
                price: 20,
                unlockTotal: 5,
                createdAt: '17:45'
            },
            {
                mentor_avatar: mentorIcon,
                mentorId: 2,
                mentorName: '老陳聊球',
                rank: 10,
                onRoll: 9,
                homeChs: '格鲁吉亚',
                awayChs: '西班牙',
                max_accurate_streak: 11,
                price: 20,
                unlockTotal: 5,
                createdAt: '17:45'
            },
            {
                mentor_avatar: mentorIcon,
                mentorId: 3,
                mentorName: '老黃聊球',
                rank: 10,
                onRoll: 9,
                homeChs: '格鲁吉亚',
                awayChs: '西班牙',
                max_accurate_streak: 11,
                price: 20,
                unlockTotal: 5,
                createdAt: '17:45'
            },
            {
                mentor_avatar: mentorIcon,
                mentorId: 4,
                mentorName: '老吳聊球',
                rank: 10,
                onRoll: 9,
                homeChs: '格鲁吉亚',
                awayChs: '西班牙',
                max_accurate_streak: 11,
                price: 20,
                unlockTotal: 5,
                createdAt: '17:45'
            },
            {
                mentor_avatar: mentorIcon,
                mentorId: 5,
                mentorName: '老李聊球',
                rank: 10,
                onRoll: 9,
                homeChs: '格鲁吉亚',
                awayChs: '西班牙',
                max_accurate_streak: 11,
                price: 20,
                unlockTotal: 5,
                createdAt: '17:45'
            }
        ]
    });
    return <Predict />;
}

export default Page;
