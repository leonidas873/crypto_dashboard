export const options: ApexCharts.ApexOptions = {
    chart: {
        type: 'candlestick',
        height: 350,
        background: '#1e1e1eaa',
        toolbar: {
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
                customIcons: [],
            },
            autoSelected: 'zoom',
        },
    },
    xaxis: {
        type: 'datetime',
        labels: {
            style: {
                colors: '#ffffff',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: '#ffffff',
            },
        },
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: '#02C076',
                downward: '#FF5252',
            },
        },
    },
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '12px',
            fontFamily: 'Arial, sans-serif',
        },
        onDatasetHover: {
            highlightDataSeries: true,
        },
        y: {
            formatter: (val: number) => val.toFixed(2),
            title: {
                formatter: () => '',
            },
        },
    },
    theme: {
        mode: 'dark',
    },
    grid: {
        borderColor: '#444',
    },
    stroke: {
        colors: ['#ffffff'],
    },
};
