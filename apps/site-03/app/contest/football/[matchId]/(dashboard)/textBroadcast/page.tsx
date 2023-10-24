import TextBroadcast from './textBroadcast';

function Page() {
    const broadcastList = [
        {
            dateTime: '7/3 14:02:35',
            time: "16'",
            id: 14238334,
            content: '里斯蒂奇领到一张黄牌',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "17'",
            id: 14238335,
            content: '若昂·马里奥对对方球员粗野犯规被出示黄牌',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "28'",
            id: 14238336,
            content: '奥尔昆·科克库采取战术犯规阻止对手反击后，得到一张黄牌。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "29'",
            id: 14238337,
            content: '丹尼·罗阿德对对方球员粗野犯规被出示黄牌',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "33'",
            id: 14238338,
            content: '爱德华多·佩佩采取战术犯规阻止对手反击后，得到一张黄牌。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "43'",
            id: 14238339,
            content: '亚力山大·巴哈领到一张黄牌',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "47'",
            id: 14238340,
            content: '因为违反体育道德的行为，裁判向爱德华多·佩佩出示黄牌。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "47'",
            id: 14238341,
            content: '主裁判吹响上半场比赛结束的哨声。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "46'",
            id: 14238342,
            content: '下半场开始。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "46'",
            id: 14238343,
            content: '里斯蒂奇在战术换人中被戴维德·尤拉塞克替下。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "46'",
            id: 14238344,
            content: '若昂·马里奥在战术换人中被皮特·穆萨替下。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "50'",
            id: 14238345,
            content: '若奥·内维斯领到一张黄牌',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "51'",
            id: 14238346,
            content: '因为违反体育道德的行为，裁判向史蒂芬·欧斯塔奎奥出示黄牌。',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "56'",
            id: 14238347,
            content: '扎伊杜·萨努斯对对方球员粗野犯规被出示黄牌',
            homeName: '本菲卡',
            score: '0:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "62'",
            id: 14238348,
            content: '球进啦——迪马利亚右脚射门命中！',
            homeName: '本菲卡',
            score: '1:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "61'",
            id: 14238349,
            content: '奥尔昆·科克库为这个进球奉献了助攻。',
            homeName: '本菲卡',
            score: '1:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "66'",
            id: 14238350,
            content: '史蒂芬·欧斯塔奎奥在战术换人中被罗马里奥·巴罗替下。',
            homeName: '本菲卡',
            score: '1:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "66'",
            id: 14238351,
            content: '丹尼·罗阿德在战术换人中被托尼·马丁内斯替下。',
            homeName: '本菲卡',
            score: '1:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "68'",
            id: 14238352,
            content: '球进啦——皮特·穆萨右脚射门命中！',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "68'",
            id: 14238353,
            content: '拉法·席尔瓦为这个进球奉献了助攻。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "70'",
            id: 14238354,
            content: '格鲁伊奇在战术换人中被若昂·马里奥替下。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "70'",
            id: 14238355,
            content: '奥尔昆·科克库在战术换人中被弗洛伦蒂诺替下。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "75'",
            id: 14238356,
            content: '若奥·内维斯在战术换人中被奇奎尼奥替下。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "82'",
            id: 14238357,
            content: '扎伊杜·萨努斯在战术换人中被弗兰·纳瓦罗替下。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "82'",
            id: 14238358,
            content: '迈赫迪·塔雷米在战术换人中被冈卡洛·保尔格斯替下。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "84'",
            id: 14238359,
            content: '奇奎尼奥采取战术犯规阻止对手反击后，得到一张黄牌。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "87'",
            id: 14238360,
            content: '弗拉霍迪莫斯因拖延时间被出示黄牌',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "91'",
            id: 14238361,
            content: '罚下！——爱德华多·佩佩作出暴力行为后被罚下',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "92'",
            id: 14238362,
            content: '球进啦——温德森·格雷诺右脚射门命中！',
            homeName: '本菲卡',
            score: '2:1',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "92'",
            id: 14238363,
            content: '冈卡洛·保尔格斯为这个进球奉献了助攻。',
            homeName: '本菲卡',
            score: '2:1',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "98'",
            id: 14238364,
            content: '被罚下场！因为违反体育道德的行为，裁判向Sergio Conceicao出示红牌。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "102'",
            id: 14238365,
            content: '迪马利亚在战术换人中被切尔德鲁普替下。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        },
        {
            dateTime: '7/3 14:02:35',
            time: "106'",
            id: 14238366,
            content: '裁判吹响终场哨声。',
            homeName: '本菲卡',
            score: '2:0',
            awayName: '波尔图'
        }
    ];

    return <TextBroadcast broadcastList={broadcastList} />;
}

export default Page;
