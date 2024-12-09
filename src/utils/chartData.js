const initialData = [
    { date: "2024-11-27 09:00:00", open: 125.10, high: 130.67, low: 120.20, close: 127.05, volume: 800 },
    { date: "2024-11-27 10:00:00", open: 127.05, high: 132.50, low: 125.00, close: 130.00, volume: 900 },
    { date: "2024-11-27 11:00:00", open: 130.00, high: 133.00, low: 129.50, close: 132.00, volume: 850 },
    { date: "2024-11-27 12:00:00", open: 132.00, high: 135.00, low: 131.00, close: 134.50, volume: 1000 },
    { date: "2024-11-27 13:00:00", open: 134.50, high: 137.50, low: 133.00, close: 136.50, volume: 1050 },
    { date: "2024-11-27 14:00:00", open: 136.50, high: 140.00, low: 135.50, close: 138.00, volume: 1150 },
    { date: "2024-11-27 15:00:00", open: 138.00, high: 142.50, low: 137.00, close: 140.00, volume: 1200 },
    { date: "2024-11-27 16:00:00", open: 140.00, high: 145.00, low: 139.00, close: 143.00, volume: 1300 },
    { date: "2024-11-27 17:00:00", open: 143.00, high: 147.00, low: 141.00, close: 145.50, volume: 1400 },
    { date: "2024-11-27 18:00:00", open: 145.50, high: 150.00, low: 144.00, close: 147.50, volume: 1350 },
    { date: "2024-11-27 19:00:00", open: 147.50, high: 152.00, low: 146.00, close: 150.00, volume: 1400 },
    { date: "2024-11-27 20:00:00", open: 150.00, high: 155.00, low: 148.00, close: 153.50, volume: 1450 },
    { date: "2024-11-27 21:00:00", open: 153.50, high: 158.00, low: 152.00, close: 155.50, volume: 1500 },
    { date: "2024-11-27 22:00:00", open: 155.50, high: 160.00, low: 154.00, close: 158.00, volume: 1400 },

    // Adding entries for the next day
    { date: "2024-11-28 09:00:00", open: 158.00, high: 162.00, low: 157.00, close: 160.50, volume: 800 },
    { date: "2024-11-28 10:00:00", open: 160.50, high: 165.00, low: 159.00, close: 163.00, volume: 950 },
    { date: "2024-11-28 11:00:00", open: 163.00, high: 167.50, low: 161.00, close: 165.50, volume: 900 },
    { date: "2024-11-28 12:00:00", open: 165.50, high: 170.00, low: 163.50, close: 168.00, volume: 950 },
    { date: "2024-11-28 13:00:00", open: 168.00, high: 172.50, low: 166.00, close: 170.50, volume: 1100 },
    { date: "2024-11-28 14:00:00", open: 170.50, high: 175.00, low: 168.50, close: 173.00, volume: 1200 },
    { date: "2024-11-28 15:00:00", open: 173.00, high: 177.50, low: 171.00, close: 175.50, volume: 1250 },
    { date: "2024-11-28 16:00:00", open: 175.50, high: 180.00, low: 174.00, close: 178.50, volume: 1300 },
    { date: "2024-11-28 17:00:00", open: 178.50, high: 183.00, low: 176.50, close: 181.00, volume: 1350 },
    { date: "2024-11-28 18:00:00", open: 181.00, high: 185.00, low: 179.50, close: 183.50, volume: 1400 },
    { date: "2024-11-28 19:00:00", open: 183.50, high: 188.00, low: 181.50, close: 186.00, volume: 1450 },
    { date: "2024-11-28 20:00:00", open: 186.00, high: 190.00, low: 184.00, close: 188.50, volume: 1500 },
    { date: "2024-11-28 21:00:00", open: 188.50, high: 193.00, low: 186.50, close: 191.00, volume: 1400 },
    { date: "2024-11-28 22:00:00", open: 191.00, high: 195.00, low: 189.50, close: 193.50, volume: 1350 },

    // Adding entries for another day
    { date: "2024-11-29 09:00:00", open: 193.50, high: 198.00, low: 191.50, close: 195.50, volume: 900 },
    { date: "2024-11-29 10:00:00", open: 195.50, high: 200.00, low: 193.50, close: 198.00, volume: 950 },
    { date: "2024-11-29 11:00:00", open: 198.00, high: 203.00, low: 196.00, close: 200.50, volume: 1000 },
    { date: "2024-11-29 12:00:00", open: 200.50, high: 205.00, low: 198.50, close: 203.00, volume: 1100 },
    { date: "2024-11-29 13:00:00", open: 203.00, high: 208.00, low: 201.50, close: 206.00, volume: 1200 },
    { date: "2024-11-29 14:00:00", open: 206.00, high: 211.00, low: 204.50, close: 208.50, volume: 1250 },
    { date: "2024-11-29 15:00:00", open: 208.50, high: 213.00, low: 206.50, close: 211.00, volume: 1300 },
    { date: "2024-11-29 16:00:00", open: 211.00, high: 215.00, low: 209.00, close: 213.50, volume: 1350 },
];

export default initialData;
