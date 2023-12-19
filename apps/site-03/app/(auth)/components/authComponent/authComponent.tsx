import Image from 'next/image';
import type { ReactNode } from 'react';
import { Button, IconButton, Input } from '@mui/material';
import { CustomSelect } from 'ui';
import type { FieldError, FieldValues } from 'react-hook-form';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import style from './authComponent.module.scss';
import closeIcon from './img/closeIcon.png';
import headerBg from './img/headerBg.jpeg';
import phoneIcon from './img/phoneIcon.png';
import lockIcon from './img/lockIcon.png';
import shieldIcon from './img/shieldIcon.png';
import exclamationIcon from './img/exclamation.png';
import userIcon from './img/user.png';
import reloadIcon from './img/reloadIcon.png';

export function NicknameInput({
    field,
    error
}: {
    field: FieldValues;
    error: FieldError | undefined;
}) {
    return (
        <>
            <div className={style.nickname}>
                <Image alt="" height={24} src={userIcon.src} width={24} />
                <div className={style.nicknameBlock}>
                    <Input
                        {...field}
                        className={style.nicknameInput}
                        disableUnderline
                        error={Boolean(error)}
                        id="username"
                        placeholder="昵称请输入2-10位中文、英文或数字"
                    />
                </div>
            </div>
            <div className={style.errorMessage}>
                {error ? <span>昵称请输入2-10位中文、英文或数字</span> : null}
            </div>
        </>
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
            disabled={disabled}
            fullWidth
            type="submit"
        >
            {label}
        </Button>
    );
}

export function Aggrement() {
    return (
        <p className={style.agreement}>{`登入即同意<未来体育隐私条款>、<未来体育用户服务协议>`}</p>
    );
}

export function VertifyCode({
    field,
    error,
    getVerificationCode,
    vertifyDisable,
    countDownNumber,
    sendCodeSuccess
}: {
    field: FieldValues;
    error: FieldError | undefined;
    getVerificationCode: () => void;
    vertifyDisable: boolean;
    countDownNumber: number;
    sendCodeSuccess: boolean;
}) {
    return (
        <div className={style.vertifyCode}>
            <div className={style.vertifyCodeBlock}>
                <Image alt="" height={24} src={shieldIcon.src} width={24} />
                <Input
                    {...field}
                    className={style.vertifyCodeInput}
                    disableUnderline
                    error={Boolean(error)}
                    id="verificationCode"
                    placeholder="请输入手机号码验证"
                />
                {sendCodeSuccess ? (
                    <p className={style.getVertifyCode}>验证码已送出({countDownNumber})</p>
                ) : (
                    <Button
                        className={style.getVertifyCode}
                        disabled={vertifyDisable}
                        onClick={getVerificationCode}
                    >
                        获取验证码
                    </Button>
                )}
            </div>
            <div className={style.errorMessage}>
                <Image alt="" height={16} src={exclamationIcon.src} width={16} />
                如果长时间未收到验证码，请联络在线客服
            </div>
        </div>
    );
}

export function VertifyCodeByImage({
    field,
    error,
    placeholder,
    verifyPhoto,
    vertifyDisable,
    getVerificationCode
}: {
    field: FieldValues;
    error: FieldError | undefined;
    placeholder: string;
    verifyPhoto: string;
    vertifyDisable: boolean;
    getVerificationCode: () => void;
}) {
    return (
        <div className={style.vertifyCodeByImage}>
            <div className={style.vertifyCodeBlock}>
                <Image alt="" height={24} src={shieldIcon.src} width={24} />
                <Input
                    {...field}
                    className={style.vertifyCodeInput}
                    disableUnderline
                    error={Boolean(error)}
                    id="verificationCode"
                    placeholder={placeholder}
                />
            </div>
            {verifyPhoto ? (
                <IconButton
                    disabled={vertifyDisable}
                    onClick={getVerificationCode}
                    sx={{ padding: 0 }}
                >
                    <Image
                        alt="verifyPhoto"
                        className={style.verifyPhoto}
                        height="40"
                        src={verifyPhoto}
                        width="120"
                    />
                    <Image alt="reload" height={24} src={reloadIcon.src} width={24} />
                </IconButton>
            ) : (
                <Button
                    className={style.getVertifyCode}
                    disabled={vertifyDisable}
                    onClick={getVerificationCode}
                >
                    獲取驗證碼
                </Button>
            )}
        </div>
    );
}

interface PasswordPropsType {
    children?: ReactNode;
    placeholder: string;
    field: FieldValues;
    error: FieldError | undefined;
    id?: string;
}

export function PasswordInput({ children, placeholder, field, error, id }: PasswordPropsType) {
    return (
        <>
            <div className={style.password}>
                <Image alt="" height={24} src={lockIcon.src} width={24} />
                <div className={style.passwordBlock}>
                    <Input
                        {...field}
                        className={style.passwordInput}
                        disableUnderline
                        error={Boolean(error)}
                        id={id ? id : 'password'}
                        placeholder={placeholder}
                        type="password"
                    />
                    {children}
                </div>
            </div>

            {error ? <div className={style.errorMessage}>{placeholder}</div> : null}
        </>
    );
}

export function CountryCodeInput() {
    const countryCodeList = [{ label: '+86', value: 86 }];

    return (
        <div className={style.codeSelect}>
            <Image alt="" height={24} src={phoneIcon.src} width={24} />
            <CustomSelect
                options={countryCodeList}
                showCloseButton
                showDragBar={false}
                value={countryCodeList[0].value}
            />
        </div>
    );
}

export function PhoneNumberInput({
    field,
    error
}: {
    field: FieldValues;
    error: FieldError | undefined;
}) {
    return (
        <div className={style.phoneNumber}>
            <Input
                {...field}
                className={style.phoneInput}
                disableUnderline
                error={Boolean(error)}
                id="mobileNumber"
                placeholder="请输入手机号码"
            />
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
                        onClick={onClose}
                        src={closeIcon.src}
                        width={16}
                    />
                    {children}
                </div>
            </div>
        </BottomDrawer>
    );
}
