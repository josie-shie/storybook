/**
 * 勝率的計算方式
 * - param (lose: number, win: number)
 * - (lose: 猜輸的總次數, win: 猜贏的總次數)
 */
export function formatRate(lose: number, win: number) {
    if (lose === 0 && win === 0) return 0;
    const winRate = (win / (lose + win)) * 100;
    return Number.isInteger(winRate) ? winRate : Number(winRate.toFixed(1));
}

/**
 * 總勝率的計算方式
 * - param (sizeRate: number, handicapRate: number)
 * - (sizeRate: 總進球勝率, handicapRate: 總勝負的勝率)
 */
export function sizeAndHandicapWinRate(sizeRate: number, handicapRate: number) {
    const result = (Number(sizeRate) + Number(handicapRate)) / 2;
    return Number.isInteger(result) ? result : Number(result.toFixed(1));
}
