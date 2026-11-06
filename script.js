
/* =====================================
   MARKETPULSE INDIA
   Educational sample market database
===================================== */

const indices = [
    {
        name: "NIFTY 50",
        symbol: "NIFTY",
        value: 24850.50,
        change: 185.40,
        percent: 0.75,
        open: 24690.20,
        high: 24910.80,
        low: 24650.10
    },
    {
        name: "SENSEX",
        symbol: "SENSEX",
        value: 81620.30,
        change: 425.60,
        percent: 0.52,
        open: 81240.00,
        high: 81750.20,
        low: 81090.40
    },
    {
        name: "BANK NIFTY",
        symbol: "BANKNIFTY",
        value: 53240.80,
        change: 310.25,
        percent: 0.59,
        open: 52980.50,
        high: 53410.60,
        low: 52870.30
    },
    {
        name: "NIFTY MIDCAP 150",
        symbol: "MIDCAP",
        value: 19680.45,
        change: -85.20,
        percent: -0.43,
        open: 19750.00,
        high: 19810.50,
        low: 19620.20
    }
];

const stocks = [
    { company: "Reliance Industries", symbol: "RELIANCE", price: 1452.80, change: 18.50, percent: 1.29, volume: "42.5L" },
    { company: "Tata Consultancy Services", symbol: "TCS", price: 3890.50, change: 25.30, percent: 0.65, volume: "12.8L" },
    { company: "HDFC Bank", symbol: "HDFCBANK", price: 1685.40, change: -8.60, percent: -0.51, volume: "35.2L" },
    { company: "Infosys", symbol: "INFY", price: 1840.20, change: 22.40, percent: 1.23, volume: "28.6L" },
    { company: "ICICI Bank", symbol: "ICICIBANK", price: 1245.60, change: 12.70, percent: 1.03, volume: "31.4L" },
    { company: "Tata Motors", symbol: "TATAMOTORS", price: 965.80, change: -5.20, percent: -0.54, volume: "22.1L" },
    { company: "State Bank of India", symbol: "SBIN", price: 825.30, change: 9.40, percent: 1.15, volume: "46.7L" },
    { company: "Bharti Airtel", symbol: "BHARTIARTL", price: 1580.75, change: 14.20, percent: 0.91, volume: "16.3L" },
    { company: "Larsen & Toubro", symbol: "LT", price: 3620.40, change: 28.60, percent: 0.80, volume: "8.9L" },
    { company: "ITC Limited", symbol: "ITC", price: 445.20, change: -2.10, percent: -0.47, volume: "19.5L" }
];

const sectors = [
    { name: "Information Technology", description: "IT and Software", change: 1.85, strength: 85 },
    { name: "Banking", description: "Banks and Finance", change: 1.25, strength: 72 },
    { name: "Automobile", description: "Auto and Components", change: 0.92, strength: 65 },
    { name: "Pharmaceuticals", description: "Healthcare and Pharma", change: 0.68, strength: 58 },
    { name: "FMCG", description: "Consumer Goods", change: -0.35, strength: 35 },
    { name: "Metal", description: "Metal and Mining", change: -0.72, strength: 28 },
    { name: "Real Estate", description: "Property and Realty", change: 0.45, strength: 48 },
    { name: "Energy", description: "Oil and Gas", change: -0.18, strength: 40 }
];

/* NUMBER FORMATTING */

