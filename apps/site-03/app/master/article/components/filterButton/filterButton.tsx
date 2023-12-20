import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import Image from 'next/image';
import FilterIcon from '../../img/filter.png';
import style from './filterButton.module.scss';

function FilterButton() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <div
            className={style.filter}
            onClick={() => {
                router.push(`${pathname}?${createQueryString('filter', 'open')}`);
            }}
        >
            赛事筛选
            <Image alt="filter" className={style.mr} sizes="32" src={FilterIcon} />
        </div>
    );
}

export default FilterButton;
