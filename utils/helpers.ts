import { CryptoData } from '@/types/cryptoData';

export const cryptoDataRemap = (coins: { [key: string]: CryptoData[] }) => {
    const remap = (coins: any) => {
        return Object.keys(coins)
            .map((key) => ({
                rank: coins[key][0].cmc_rank,
                name: coins[key][0].name,
                symbol: coins[key][0].symbol,
                price: `$${coins[key][0].quote.USD.price.toFixed(2)}`,
                change1h: `${coins[key][0].quote.USD.percent_change_1h.toFixed(2)}%`,
                change24h: `${coins[key][0].quote.USD.percent_change_24h.toFixed(2)}%`,
                change7d: `${coins[key][0].quote.USD.percent_change_7d.toFixed(2)}%`,
                change30d: `${coins[key][0].quote.USD.percent_change_30d.toFixed(2)}%`,
                marketCap: `$${coins[key][0].quote.USD.market_cap.toLocaleString()}`,
                volume24h: `$${coins[key][0].quote.USD.volume_24h.toLocaleString()}`,
                volumeUnits: `${(coins[key][0].quote.USD.volume_24h / coins[key][0].quote.USD.price).toLocaleString()} ${coins[key][0].symbol}`,
            }))
            .sort((a, b) => a.rank - b.rank);
    };
    return !!coins ? remap(coins) : null;
};
