const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/api/klines', async (req, res) => {
    const { symbol, interval, limit, startTime, endTime } = req.query;
    const url = `${process.env.BINANCE_API_BASE_URL}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}&startTime=${startTime}&endTime=${endTime}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to fetch data from Binance API',
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({
                error: 'No response received from Binance API',
            });
        } else {
            res.status(500).json({
                error: 'Error setting up request to Binance API',
                details: error.message,
            });
        }
    }
});

app.get('/api/symbols', async (req, res) => {
    const url = `${process.env.BINANCE_API_BASE_URL}/api/v3/exchangeInfo`;

    try {
        const response = await axios.get(url);
        const symbols = response.data.symbols.map((symbol) => symbol.symbol);
        res.json(symbols);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to fetch data from Binance API',
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({
                error: 'No response received from Binance API',
            });
        } else {
            res.status(500).json({
                error: 'Error setting up request to Binance API',
                details: error.message,
            });
        }
    }
});

app.get('/api/crypto-data-prices', async (req, res) => {
    const cryptoData = [
        {
            symbol: 'BNB',
            unitPrice: 0,
            minConvertableAmount: 1,
            maxConvertableAmount: 1000,
        },
        {
            symbol: 'BTC',
            unitPrice: 0,
            minConvertableAmount: 0.001,
            maxConvertableAmount: 10,
        },
        {
            symbol: 'DOGE',
            unitPrice: 0,
            minConvertableAmount: 100,
            maxConvertableAmount: 1000000,
        },
        {
            symbol: 'ETH',
            unitPrice: 0,
            minConvertableAmount: 0.01,
            maxConvertableAmount: 100,
        },
        {
            symbol: 'SOL',
            unitPrice: 0,
            minConvertableAmount: 1,
            maxConvertableAmount: 5000,
        },
        {
            symbol: 'USDC',
            unitPrice: 0,
            minConvertableAmount: 1,
            maxConvertableAmount: 100000,
        },
        {
            symbol: 'USDT',
            unitPrice: 0,
            minConvertableAmount: 1,
            maxConvertableAmount: 100000,
        },
        {
            symbol: 'XRP',
            unitPrice: 0,
            minConvertableAmount: 10,
            maxConvertableAmount: 100000,
        },
    ];

    const symbols = cryptoData.map((item) => item.symbol).join(',');
    const url = `${process.env.COINMARKETCAP_API_BASE_URL}/v2/cryptocurrency/quotes/latest?symbol=${symbols}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            },
        });

        const quotes = response.data.data;
        cryptoData.forEach((item) => {
            const quote = quotes[item.symbol];
            if (quote) {
                item.unitPrice = quote[0].quote.USD.price;
            }
        });

        res.json(cryptoData);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to fetch data from CoinMarketCap API',
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({
                error: 'No response received from CoinMarketCap API',
            });
        } else {
            res.status(500).json({
                error: 'Error setting up request to CoinMarketCap API',
                details: error.message,
            });
        }
    }
});

app.get('/api/coinmarketcap', async (req, res) => {
    const { symbol } = req.query;
    const url = `${process.env.COINMARKETCAP_API_BASE_URL}/v2/cryptocurrency/quotes/latest?symbol=${symbol}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to fetch data from CoinMarketCap API',
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({
                error: 'No response received from CoinMarketCap API',
            });
        } else {
            res.status(500).json({
                error: 'Error setting up request to CoinMarketCap API',
                details: error.message,
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
