/**
 * 留到小數點後第 n 位
 * - param (target: number, decimalPlaces: number)
 * - (target: 目標值, decimalPlaces: 第 n 位)
 */
export function truncateFloatingPoint(target: number, decimalPlaces: number) {
    return Math.floor(target * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

/**
 * 格式盤口數字
 * - param (handicap: number)
 */
export function handicapToString(handicap: number): string {
    if (handicap === 0) {
        return '0';
    }

    let sign = '';
    let absoluteHandicap = handicap;

    if (handicap < 0) {
        sign = '-';
        absoluteHandicap = Math.abs(handicap);
    }

    if (absoluteHandicap % 1 === 0.25) {
        return `${sign}${Math.floor(absoluteHandicap)}/${Math.floor(absoluteHandicap) + 0.5}`;
    } else if (absoluteHandicap % 1 === 0.75) {
        return `${sign}${Math.floor(absoluteHandicap) + 0.5}/${Math.floor(absoluteHandicap) + 1}`;
    }
    return `${sign}${absoluteHandicap}`;
}
