import { useEffect, useState, useCallback, useRef } from 'react';
import { truncateFloatingPointToString } from 'lib';

const convertStringToNumber = (input: string): number => {
    if (input.includes('/')) {
        const parts = input.split('/').map(Number);
        return (parts[0] + parts[1]) / 2;
    }
    return Number(input);
};

const compareNumbers = (previous: number, current: number): string => {
    if (current > previous) {
        return 'greater';
    } else if (current < previous) {
        return 'lesser';
    }
    return 'equal';
};

const colorMap = {
    red: '#e85251',
    green: '#5dca82',
    blue: '#4489ff'
};

function CompareOdds({
    value,
    defaultColor = ''
}: {
    value: string | number;
    defaultColor?: string;
}) {
    const [previousValue, setPreviousValue] = useState(value);
    const [color, setColor] = useState(defaultColor);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const stringCompare = useCallback((previous: string, current: string): string => {
        const previousNumber = convertStringToNumber(previous);
        const currentNumber = convertStringToNumber(current);

        return compareNumbers(previousNumber, currentNumber);
    }, []);

    const setStyleBasedOnComparison = useCallback(
        (comparisonResult: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            switch (comparisonResult) {
                case 'greater':
                    setColor('red');
                    break;
                case 'lesser':
                    setColor('green');
                    break;
                case 'equal':
                    setColor(defaultColor);
                    break;
                default:
                    setColor('');
            }

            timeoutRef.current = setTimeout(() => {
                setColor(defaultColor);
            }, 5000);
        },
        [defaultColor]
    );

    useEffect(() => {
        if (previousValue === value) {
            return;
        }
        if (typeof value === 'string' && typeof previousValue === 'string') {
            const result = stringCompare(previousValue, value);
            setStyleBasedOnComparison(result);
        } else if (typeof value === 'number' && typeof previousValue === 'number') {
            const result = compareNumbers(previousValue, value);
            setStyleBasedOnComparison(result);
        }
        setPreviousValue(value);
    }, [value, previousValue, stringCompare, setStyleBasedOnComparison]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <p style={{ color: colorMap[color] as string }} suppressHydrationWarning>
            {typeof value === 'number' ? truncateFloatingPointToString(value, 2) : value}
        </p>
    );
}

export { CompareOdds };
