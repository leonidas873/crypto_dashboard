import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useFetchCryptoData from '@/services/useFetchCryptoData';
import Head from 'next/head';

const CryptoDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error, isLoading } = useFetchCryptoData(id as string, !!id);
    const cryptoData = data?.data ? data?.data[id as string]?.[0] : null;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!cryptoData) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <Head>
                <title>{`${cryptoData.symbol} - ${cryptoData.quote.USD.price}`}</title>
                <meta
                    name="description"
                    content={`Details of ${cryptoData.name}`}
                />
            </Head>
            <h1>Crypto Details</h1>
            <div>
                <h2>{cryptoData.name}</h2>
                <p>Price: {cryptoData.quote.USD.price}</p>
                <p>Market Cap: {cryptoData.quote.USD.market_cap}</p>
                <p>Volume (24h): {cryptoData.quote.USD.volume_24h}</p>
                <p>Change (1h): {cryptoData.quote.USD.percent_change_1h}%</p>
                <p>Change (24h): {cryptoData.quote.USD.percent_change_24h}%</p>
                <p>Change (7d): {cryptoData.quote.USD.percent_change_7d}%</p>
                <p>Change (30d): {cryptoData.quote.USD.percent_change_30d}%</p>
            </div>
        </div>
    );
};

export default CryptoDetails;
