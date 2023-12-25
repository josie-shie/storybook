import { BaseCropper } from 'ui';
import BottomDrawer from '../drawer/bottomDrawer';
import style from './avatarCropperDrawer.module.scss';

interface AvatarCropperDrawerProps {
    imgSrc?: string;
    setImgSrc: (arg: Blob) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (arg: boolean) => void;
}

function AvatarCropperDrawer({
    isDrawerOpen,
    imgSrc,
    setIsDrawerOpen,
    setImgSrc
}: AvatarCropperDrawerProps) {
    return (
        <BottomDrawer
            isOpen={isDrawerOpen}
            onClose={() => {
                setIsDrawerOpen(false);
            }}
            onOpen={() => {
                setIsDrawerOpen(true);
            }}
        >
            <div className={style.avatarDrawer}>
                <BaseCropper imgSrc={imgSrc} setImgFile={setImgSrc} />
            </div>
        </BottomDrawer>
    );
}

export default AvatarCropperDrawer;
