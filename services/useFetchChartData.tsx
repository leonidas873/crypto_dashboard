import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import useSWR from 'swr';
import { fetcher } from '@/services/fetcher';

interface CandleData {
    x: Date;
    y: number[];
}
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const useFetchChartData = (symbol?: string, interval = '15m', limit = 100) => {
    const [chartData, setChartData] = useState<CandleData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { data: validSymbols } = useSWR('/api/symbols', fetcher);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const endTime = moment().tz(userTimezone).valueOf();
                const startTime = moment()
                    .tz(userTimezone)
                    .subtract(5, 'days')
                    .valueOf();

                const url = `/api/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}&startTime=${startTime}&endTime=${endTime}`;
                const data = await fetcher(url);

                const formattedData: CandleData[] = data.map((candle: any) => ({
                    x: new Date(candle[0]),
                    y: [
                        parseFloat(candle[1]),
                        parseFloat(candle[2]),
                        parseFloat(candle[3]),
                        parseFloat(candle[4]),
                    ],
                }));
                setChartData(formattedData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (
            symbol &&
            validSymbols &&
            validSymbols.length > 0 &&
            validSymbols.includes(symbol + 'USDT')
        ) {
            fetchData();
        }
    }, [symbol, interval, limit, validSymbols]);

    return { chartData, error };
};

export default useFetchChartData;
