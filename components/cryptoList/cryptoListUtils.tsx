import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import clsx from 'classnames';
import { CiStar } from 'react-icons/ci';
import { cryptoIcons } from './cryptoListConfigs';

interface IHeadCell {
    id: number;
    label: string | React.ReactNode;
    additionalClassName?: string;
}

export interface IRenderTableBodyCell {
    rank: number;
    name: string;
    symbol: string;
    price: string;
    change1h: string;
    change24h: string;
    change7d: string;
    change30d: string;
    marketCap: string;
    volume24h: string;
    volumeUnits: string;
}

export const getPercentChangeClass = (value: string) => {
    const numericValue = parseFloat(value);
    if (numericValue >= 0) return 'text-green-500';
    if (numericValue < 0) return 'text-red-500';
    return '';
};

export const renderArrow = (value: string) => {
    const numericValue = parseFloat(value);
    if (numericValue > 0) return <IoMdArrowDropup className="ml-1 inline" />;
    if (numericValue < 0) return <IoMdArrowDropdown className="ml-1 inline" />;
    return null;
};

export const renderTableHeadCells = (data: IHeadCell[]) => {
    return (
        <tr>
            {data.map((item) => (
                <th
                    key={item.id}
                    className={twMerge(
                        'px-4 py-2 text-right',
                        clsx(item.additionalClassName)
                    )}
                >
                    {item.label}
                </th>
            ))}
        </tr>
    );
};

export const renderTableBodyCells = (crypto: IRenderTableBodyCell) => {
    return (
        <>
            <td className="px-4 py-2">
                <CiStar className="m-auto" />
            </td>
            <td className="px-4 py-2 text-center">{crypto.rank}</td>
            <td className="px-4 py-2 text-right">
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 font-bold">
                        {cryptoIcons[crypto.symbol]} {crypto.name}
                    </span>
                    {crypto.symbol}
                </div>
            </td>
            <td className="px-4 py-2 text-right">{crypto.price}</td>
            <td
                className={`px-4 py-2 text-right ${getPercentChangeClass(crypto.change1h)}`}
            >
                <div className="flex items-center justify-end">
                    {renderArrow(crypto.change1h)} {crypto.change1h}
                </div>
            </td>
            <td
                className={`px-4 py-2 text-right ${getPercentChangeClass(crypto.change24h)}`}
            >
                <div className="flex items-center justify-end">
                    {renderArrow(crypto.change24h)} {crypto.change24h}
                </div>
            </td>
            <td
                className={`px-4 py-2 text-right ${getPercentChangeClass(crypto.change7d)}`}
            >
                <div className="flex items-center justify-end">
                    {renderArrow(crypto.change7d)} {crypto.change7d}
                </div>
            </td>
            <td
                className={`px-4 py-2 text-right ${getPercentChangeClass(crypto.change30d)}`}
            >
                <div className="flex items-center justify-end">
                    {renderArrow(crypto.change30d)} {crypto.change30d}
                </div>
            </td>
            <td className="px-4 py-2 text-right">{crypto.marketCap}</td>
            <td className="px-4 py-2 text-right">
                {crypto.volume24h}
                <br />
                <span className="text-sm">{crypto.volumeUnits}</span>
            </td>
        </>
    );
};
