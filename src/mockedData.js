function generateMockedStocks(category, startSymbol) {
    const stocks = [];
    for (let i = 0; i < 100; i++) {
        const symbol = `${startSymbol}${i + 1}`;
        const name = `${category} Stock ${i + 1}`;
        const last = (Math.random() * 10000 + 5000).toFixed(2); // Random last price between 5000 and 15000
        const change = (Math.random() * 200 - 100).toFixed(2); // Random change between -100 and 100
        const changePercent = ((change / last) * 100).toFixed(2); // Calculate change percent
        stocks.push({
            symbol,
            name,
            last: parseFloat(last),
            change: parseFloat(change),
            changePercent: parseFloat(changePercent),
        });
    }
    return stocks;
}

const mockedData = [
    {
        category: 'US',
        stocks: generateMockedStocks('US', 'US'),
    },
    {
        category: 'Europe',
        stocks: generateMockedStocks('Europe', 'EU'),
    },
    {
        category: 'Asia',
        stocks: generateMockedStocks('Asia', 'AS'),
    },
    {
        category: 'Currencies',
        stocks: generateMockedStocks('Currencies', 'CUR'),
    },
    {
        category: 'Commodities',
        stocks: generateMockedStocks('Commodities', 'COM'),
    },
];

export default mockedData;
