import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { options } from './chartOptions';
import useFetchChartData from '@/services/useFetchChartData';

interface ChartProps {
    symbol?: string;
    limit: number;
}

const Chart: React.FC<ChartProps> = ({ symbol, limit }) => {
    const [interval, setInterval] = useState<string>('15m');
    const { chartData, error: chartError } = useFetchChartData(
        symbol,
        interval,
        limit
    );

    if (chartError) {
        return <div>No chart is available</div>;
    }

    return (
        <div>
            <div className="mb-4 flex justify-center">
                {['15m', '30m', '1h', '4h', '1d'].map((intv) => (
                    <button
                        key={intv}
                        className={`mx-1 border border-transparent px-3 py-1 text-sm ${
                            interval === intv
                                ? 'border-yellow-500 text-yellow-500'
                                : 'text-gray-400 hover:text-yellow-500'
                        }`}
                        onClick={() => setInterval(intv)}
                    >
                        {intv}
                    </button>
                ))}
            </div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={[{ data: chartData }]}
                    type="candlestick"
                    height={350}
                />
            </div>
        </div>
    );
};

export default Chart;
