import { cryptoListHeadCells } from './cryptoListConfigs';
import { renderTableBodyCells, renderTableHeadCells } from './cryptoListUtils';
import { useRouter } from 'next/router';
import useFetchCryptoData from '@/services/useFetchCryptoData';
import { cryptoDataRemap } from '@/utils/helpers';

const CryptoList: React.FC = () => {
    const router = useRouter();
    const { data, error, isLoading } = useFetchCryptoData();

    const remapedData = data?.data ? cryptoDataRemap(data?.data) : null;
    const onRawClick = (symbol: string) => {
        router.push(`/${symbol}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white">
                <thead>{renderTableHeadCells(cryptoListHeadCells)}</thead>
                <tbody>
                    {remapedData?.map((crypto, index) => (
                        <tr
                            key={index}
                            className="cursor-pointer border-t border-gray-700 hover:bg-gray-600"
                            onClick={() => onRawClick(crypto.symbol)}
                        >
                            {renderTableBodyCells(crypto)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList;
