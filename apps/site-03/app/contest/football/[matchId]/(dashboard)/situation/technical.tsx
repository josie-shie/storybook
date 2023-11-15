import { useSituationStore } from '../../situationStore';
import style from './technical.module.scss';

function Technical() {
    const technicalList = useSituationStore.use.technical();
    const technicMap = {
        '0': '先开球',
        '1': '第一个角球',
        '2': '第一张黄牌',
        '3': '射门次数',
        '4': '射正次数',
        '5': '犯规次数',
        '6': '角球次数',
        '7': '角球次数(加时)',
        '8': '任意球次数',
        '9': '越位次数',
        '10': '乌龙球数',
        '11': '黄牌数',
        '12': '黄牌数(加时)',
        '13': '红牌数',
        '14': '控球率',
        '15': '头球',
        '16': '救球',
        '17': '守门员出击',
        '18': '丟球',
        '19': '成功抢断',
        '20': '阻截',
        '21': '长传',
        '22': '短传',
        '23': '助攻',
        '24': '成功传中',
        '25': '第一个换人',
        '26': '最后换人',
        '27': '第一个越位',
        '28': '最后越位',
        '29': '换人数',
        '30': '最后角球',
        '31': '最后黄牌',
        '32': '换人数(加时)',
        '33': '越位次数(加时)',
        '34': '射门不中',
        '35': '中柱',
        '36': '头球成功次数',
        '37': '射门被挡',
        '38': '铲球',
        '39': '过人次数',
        '40': '界外球',
        '41': '传球次数',
        '42': '传球成功率',
        '43': '进攻次数',
        '44': '危险进攻次数',
        '45': '半场角球',
        '46': '半场控球',
        '47': '扑出点球'
    };

    const numberRatio = (first: string, second: string) => {
        const firstValue = parseInt(first.replace(/%/, ''), 10);
        const secondValue = parseInt(second.replace(/%/, ''), 10);

        if (firstValue > secondValue) {
            return 'redText';
        }
        return '';
    };

    return (
        <div className={style.technical}>
            <div className="topBar">
                <h6 className="title">技术统计</h6>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">即时</div>
                    </div>
                </div>
                <div className="tableBody">
                    {technicalList.map((technic, idx) => (
                        <div className="tr" key={`technic_${idx.toString()}`}>
                            <div className={`td ${numberRatio(technic.home, technic.away)}`}>
                                {technic.home}
                            </div>
                            <div className="td">{technicMap[technic.technicType]}</div>
                            <div className={`td ${numberRatio(technic.away, technic.home)}`}>
                                {technic.away}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Technical;
