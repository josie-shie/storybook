import SearchRecord from '../searchRecord/searchRecord';
import style from './recordFilter.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function RecordFilter({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.recordFilter}>
                <SearchRecord loading={false} />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading />
                <SearchRecord loading={false} />
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;
