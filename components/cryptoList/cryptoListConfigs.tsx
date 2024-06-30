import {
    SiBnbchain,
    SiBitcoin,
    SiEthereum,
    SiTether,
    SiSolana,
    SiXrp,
    SiDogecoin,
} from 'react-icons/si';
import { ReactNode } from 'react';
import { IoLogoUsd } from 'react-icons/io';

interface ICryptoIcon {
    [key: string]: ReactNode;
}

export const cryptoIcons: ICryptoIcon = {
    BTC: <SiBitcoin />,
    ETH: <SiEthereum />,
    USDT: <SiTether />,
    BNB: <SiBnbchain />,
    SOL: <SiSolana />,
    USDC: <IoLogoUsd />,
    XRP: <SiXrp />,
    DOGE: <SiDogecoin />,
};

export const cryptoListHeadCells = [
    {
        id: 1,
        label: '',
        additionalClassName: 'px-0',
    },
    {
        id: 2,
        label: '#',
        additionalClassName: 'text-center',
    },
    {
        id: 3,
        label: 'Name',
        additionalClassName: 'text-left',
    },
    {
        id: 4,
        label: 'Price',
        additionalClassName: '',
    },
    {
        id: 5,
        label: '1h %',
        additionalClassName: '',
    },
    {
        id: 6,
        label: '24h %',
        additionalClassName: '',
    },
    {
        id: 7,
        label: '7d %',
        additionalClassName: '',
    },
    {
        id: 8,
        label: '30d %',
        additionalClassName: '',
    },
    {
        id: 9,
        label: 'Market Cap',
        additionalClassName: '',
    },
    {
        id: 10,
        label: 'Volume(24h)',
        additionalClassName: '',
    },
];
