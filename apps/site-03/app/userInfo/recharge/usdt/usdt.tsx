'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import UsdtIcon from '../img/usdt.png';
import { Select } from '../components/select/select';
import Pay from './pay/pay';
import style from './usdt.module.scss';

interface OptionType {
    label: string;
    value: string;
}

interface SectionSelectProps {
    selectTitle: string;
    options: OptionType[];
    onSelectChain: (value: string) => void;
}

function BlockChain({ selectTitle, options, onSelectChain }: SectionSelectProps) {
    const [selectedValue, setSelectedValue] = useState(options[0].value);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        onSelectChain(value);
    };

    return (
        <section className={style.items}>
            <div className={style.select}>
                <Select
                    onChange={handleChange}
                    options={options}
                    showCloseButton={false}
                    showDragBar
                    title={selectTitle}
                    value={selectedValue}
                />
            </div>
        </section>
    );
}

function Usdt() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo');
    };
    const headerProps = {
        title: '虚拟货币(USDT)充值'
    };

    const chainList = [
        {
            label: 'USDT-TRC20',
            value: 'TRC20'
        },
        {
            label: 'USDT-ERC20',
            value: 'ERC20'
        },
        {
            label: 'USDT-BEP20',
            value: 'BEP20'
        }
    ];

    const [pay, setPay] = useState(false);
    const [amount, setAmount] = useState('');
    const [selectedChain, setSelectedChain] = useState(chainList[0].value);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.valueAsNumber;

        if (value) {
            if (value < 1) {
                value = 1;
            } else if (value > 99999) {
                value = 99999;
            }
            setAmount(value.toString());
        } else {
            setAmount('');
        }
    };

    const handleSelectChain = (value: string) => {
        setSelectedChain(value);
    };

    const handleClose = () => {
        setPay(false);
        setAmount('');
        setSelectedChain(chainList[0].value);
    };

    return (
        <>
            {!pay ? (
                <>
                    <Header back={back} title={headerProps.title} />
                    <div className={style.usdt}>
                        <div className={style.payArea}>
                            <div className={style.title}>
                                <Image alt="usdt" height={32} src={UsdtIcon} width={32} />
                                <span>虚拟货币(USDT)</span>
                            </div>
                            <div className={style.pay}>
                                <div className={style.title}>充值金額:</div>
                                <div className={style.amount}>
                                    <Image alt="usdt" height={32} src={UsdtIcon} width={32} />
                                    <input
                                        onChange={handleAmountChange}
                                        placeholder="USDT 1~99999平台幣"
                                        type="number"
                                        value={amount}
                                    />
                                </div>
                                <div className={style.tip}>USDT: 1 : 99999平台幣</div>
                                <BlockChain
                                    onSelectChain={handleSelectChain}
                                    options={chainList}
                                    selectTitle="选择网路"
                                />
                            </div>
                            <button
                                className={`${style.send} ${
                                    amount.trim() !== '' ? style.active : ''
                                }`}
                                onClick={() => {
                                    setPay(true);
                                }}
                                type="button"
                            >
                                确认送出
                            </button>
                        </div>
                        <div className={style.attention}>
                            <div className={style.title}>注意事项</div>
                            <div className={style.text}>
                                <span>1. 请使用正确协议充值</span>
                                <span>
                                    2.
                                    交易所转帐可能会收取手续费，请务必使USDT实际到帐数量和订单数量相符，否则无法完成充值
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Pay amount={amount} chain={selectedChain} onClose={handleClose} />
            )}
        </>
    );
}

export default Usdt;
