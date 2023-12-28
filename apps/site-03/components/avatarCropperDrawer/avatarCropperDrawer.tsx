import { BaseCropper } from 'ui';
import BottomDrawer from '../drawer/bottomDrawer';
import style from './avatarCropperDrawer.module.scss';

interface AvatarCropperDrawerProps {
    imgSrc?: string;
    setImgSrc: (arg: Blob) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (arg: boolean) => void;
    setNewAvatar: (arg: undefined) => void;
}

function AvatarCropperDrawer({
    isDrawerOpen,
    imgSrc,
    setIsDrawerOpen,
    setImgSrc,
    setNewAvatar
}: AvatarCropperDrawerProps) {
    return (
        <BottomDrawer
            isOpen={isDrawerOpen}
            onClose={() => {
                setIsDrawerOpen(false);
                setNewAvatar(undefined);
            }}
            onOpen={() => {
                setIsDrawerOpen(true);
            }}
        >
            <div className={style.avatarDrawer}>
                {imgSrc ? (
                    <BaseCropper
                        imgSrc={imgSrc}
                        onConfirm={() => {
                            setNewAvatar(undefined);
                        }}
                        setImgFile={setImgSrc}
                    />
                ) : null}
            </div>
        </BottomDrawer>
    );
}

export default AvatarCropperDrawer;
