import Image from 'next/image';
import type { ReactNode } from 'react';
import { Button, Input } from '@mui/material';
import { CustomSelect } from 'ui';
import style from './authComponent.module.scss';
import closeIcon from './img/closeIcon.png';
import headerBg from './img/headerBg.jpeg';
import phoneIcon from './img/phoneIcon.png';
import lockIcon from './img/lockIcon.png';
import shieldIcon from './img/shieldIcon.png';
import exclamationIcon from './img/exclamation.png';
import userIcon from './img/user.png';
import BottomDrawer from '@/components/drawer/bottomDrawer';

export function NicknameInput() {
    return (
        <div className={style.nickname}>
            <Image alt="" height={24} src={userIcon.src} width={24} />
            <div className={style.nicknameBlock}>
                <Input
                    className={style.nicknameInput}
                    id="nickname"
                    placeholder="昵称请输入2-10位中文、英文或数字"
                />
            </div>
        </div>
    );
}

interface SubmitButtonPropsType {
    label: string;
    disabled: boolean;
}

export function SubmitButton({ label, disabled }: SubmitButtonPropsType) {
    return (
        <Button
            className={`${style.submitButton} ${disabled ? style.disableButton : style.ableButton}`}
            fullWidth
            type="submit"
        >
            {label}
        </Button>
    );
}

export function Aggrement() {
    return (
        <p className={style.agreement}>{`登入即同意<XXX體育隱私條款>、<XXX體育用戶服務協議>`}</p>
    );
}

export function VertifyCode() {
    return (
        <div className={style.vertifyCode}>
            <div className={style.vertifyCodeBlock}>
                <Image alt="" height={24} src={shieldIcon.src} width={24} />
                <Input
                    className={style.vertifyCodeInput}
                    id="vertifyCode"
                    placeholder="请输入手机号码验证"
                />
                <p className={style.getVertifyCode}>获取验证码</p>
            </div>
            <div className={style.errorMessage}>
                <Image alt="" height={16} src={exclamationIcon.src} width={16} />
                如果长时间未收到验证码，请联络在线客服
            </div>
        </div>
    );
}

export function VertifyCodeByImage() {
    return (
        <div className={style.vertifyCodeByImage}>
            <Image alt="" height={24} src={shieldIcon.src} width={24} />
            <div className={style.vertifyCodeBlock}>
                <Input className={style.vertifyCodeInput} id="vertifyCode" placeholder="验证码" />
                <p className={style.getVertifyCode}>获取验证码</p>
            </div>
        </div>
    );
}

interface PasswordPropsType {
    children?: ReactNode;
    placeholder: string;
}

export function PasswordInput({ children, placeholder }: PasswordPropsType) {
    return (
        <div className={style.password}>
            <Image alt="" height={24} src={lockIcon.src} width={24} />
            <div className={style.passwordBlock}>
                <Input className={style.passwordInput} id="password" placeholder={placeholder} />
                {children}
            </div>
        </div>
    );
}

export function PhoneInput() {
    const countryCallingCodeList = [{ label: '+86', value: 86 }];

    return (
        <div className={style.phone}>
            <div className={style.codeSelect}>
                <Image alt="" height={24} src={phoneIcon.src} width={24} />
                <CustomSelect
                    // onChange={onChange}
                    options={countryCallingCodeList}
                    showCloseButton
                    showDragBar={false}
                    value={countryCallingCodeList[0].value}
                />
            </div>

            <Input className={style.phoneInput} id="phoneNumber" placeholder="请输入手机号码" />
        </div>
    );
}

interface PropsType {
    title: ReactNode;
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
    onOpen: () => void;
}

export function AuthDrawer({ title, isOpen, onOpen, children, onClose }: PropsType) {
    return (
        <BottomDrawer
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            propsStyle={{
                height: '580px',
                backgroundColor: '#1665df'
            }}
            topLineDisplay="none"
        >
            <div className={style.loginDrawer}>
                <div className={style.header} style={{ backgroundImage: `url(${headerBg.src})` }}>
                    <div className={style.title}>{title}</div>
                    <Image
                        alt=""
                        className={style.closeBtn}
                        height={16}
                        src={closeIcon.src}
                        width={16}
                    />
                    {children}
                </div>
            </div>
        </BottomDrawer>
    );
}
