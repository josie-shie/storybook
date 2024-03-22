'use client';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { timestampToString, uploadImage, uploadImageToS3 } from 'lib';
import Header from '@/components/header/headerTitleDetail';
import { useNotificationStore } from '@/store/notificationStore';
import AvatarCropperDrawer from '@/components/avatarCropperDrawer/avatarCropperDrawer';
import { useUserStore } from '@/store/userStore';
import EditAccount from './editAccount';
import style from './account.module.scss';
import Avatar from './img/avatar.png';
import { useAccountStore } from './accountStore';
import DisplayAccount from './displayAccount';

interface UploadResponse {
    filePath: string;
}

interface UploadS3Response {
    success: string;
}

function Account() {
    const headerProps = {
        title: '个人资料编辑'
    };
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();

    const imgSrc = useAccountStore.use.imgSrc();

    const isEdit = useAccountStore.use.isEdit();
    const setIsEdit = useAccountStore.use.setIsEdit();
    const setFormState = useAccountStore.use.setFormState();
    const setSubmittedState = useAccountStore.use.setSubmittedState();
    const setImgSrc = useAccountStore.use.setImgSrc();
    const setImgUpload = useAccountStore.use.setImgUpload();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const [isAvatarCropperOpen, setIsAvatarCropperOpen] = useState(false);
    const [newAvatar, setNewAvatar] = useState<string>();

    const back = () => {
        router.push('/userInfo');
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setNewAvatar(e.target?.result as string);
                setIsAvatarCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImg = (arg: Blob) => {
        setIsAvatarCropperOpen(false);
        void uploadImgWithBlob(arg);
    };

    const uploadImgWithBlob = async (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = e => {
            setImgSrc(e.target?.result as string);
        };
        reader.readAsDataURL(blob);

        try {
            const data: UploadResponse = await uploadImage();
            const uploadS3Response: UploadS3Response = await uploadImageToS3(blob, data.filePath);
            if (uploadS3Response.success) {
                const url = new URL(data.filePath);
                const baseUrl = `${url.protocol}//${url.host}${url.pathname}`;
                setImgUpload(baseUrl);
            } else {
                setIsVisible('上传失败', 'error');
            }
        } catch (error) {
            console.error('上传图片过程中发生错误', error);
        }
    };

    useEffect(() => {
        if (userInfo.avatarPath && userInfo.avatarPath !== '0') {
            setImgSrc(userInfo.avatarPath);
        }

        setFormState({
            username: userInfo.username || '',
            birthday: userInfo.birthday || 0,
            birthdayDisplay:
                userInfo.birthday !== 0
                    ? timestampToString(userInfo.birthday, 'YYYY-MM-DD')
                    : '待新增',
            phoneNumber: userInfo.mobileNumber || '',
            wechat: userInfo.wechat || '',
            qq: userInfo.qqNumber || '',
            email: userInfo.email || '',
            description: userInfo.description || ''
        });

        const newSubmittedState = {
            username: Boolean(userInfo.username),
            birthday: userInfo.birthday !== 0,
            phoneNumber: Boolean(userInfo.mobileNumber),
            wechat: Boolean(userInfo.wechat),
            qq: Boolean(userInfo.qqNumber),
            email: Boolean(userInfo.email),
            description: Boolean(userInfo.description)
        };
        setSubmittedState(newSubmittedState);
    }, [userInfo, setFormState, setImgSrc, setSubmittedState]);

    return (
        <>
            <Header back={back} title={headerProps.title} />
            <div className={style.account}>
                <div className={style.uploadGroup}>
                    <Image
                        alt="大头贴"
                        className={style.avatar}
                        height={72}
                        src={imgSrc || Avatar}
                        width={72}
                    />
                    <label className={style.uploadBtn}>
                        编辑头像
                        <input
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                            type="file"
                        />
                    </label>
                </div>
                <div className={style.formOuter}>
                    <div className={style.contentBox}>
                        {isEdit ? (
                            <EditAccount setIsEdit={setIsEdit} />
                        ) : (
                            <DisplayAccount setIsEdit={setIsEdit} />
                        )}
                    </div>
                </div>
            </div>
            <AvatarCropperDrawer
                imgSrc={newAvatar}
                isDrawerOpen={isAvatarCropperOpen}
                setImgSrc={handleUploadImg}
                setIsDrawerOpen={setIsAvatarCropperOpen}
                setNewAvatar={setNewAvatar}
            />
        </>
    );
}

export default Account;
