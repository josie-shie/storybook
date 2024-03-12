'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from '../helpCenter.module.scss';

function LoginAndResign() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/helpCenter');
    };

    return (
        <>
            <Header back={back} title="帳號相關" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>如何註冊新帳戶</h2>
                    <div>請按照以下步驟操作：</div>
                    <div>1. 填寫基本信息：在註冊頁面上填寫您的手機號和設定的密碼。</div>
                    <div>2. 手機號確認: 請使用有效的手機號碼，我們將透過這個號碼發送驗證碼。</div>
                    <div>3. 閱讀並接受條款: 在提交前，請細讀《用戶協議》和《隱私政策》。</div>
                    <div>4. 提交註冊申請: 確認信息無誤後，點擊「註冊」按鈕。</div>
                    <div>5. 註冊完成: 成功註冊後，即可用手機號和密碼登入App</div>
                    <div>註冊遇到問題時，請聯繫客服尋求協助。</div>
                </div>
                <div className={style.zoon}>
                    <h2>忘記手機號或密碼</h2>
                    <div>如忘記密碼，請按以下步驟重設：</div>
                    <div>1. 訪問登入頁面：點擊「忘記密碼」。</div>
                    <div>2. 手機號確認：輸入手機號並點擊「獲取驗證碼」。若有問題，請聯繫客服。</div>
                    <div>3. 設定新密碼：輸入驗證碼後設定新密碼（6~16字符，包含英文+數字）。</div>
                    <div>4. 確認新密碼：再次輸入新密碼以確認。</div>
                    <div>5.提交新密碼：點擊「提交」完成密碼重設。</div>
                    <div>如忘記註冊的手機號，請聯繫客服尋求協助。</div>
                </div>
                <div className={style.zoon}>
                    <h2>如何註銷帳戶</h2>
                    <div>欲註銷帳戶，請聯繫客服提供所需資料。</div>
                </div>
                <div className={style.zoon}>
                    <h2>如何變更資料</h2>
                    <div>變更密碼：</div>
                    <div>1. 訪問「我的」頁面：登入後點擊右上角。</div>
                    <div>2. 進入編輯模式：點擊「編輯」進入個人資料編輯頁面。</div>
                    <div>
                        3.
                        修改資料：可變更頭像、暱稱、生日、微信號、QQ號、郵箱、簡介。請注意部分資料僅可修改一次。
                    </div>
                    <div>4. 提交更新：點擊「提交」完成個人資料的變更。</div>
                </div>
            </div>
        </>
    );
}

export default LoginAndResign;
