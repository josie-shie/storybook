import Situation from './situation';

function Page() {
    const situationData = {
        handicapsData: {
            half: {},
            full: {}
        },
        totalGoalsData: {
            half: {},
            full: {}
        },
        eventList: [
            '15',
            '16',
            '27',
            '29',
            '33',
            '43',
            '45',
            '46',
            '49',
            '51',
            '55',
            '61',
            '65',
            '68',
            '69',
            '70',
            '75',
            '81',
            '84',
            '87',
            '90'
        ],
        eventInfo: {
            isHome: {
                '15': {
                    id: 11088497,
                    isHome: true,
                    kind: 3,
                    time: '15',
                    nameEn: 'Mihailo Ristic',
                    nameChs: '里斯蒂奇',
                    nameCht: '米希路列斯迪',
                    playerId: '129096',
                    playerId2: '',
                    overtime: '0'
                },
                '16': {
                    id: 11088499,
                    isHome: true,
                    kind: 3,
                    time: '16',
                    nameEn: 'Joao Mario',
                    nameChs: '马里奥',
                    nameCht: '祖奧馬利奧',
                    playerId: '95598',
                    playerId2: '',
                    overtime: '0'
                },
                '27': {
                    id: 11088521,
                    isHome: true,
                    kind: 3,
                    time: '27',
                    nameEn: 'Orkun Kokcu',
                    nameChs: '考克库',
                    nameCht: '奧昆高古',
                    playerId: '164757',
                    playerId2: '',
                    overtime: '0'
                },
                '43': {
                    id: 11088552,
                    isHome: true,
                    kind: 3,
                    time: '43',
                    nameEn: 'Alexander Bahr',
                    nameChs: '亚力山大巴尔',
                    nameCht: '亞力山大巴爾',
                    playerId: '167534',
                    playerId2: '',
                    overtime: '0'
                },
                '46': {
                    id: 11088590,
                    isHome: true,
                    kind: 11,
                    time: '46',
                    nameEn: 'David Jurasek↑Mihailo Ristic↓',
                    nameChs: '戴维德·尤拉塞克↑里斯蒂奇↓',
                    nameCht: '大衛尤拿些格↑米希路列斯迪↓',
                    playerId: '196742',
                    playerId2: '129096',
                    overtime: '0'
                },
                '49': {
                    id: 11088594,
                    isHome: true,
                    kind: 3,
                    time: '49',
                    nameEn: 'Joao Neves',
                    nameChs: 'J·内维斯',
                    nameCht: '若奧·內維斯',
                    playerId: '228998',
                    playerId2: '',
                    overtime: '0'
                },
                '61': {
                    id: 11088605,
                    isHome: true,
                    kind: 1,
                    time: '61',
                    nameEn: 'Angel Fabian Di Maria (Assist:Orkun Kokcu)',
                    nameChs: '迪马利亚 (助攻:考克库)',
                    nameCht: '迪馬利亞 (助攻:奧昆高古)',
                    playerId: '67900',
                    playerId2: '164757',
                    overtime: '0'
                },
                '68': {
                    id: 11088617,
                    isHome: true,
                    kind: 1,
                    time: '68',
                    nameEn: 'Petar Musa (Assist:Rafael Ferreira Silva)',
                    nameChs: '穆萨 (助攻:席尔瓦)',
                    nameCht: '比塔穆沙 (助攻:拉法施華)',
                    playerId: '166656',
                    playerId2: '115258',
                    overtime: '0'
                },
                '70': {
                    id: 11088620,
                    isHome: true,
                    kind: 11,
                    time: '70',
                    nameEn: 'Florentino Ibrain Morris Luis↑Orkun Kokcu↓',
                    nameChs: '弗洛伦蒂诺↑考克库↓',
                    nameCht: '費倫天奴路易斯↑奧昆高古↓',
                    playerId: '170587',
                    playerId2: '164757',
                    overtime: '0'
                },
                '75': {
                    id: 11088622,
                    isHome: true,
                    kind: 11,
                    time: '75',
                    nameEn: 'Chiquinho↑Joao Neves↓',
                    nameChs: '捷基尼奥↑若奥·内维斯↓',
                    nameCht: '捷基奴↑若奧·內維斯↓',
                    playerId: '150381',
                    playerId2: '228998',
                    overtime: '0'
                },
                '84': {
                    id: 11088631,
                    isHome: true,
                    kind: 3,
                    time: '84',
                    nameEn: 'Chiquinho',
                    nameChs: '捷基尼奥',
                    nameCht: '捷基奴',
                    playerId: '150381',
                    playerId2: '',
                    overtime: '0'
                },
                '87': {
                    id: 11088636,
                    isHome: true,
                    kind: 3,
                    time: '87',
                    nameEn: 'Odisseas Vlachodimos',
                    nameChs: '弗拉霍迪莫斯',
                    nameCht: '華卓迪莫斯',
                    playerId: '115687',
                    playerId2: '',
                    overtime: '0'
                },
                '90': {
                    id: 11088647,
                    isHome: true,
                    kind: 11,
                    time: '90',
                    nameEn: 'Andreas Schjelderup↑Angel Fabian Di Maria↓',
                    nameChs: 'A.施耶尔德鲁普↑迪马利亚↓',
                    nameCht: 'A.施耶爾德魯普↑迪馬利亞↓',
                    playerId: '205020',
                    playerId2: '67900',
                    overtime: '12'
                }
            },
            isAway: {
                '29': {
                    id: 11088522,
                    isHome: false,
                    kind: 3,
                    time: '29',
                    nameEn: 'Danny Loader',
                    nameChs: '罗阿德',
                    nameCht: '丹尼路達',
                    playerId: '161501',
                    playerId2: '',
                    overtime: '0'
                },
                '33': {
                    id: 11088525,
                    isHome: false,
                    kind: 3,
                    time: '33',
                    nameEn: 'Kepler Laveran Lima Ferreira, Pepe',
                    nameChs: '佩佩',
                    nameCht: '柏比',
                    playerId: '3883',
                    playerId2: '',
                    overtime: '0'
                },
                '45': {
                    id: 11088563,
                    isHome: false,
                    kind: 3,
                    time: '45',
                    nameEn: 'Pepe',
                    nameChs: '佩佩',
                    nameCht: 'E.哥沙',
                    playerId: '153732',
                    playerId2: '',
                    overtime: '1'
                },
                '51': {
                    id: 11088597,
                    isHome: false,
                    kind: 3,
                    time: '51',
                    nameEn: 'Stephen Eustaquio',
                    nameChs: '欧斯塔基奥',
                    nameCht: '斯蒂芬.歐斯塔基奧',
                    playerId: '156100',
                    playerId2: '',
                    overtime: '0'
                },
                '55': {
                    id: 11088600,
                    isHome: false,
                    kind: 3,
                    time: '55',
                    nameEn: 'Zaidu Sanusi',
                    nameChs: '扎伊杜·萨努西',
                    nameCht: '紮伊杜·薩努西',
                    playerId: '178204',
                    playerId2: '',
                    overtime: '0'
                },
                '65': {
                    id: 11088611,
                    isHome: false,
                    kind: 11,
                    time: '65',
                    nameEn: 'Romario Baro↑Stephen Eustaquio↓',
                    nameChs: 'R.巴洛↑斯蒂芬.欧斯塔基奥↓',
                    nameCht: 'R.巴洛↑斯蒂芬.歐斯塔基奧↓',
                    playerId: '160802',
                    playerId2: '156100',
                    overtime: '0'
                },
                '69': {
                    id: 11088619,
                    isHome: false,
                    kind: 11,
                    time: '69',
                    nameEn: 'Joao Mario Neto Lopes↑Marko Grujic↓',
                    nameChs: '若奥·马里奥↑格鲁伊奇↓',
                    nameCht: '祖奧馬里奧.盧比斯↑古積↓',
                    playerId: '169875',
                    playerId2: '136927',
                    overtime: '0'
                },
                '81': {
                    id: 11088629,
                    isHome: false,
                    kind: 11,
                    time: '81',
                    nameEn: 'Francisco Jose Navarro Aliaga↑Mehdi Taromi↓',
                    nameChs: '弗兰·纳瓦罗↑塔罗米↓',
                    nameCht: 'F.拿華路↑泰利美↓',
                    playerId: '172199',
                    playerId2: '132612',
                    overtime: '0'
                },
                '90': {
                    id: 11088639,
                    isHome: false,
                    kind: 14,
                    time: '90',
                    nameEn: 'Wenderson Galeno Goal Disallowed',
                    nameChs: 'W.加雷諾 进球无效',
                    nameCht: 'W.加雷諾 進球無效',
                    playerId: '150612',
                    playerId2: '',
                    overtime: '2'
                }
            }
        },
        technical: [
            {
                technicType: '6',
                home: '7',
                away: '4'
            },
            {
                technicType: '45',
                home: '3',
                away: '3'
            },
            {
                technicType: '11',
                home: '7',
                away: '5'
            },
            {
                technicType: '13',
                home: '0',
                away: '1'
            },
            {
                technicType: '3',
                home: '11',
                away: '11'
            },
            {
                technicType: '4',
                home: '6',
                away: '2'
            },
            {
                technicType: '34',
                home: '5',
                away: '9'
            },
            {
                technicType: '37',
                home: '5',
                away: '6'
            },
            {
                technicType: '8',
                home: '19',
                away: '21'
            },
            {
                technicType: '14',
                home: '51%',
                away: '49%'
            },
            {
                technicType: '46',
                home: '52%',
                away: '48%'
            },
            {
                technicType: '41',
                home: '429',
                away: '398'
            },
            {
                technicType: '5',
                home: '20',
                away: '20'
            },
            {
                technicType: '9',
                home: '2',
                away: '1'
            },
            {
                technicType: '36',
                home: '13',
                away: '28'
            },
            {
                technicType: '16',
                home: '2',
                away: '5'
            },
            {
                technicType: '38',
                home: '19',
                away: '27'
            },
            {
                technicType: '39',
                home: '13',
                away: '13'
            },
            {
                technicType: '20',
                home: '14',
                away: '7'
            },
            {
                technicType: '43',
                home: '126',
                away: '109'
            },
            {
                technicType: '44',
                home: '75',
                away: '54'
            }
        ],
        lineupInfo: {
            matchId: 2426925,
            homeArray: '4231',
            awayArray: '442',
            homeLineup: [
                {
                    playerId: 115687,
                    nameEn: 'Odisseas Vlachodimos',
                    nameChs: '弗拉霍迪莫斯',
                    nameCht: '華卓迪莫斯',
                    number: '99',
                    positionId: '0'
                },
                {
                    playerId: 129096,
                    nameEn: 'Mihailo Ristic',
                    nameChs: '里斯蒂奇',
                    nameCht: '米希路列斯迪',
                    number: '23',
                    positionId: '1'
                },
                {
                    playerId: 74255,
                    nameEn: 'Nicolas Hernan Gonzalo Otamendi',
                    nameChs: '奥塔门迪',
                    nameCht: '奧達文迪',
                    number: '30',
                    positionId: '1'
                },
                {
                    playerId: 228146,
                    nameEn: 'Antonio Silva',
                    nameChs: '安东尼奥·席尔瓦',
                    nameCht: '安東尼奧施華',
                    number: '4',
                    positionId: '1'
                },
                {
                    playerId: 167534,
                    nameEn: 'Alexander Bahr',
                    nameChs: '亚力山大巴尔',
                    nameCht: '亞力山大巴爾',
                    number: '6',
                    positionId: '1'
                },
                {
                    playerId: 164757,
                    nameEn: 'Orkun Kokcu',
                    nameChs: '考克库',
                    nameCht: '奧昆高古',
                    number: '10',
                    positionId: '2'
                },
                {
                    playerId: 228998,
                    nameEn: 'Joao Neves',
                    nameChs: '若奥·内维斯',
                    nameCht: '若奧·內維斯',
                    number: '87',
                    positionId: '2'
                },
                {
                    playerId: 95598,
                    nameEn: 'Joao Mario',
                    nameChs: '若昂·马里奥',
                    nameCht: '祖奧馬利奧',
                    number: '20',
                    positionId: '3'
                },
                {
                    playerId: 99354,
                    nameEn: 'Fredrik Aursnes',
                    nameChs: 'F.奥尔斯内斯',
                    nameCht: 'F.奧斯尼',
                    number: '8',
                    positionId: '3'
                },
                {
                    playerId: 67900,
                    nameEn: 'Angel Fabian Di Maria',
                    nameChs: '迪马利亚',
                    nameCht: '迪馬利亞',
                    number: '11',
                    positionId: '3'
                },
                {
                    playerId: 115258,
                    nameEn: 'Rafael Ferreira Silva',
                    nameChs: '拉法·席尔瓦',
                    nameCht: '拉法施華',
                    number: '27',
                    positionId: '4'
                }
            ],
            awayLineup: [
                {
                    playerId: 146615,
                    nameEn: 'Diogo Meireles Costa',
                    nameChs: '迪奥戈.科斯塔',
                    nameCht: '迪奥戈.科斯塔',
                    number: '99',
                    positionId: '0'
                },
                {
                    playerId: 153732,
                    nameEn: 'Eduardo Gabriel Aquino Cossa',
                    nameChs: '爱德华多.加布里埃尔.阿基诺.科萨',
                    nameCht: 'E.哥沙',
                    number: '11',
                    positionId: '1'
                },
                {
                    playerId: 3883,
                    nameEn: 'Kepler Laveran Lima Ferreira, Pepe',
                    nameChs: '佩佩',
                    nameCht: '柏比',
                    number: '3',
                    positionId: '1'
                },
                {
                    playerId: 83542,
                    nameEn: 'Ivan Marcano Sierra',
                    nameChs: '马尔卡诺',
                    nameCht: '馬簡奴',
                    number: '5',
                    positionId: '1'
                },
                {
                    playerId: 178204,
                    nameEn: 'Zaidu Sanusi',
                    nameChs: '扎伊杜·萨努西',
                    nameCht: '紮伊杜·薩努西',
                    number: '12',
                    positionId: '1'
                },
                {
                    playerId: 113207,
                    nameEn: 'Otavinho, Otavio Edmilson da Silva Monte',
                    nameChs: '奥塔维尼奥',
                    nameCht: '奧達維奧',
                    number: '25',
                    positionId: '2'
                },
                {
                    playerId: 136927,
                    nameEn: 'Marko Grujic',
                    nameChs: '格鲁伊奇',
                    nameCht: '古積',
                    number: '8',
                    positionId: '2'
                },
                {
                    playerId: 156100,
                    nameEn: 'Stephen Eustaquio',
                    nameChs: '斯蒂芬.欧斯塔基奥',
                    nameCht: '斯蒂芬.歐斯塔基奧',
                    number: '6',
                    positionId: '2'
                },
                {
                    playerId: 150612,
                    nameEn: 'Wenderson Galeno',
                    nameChs: 'W.加雷諾',
                    nameCht: 'W.加雷諾',
                    number: '13',
                    positionId: '2'
                },
                {
                    playerId: 161501,
                    nameEn: 'Danny Loader',
                    nameChs: '丹尼·罗阿德',
                    nameCht: '丹尼路達',
                    number: '19',
                    positionId: '3'
                },
                {
                    playerId: 132612,
                    nameEn: 'Mehdi Taromi',
                    nameChs: '塔罗米',
                    nameCht: '泰利美',
                    number: '9',
                    positionId: '3'
                }
            ],
            homeBackup: [
                {
                    playerId: 150381,
                    nameEn: 'Chiquinho',
                    nameChs: '捷基尼奥',
                    nameCht: '捷基奴',
                    number: '22',
                    positionId: '0'
                },
                {
                    playerId: 170587,
                    nameEn: 'Florentino Ibrain Morris Luis',
                    nameChs: '弗洛伦蒂诺',
                    nameCht: '費倫天奴路易斯',
                    number: '61',
                    positionId: '0'
                },
                {
                    playerId: 185316,
                    nameEn: 'Joao Victor Da Silva Marcelino',
                    nameChs: '若奥·维克多',
                    nameCht: '祖奧域陀',
                    number: '38',
                    positionId: '0'
                },
                {
                    playerId: 196742,
                    nameEn: 'David Jurasek',
                    nameChs: '戴维德·尤拉塞克',
                    nameCht: '大衛尤拿些格',
                    number: '13',
                    positionId: '0'
                },
                {
                    playerId: 190353,
                    nameEn: 'Felipe Rodrigues Da Silva,Morato',
                    nameChs: '费利佩·莫拉托',
                    nameCht: 'F.摩拉頓',
                    number: '5',
                    positionId: '0'
                },
                {
                    playerId: 166656,
                    nameEn: 'Petar Musa',
                    nameChs: '皮特·穆萨',
                    nameCht: '比塔穆沙',
                    number: '33',
                    positionId: '0'
                },
                {
                    playerId: 205020,
                    nameEn: 'Andreas Schjelderup',
                    nameChs: 'A.施耶尔德鲁普',
                    nameCht: 'A.施耶爾德魯普',
                    number: '21',
                    positionId: '0'
                },
                {
                    playerId: 201402,
                    nameEn: 'Samuel Jumpe Soares',
                    nameChs: '塞缪尔.苏亚雷斯',
                    nameCht: 'S.蘇亞雷斯',
                    number: '24',
                    positionId: '0'
                },
                {
                    playerId: 177044,
                    nameEn: 'Casper Tengstedt',
                    nameChs: '卡斯帕·滕斯泰特',
                    nameCht: '卡斯帕·滕斯泰特',
                    number: '19',
                    positionId: '0'
                }
            ],
            awayBackup: [
                {
                    playerId: 160802,
                    nameEn: 'Romario Baro',
                    nameChs: 'R.巴洛',
                    nameCht: 'R.巴洛',
                    number: '28',
                    positionId: '0'
                },
                {
                    playerId: 190369,
                    nameEn: 'Goncalo Borges',
                    nameChs: '冈卡洛·保尔格斯',
                    nameCht: '干卡路保格斯',
                    number: '70',
                    positionId: '0'
                },
                {
                    playerId: 105756,
                    nameEn: 'Fabio Rafael Rodrigues Cardoso',
                    nameChs: '法比奥·卡多索',
                    nameCht: '法比奧卡杜素',
                    number: '2',
                    positionId: '0'
                },
                {
                    playerId: 106037,
                    nameEn: 'Claudio Pires Morais Ramos',
                    nameChs: '克劳迪奥·拉莫斯',
                    nameCht: 'C.拉莫斯',
                    number: '14',
                    positionId: '0'
                },
                {
                    playerId: 203702,
                    nameEn: 'Andre Franco',
                    nameChs: '安德烈·佛朗哥',
                    nameCht: 'A·佛朗哥',
                    number: '20',
                    positionId: '0'
                },
                {
                    playerId: 169875,
                    nameEn: 'Joao Mario Neto Lopes',
                    nameChs: '若奥·马里奥',
                    nameCht: '祖奧馬里奧.盧比斯',
                    number: '23',
                    positionId: '0'
                },
                {
                    playerId: 150807,
                    nameEn: 'Antonio Martinez Lopez',
                    nameChs: '安东尼奥·马丁内兹',
                    nameCht: '安東尼奧·馬丁內茲',
                    number: '29',
                    positionId: '0'
                },
                {
                    playerId: 172199,
                    nameEn: 'Francisco Jose Navarro Aliaga',
                    nameChs: '弗兰·纳瓦罗',
                    nameCht: 'F.拿華路',
                    number: '21',
                    positionId: '0'
                },
                {
                    playerId: 218402,
                    nameEn: 'Nicolas Gonzalez Iglesias',
                    nameChs: '尼古拉斯.冈萨雷斯',
                    nameCht: '尼科.岡薩雷斯',
                    number: '16',
                    positionId: '0'
                }
            ]
        }
    };
    return <Situation situationData={situationData} />;
}

export default Page;
