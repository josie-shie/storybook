export function formatFloatingPoint(target: number, num: number) {
    return Math.floor(target * Math.pow(10, num)) / Math.pow(10, num);
}

export function formatHandicap(handicap: number): string {
    let newHandicap = handicap;

    if (newHandicap === 0) {
        return '0';
    }

    let sign = '';
    if (newHandicap < 0) {
        sign = '-';
        newHandicap = Math.abs(newHandicap);
    }

    if (newHandicap % 1 === 0.25) {
        return `${sign}${Math.floor(newHandicap)}/${Math.floor(newHandicap) + 0.5}`;
    } else if (newHandicap % 1 === 0.75) {
        return `${sign}${Math.floor(newHandicap) + 0.5}/${Math.floor(newHandicap) + 1}`;
    }
    return `${sign}${newHandicap}`;
}
