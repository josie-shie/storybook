import style from './contestDrawerList.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function ContestDrawerList({
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
            <div className={style.contestDrawerList}>
                <h2>15分鐘進球/75:00-全場/大</h2>
            </div>
        </BottomDrawer>
    );
}

export default ContestDrawerList;