function formatPrice(number) {
    return Number(number).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatChange(number) {
    return (number > 0 ? "+" : "") + Number(number).toFixed(2);
}

function getColorClass(number) {
    if (number > 0) return "positive-text";
    if (number < 0) return "negative-text";
    return "neutral-text";
}

/* SHOW CURRENT DATE */

function showDate() {
    const date = new Date();

    document.getElementById("currentDate").textContent =
        date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
}

/* INDEX CARDS */

function displayIndexCards() {
    const container = document.getElementById("indexCards");

    container.innerHTML = indices.map(index => `
        <div class="index-card">
            <div class="index-card-top">
                <span class="index-name">${index.name}</span>
                <span class="index-symbol">${index.symbol}</span>
            </div>

            <div class="index-value">${formatPrice(index.value)}</div>

            <div class="index-change ${getColorClass(index.percent)}">
                ${formatChange(index.change)}
                (${formatChange(index.percent)}%)
            </div>
        </div>
    `).join("");
}

/* INDEX TABLE */

function displayIndexTable() {
    const table = document.getElementById("indexTable");

    table.innerHTML = indices.map(index => `
        <tr>
            <td>${index.name}</td>
            <td>${formatPrice(index.value)}</td>
            <td class="${getColorClass(index.change)}">
                ${formatChange(index.change)}
            </td>
            <td class="${getColorClass(index.percent)}">
                ${formatChange(index.percent)}%
            </td>
            <td>${formatPrice(index.open)}</td>
            <td>${formatPrice(index.high)}</td>
            <td>${formatPrice(index.low)}</td>
        </tr>
    `).join("");
}

/* STOCK TABLE */

function displayStocks(searchText = "") {
    const table = document.getElementById("stockTable");

    const filteredStocks = stocks.filter(stock =>
        stock.company.toLowerCase().includes(searchText.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredStocks.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center">
                    No matching company found
                </td>
            </tr>
        `;
        return;
    }

    table.innerHTML = filteredStocks.map(stock => `
        <tr>
            <td>${stock.company}</td>
            <td>${stock.symbol}</td>
            <td>₹${formatPrice(stock.price)}</td>
            <td class="${getColorClass(stock.change)}">
                ${formatChange(stock.change)}
            </td>
            <td class="${getColorClass(stock.percent)}">
                ${formatChange(stock.percent)}%
            </td>
            <td>${stock.volume}</td>
        </tr>
    `).join("");
}

/* SECTOR ANALYSIS */

function displaySectors() {
    const container = document.getElementById("sectorGrid");

    container.innerHTML = sectors.map(sector => {
        const direction = sector.change >= 0 ? "" : "down";

        return `
            <div class="sector-card">
                <h3>${sector.name}</h3>
                <p>${sector.description}</p>

                <div class="sector-performance">
                    <strong class="${getColorClass(sector.change)}">
                        ${formatChange(sector.change)}%
                    </strong>
                    <span class="index-name">Sample change</span>
                </div>

                <div class="sector-line">
                    <div class="${direction}" style="width:${sector.strength}%"></div>
                </div>
            </div>
        `;
    }).join("");
}

/* CHART DATABASE */

const chartData = {
    "1D": {
        labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
        values: [24650, 24720, 24690, 24800, 24760, 24820, 24850]
    },

    "1W": {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [24200, 24350, 24180, 24500, 24420, 24650, 24850]
    },

    "1M": {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [23900, 24150, 24400, 24850]
    },

    "1Y": {
        labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
        values: [21800, 22400, 23100, 22750, 23900, 24850]
    }
};

let marketChart;

function createMarketChart(range = "1D") {
    const selectedData = chartData[range];

    const canvas = document.getElementById("marketChart");

    if (marketChart) {
        marketChart.destroy();
    }

    marketChart = new Chart(canvas, {
        type: "line",

        data: {
            labels: selectedData.labels,

            datasets: [{
                label: "NIFTY 50",
                data: selectedData.values,
                borderColor: "#4169e1",
                backgroundColor: "rgba(65,105,225,0.10)",
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: "#4169e1"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: "#14213a",
                    padding: 12,
                    displayColors: false
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#929db0",
                        font: {
                            size: 10
                        }
                    },
                    border: {
                        display: false
                    }
                },

                y: {
                    grid: {
                        color: "#edf0f5"
                    },
                    ticks: {
                        color: "#929db0",
                        font: {
                            size: 10
                        }
                    },
                    border: {
                        display: false
                    }
                }
            }
        }
    });
}

/* CHART RANGE BUTTON */

document.getElementById("chartRange").addEventListener("change", function () {
    createMarketChart(this.value);
});

/* STOCK SEARCH */

document.getElementById("stockSearch").addEventListener("input", function () {
    displayStocks(this.value);
});

/* SIDEBAR ACTIVE LINK */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

/* INITIALISE WEBSITE */

showDate();
displayIndexCards();
displayIndexTable();
displayStocks();
displaySectors();
createMarketChart("1D");
