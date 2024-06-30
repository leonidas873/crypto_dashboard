import useSWR from 'swr';
import { fetcher } from './fetcher';
import { CryptoApiResponse } from '@/types/cryptoData';

const useFetchCryptoData = (
    symbols: string = 'BTC,ETH,USDT,BNB,SOL,USDC,XRP,DOGE',
    shouldFetch: boolean = true
) => {
    const { data, error, isLoading } = useSWR<CryptoApiResponse>(
        shouldFetch ? `/api/coinmarketcap?symbol=${symbols}` : null,
        fetcher,
        {
            refreshInterval: 30000,
        }
    );

    return { data, error, isLoading };
};

export default useFetchCryptoData;
