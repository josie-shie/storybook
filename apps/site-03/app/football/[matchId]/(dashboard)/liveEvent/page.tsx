// import { getLiveText } from 'data-center';
import TabContent from '../../tabContent';

const textLiveMock = [
    { position: 0, time: '', data: '大家好，欢迎收看本场比赛直播，球员们正在热身，比赛即将开始' },
    { type: 22, position: 0, time: '', data: '随着主裁判一声哨响，上半场比赛开始' },
    { type: 22, position: 0, time: "1'", data: "1' - 随着主裁判一声哨响,上半场比赛开始" },
    {
        main: 1,
        type: 18,
        position: 1,
        time: "24'",
        data: "24' - 比赛第24分钟，加尔各答联合队取得了本场比赛的第1个角球"
    },
    {
        main: 1,
        type: 3,
        position: 2,
        time: "25'",
        data: "25' - 第1张黄牌，裁判出示了本场比赛的第一张黄牌，给了(苏德瓦德里FC)"
    },
    { main: 1, type: 18, position: 2, time: "37'", data: "37' - 第2个角球 - (苏德瓦德里FC)" },
    { type: 4, position: 0, time: "45'", data: "45' - 随着裁判一声哨响，上半场结束，目前比分0-0" },
    { main: 1, type: 11, position: 1, time: "45'", data: "45' - 加尔各答联合队换人" },
    { main: 1, type: 11, position: 1, time: "45'", data: "45' - 加尔各答联合队换人" },
    { main: 1, type: 11, position: 2, time: "45'", data: "45' - 苏德瓦德里FC换人" },
    { main: 1, type: 11, position: 2, time: "45'", data: "45' - 苏德瓦德里FC换人" },
    { main: 1, type: 3, position: 1, time: "61'", data: "61' - 第2张黄牌 - (加尔各答联合队)" },
    { main: 1, type: 11, position: 2, time: "63'", data: "63' - 苏德瓦德里FC换人" },
    { main: 1, type: 3, position: 1, time: "67'", data: "67' - 第3张黄牌 - (加尔各答联合队)" },
    { main: 1, type: 11, position: 1, time: "67'", data: "67' - 加尔各答联合队换人" },
    { main: 1, type: 11, position: 2, time: "73'", data: "73' - 苏德瓦德里FC换人" },
    { main: 1, type: 18, position: 1, time: "74'", data: "74' - 第3个角球 - (加尔各答联合队)" },
    { main: 1, type: 11, position: 2, time: "77'", data: "77' - 苏德瓦德里FC换人" },
    {
        main: 1,
        type: 1,
        position: 2,
        time: "81'",
        data: "81' - 第1个进球！Goooooooal！苏德瓦德里FC打进本场比赛第一个进球！"
    },
    { main: 1, type: 11, position: 1, time: "88'", data: "88' - 加尔各答联合队换人" },
    { main: 1, type: 2, position: 1, time: "90'", data: "90' - 第1张红牌 - (加尔各答联合队)" },
    { main: 1, type: 3, position: 1, time: "90'", data: "90' - 第4张黄牌 - (加尔各答联合队)" },
    { main: 1, type: 3, position: 1, time: "90'", data: "90' - 第5张黄牌 - (加尔各答联合队)" },
    { main: 1, type: 18, position: 1, time: "90'", data: "90' - 第4个角球 - (加尔各答联合队)" },
    {
        type: 12,
        position: 0,
        time: '',
        data: '本场比赛结束，最终比分为0-1，感谢大家关注，下次再会！'
    }
];

function Page({ params }: { params: { matchId: number } }) {
    // const broadcastList = await getLiveText(params.matchId);

    // if (!broadcastList.success) {
    //     return new Error();
    // }

    return (
        <TabContent
            fetchInitData={{ textLive: textLiveMock }}
            initStatus="liveEvent"
            matchId={params.matchId}
        />
    );
}

export default Page;
