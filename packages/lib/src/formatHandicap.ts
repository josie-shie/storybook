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

/**
 * 格式盤口數字
 * - param (handicap: number)
 */
export const convertHandicap = (input: number) => {
    const isNegative = input < 0;
    const absoluteValue = Math.abs(input);
    const floorValue = Math.floor(absoluteValue);
    const fraction = absoluteValue - floorValue;

    switch (fraction) {
        case 0.25:
            return isNegative
                ? `-${floorValue}/${floorValue + 0.5}`
                : `${floorValue}/${floorValue + 0.5}`;
        case 0.75:
            return isNegative
                ? `-${floorValue + 0.5}/${floorValue + 1}`
                : `${floorValue + 0.5}/${floorValue + 1}`;
        default:
            return `${input}`;
    }
};

/**
 * 格式賠率數字
 * - param (odds: number)
 */
export const convertOdds = (odds: number): [number, number] => {
    const isNegative = odds < 0;
    const absoluteValue = Math.abs(odds);
    const floorValue = Math.floor(absoluteValue);
    const fraction = absoluteValue - floorValue;

    switch (fraction) {
        case 0.25:
            return isNegative ? [-floorValue, -(floorValue + 0.5)] : [floorValue, floorValue + 0.5];
        case 0.75:
            return isNegative
                ? [-(floorValue + 0.5), -(floorValue + 1)]
                : [floorValue + 0.5, floorValue + 1];
        default:
            return [floorValue, floorValue];
    }
};
