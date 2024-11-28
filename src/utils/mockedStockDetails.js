const mockedStockDetailsList = [
    {
        symbol: "S1",
        name: "Apple Inc.",
        currentPrice: 463.72,
        change: {
            absolute: -36.78, // Assuming this from 1M percentage change
            percentage: -7.81,
        },
        marketStatus: "Stock market closed (will be opened at 3:30 PM CET)",
        timeFrames: ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "ALL"],
        chartData: [
            { time: "16:00", high: 470.00, low: 460.00, open: 468.00, close: 463.72 },
            { time: "17:00", high: 472.00, low: 461.00, open: 463.72, close: 469.00 },
        ],
        scores: [
            { label: "Score 1", buy: 75, hold: 20, sell: 5 },
            { label: "Score 2", buy: 80, hold: 15, sell: 5 },
        ],
        statistics: [
            { label: "Market Cap", value: "2.45T" },
            { label: "P/E Ratio (TTM)", value: "34.28" },
            { label: "EPS (TTM)", value: "3.28 USD" },
            { label: "Dividend Yield", value: "0.65%" },
            { label: "52-Week High", value: "475.00 USD" },
            { label: "52-Week Low", value: "355.00 USD" },
        ],
        news: [
            {
                title: "Apple releases new iPhone series",
                date: "2024-11-15",
                source: "Reuters",
                summary:
                    "Apple's latest iPhone lineup introduces groundbreaking features with robust pre-orders.",
                link: "https://example.com/apple-iphone-release",
            },
            {
                title: "Apple's Q4 earnings surpass expectations",
                date: "2024-11-12",
                source: "Bloomberg",
                summary:
                    "Apple posted record-breaking revenue of $124.5 billion in Q4, led by strong sales of MacBooks.",
                link: "https://example.com/apple-q4-earnings",
            },
        ],
        technicalIndicators: [
            { label: "RSI (14)", value: "58.21", interpretation: "Neutral" },
            { label: "SMA (50)", value: "455.65", interpretation: "Bullish" },
            { label: "SMA (200)", value: "430.45", interpretation: "Bullish" },
        ],
        financials: {
            incomeStatement: {
                revenue: "394.3B USD",
                grossProfit: "169.6B USD",
                operatingIncome: "119.4B USD",
                netIncome: "101.4B USD",
            },
            balanceSheet: {
                totalAssets: "351.0B USD",
                totalLiabilities: "287.0B USD",
                shareholderEquity: "64.0B USD",
            },
            cashFlow: {
                operatingCashFlow: "121.0B USD",
                investingCashFlow: "-34.0B USD",
                financingCashFlow: "-89.0B USD",
            },
        },
        relatedStocks: [
            { symbol: "MSFT", name: "Microsoft Corp.", price: 353.82 },
            { symbol: "GOOGL", name: "Google LLC", price: 109.58 },
        ],
    },
    {
        symbol: "S2",
        name: "Google LLC",
        currentPrice: 109.58,
        change: {
            absolute: -7.85, // Assuming this from 1M percentage change
            percentage: -6.69,
        },
        marketStatus: "Stock market closed (will be opened at 3:30 PM CET)",
        timeFrames: ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "ALL"],
        chartData: [
            { time: "16:00", high: 112.00, low: 108.00, open: 111.00, close: 109.58 },
            { time: "17:00", high: 113.00, low: 109.00, open: 109.58, close: 111.50 },
        ],
        scores: [
            { label: "Score 1", buy: 65, hold: 25, sell: 10 },
            { label: "Score 2", buy: 70, hold: 20, sell: 10 },
        ],
        statistics: [
            { label: "Market Cap", value: "1.68T" },
            { label: "P/E Ratio (TTM)", value: "32.13" },
            { label: "EPS (TTM)", value: "5.67 USD" },
            { label: "Dividend Yield", value: "N/A" },
            { label: "52-Week High", value: "120.50 USD" },
            { label: "52-Week Low", value: "95.00 USD" },
        ],
        news: [
            {
                title: "Google's AI advancements dominate the industry",
                date: "2024-11-10",
                source: "CNBC",
                summary:
                    "Google's DeepMind and AI initiatives continue to lead the way in cutting-edge technology applications.",
                link: "https://example.com/google-ai-advancements",
            },
            {
                title: "Google partners with government on cloud infrastructure",
                date: "2024-11-05",
                source: "Reuters",
                summary:
                    "Google Cloud secures a multi-billion dollar deal to provide AI-driven cloud solutions for government agencies.",
                link: "https://example.com/google-cloud-partnership",
            },
        ],
        technicalIndicators: [
            { label: "RSI (14)", value: "61.75", interpretation: "Neutral" },
            { label: "SMA (50)", value: "110.12", interpretation: "Neutral" },
            { label: "SMA (200)", value: "105.87", interpretation: "Bullish" },
        ],
        financials: {
            incomeStatement: {
                revenue: "256.8B USD",
                grossProfit: "146.5B USD",
                operatingIncome: "79.3B USD",
                netIncome: "64.2B USD",
            },
            balanceSheet: {
                totalAssets: "357.2B USD",
                totalLiabilities: "93.4B USD",
                shareholderEquity: "263.8B USD",
            },
            cashFlow: {
                operatingCashFlow: "97.4B USD",
                investingCashFlow: "-24.8B USD",
                financingCashFlow: "-30.2B USD",
            },
        },
        relatedStocks: [
            { symbol: "MSFT", name: "Microsoft Corp.", price: 353.82 },
            { symbol: "AAPL", name: "Apple Inc.", price: 463.72 },
        ],
    },
];

export default mockedStockDetailsList;
