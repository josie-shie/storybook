/**
 * 留到小數點後第 n 位
 * - param (target: number, decimalPlaces: number)
 * - (target: 目標值, decimalPlaces: 第 n 位)
 */
export function truncateFloatingPoint(target: number, decimalPlaces: number) {
    return Math.floor(target * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

/**
 * 千分位
 * - param (total: number)
 * - (total: 目標值)
 */
export function formatNumberWithCommas(total: number): string {
    return total.toString().replace(/\B(?=(?<temp1>\d{3})+(?!\d))/g, ',');
}
