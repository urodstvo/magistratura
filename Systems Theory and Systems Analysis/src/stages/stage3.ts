import Chart from 'chart.js/auto';

const X1 = 0.5;
const X2 = -0.5;
const Y1 = 0;
const Y2 = 0;
const h = 0.005;
const T0 = 0;
const T1 = 15;
const mu = 0.001;
const Kmu = 0.001;
const Km = 0.1;
const e = 0.1;
const mp = 4;

const G = (t: number, alpha: number[]) => {
    const k0 = alpha[0];
    const velocity = alpha[9];
    const p = alpha[5];

    return k0 * p * (Math.sin(velocity * t) + mu * velocity * Math.cos(velocity * t));
};

const sigma = (x: number) => (x >= e ? 0 : 1);

const f = (x: number, alpha: number[], Mp: number) => {
    const mu1 = mu + Kmu * Mp;
    const k0 = alpha[0];
    const k1 = alpha[1];
    const ka = alpha[2];

    return mu1 * (k0 + k1 + sigma(x) * ka);
};

const p = (x: number, alpha: number[]) => {
    const k0 = alpha[0];
    const k1 = alpha[1];
    const ka = alpha[2];

    return (k0 + k1) * x + sigma(x) * ka * (x + e);
};

const $y1 = (t: number, x1: number, x2: number, y1: number, y2: number, alpha: number[], Mp: number) => {
    const m1 = alpha[6] + Km * Mp;
    const k3 = alpha[4];
    const x = x1 - x2;

    return (G(t, alpha) - f(x, alpha, Mp) * (y1 - y2) - mu * k3 * y1 - p(x, alpha) - k3 * x1) / m1;
};

const $y2 = (t: number, x1: number, x2: number, y1: number, y2: number, alpha: number[], Mp: number) => {
    const m2 = alpha[7];
    const k2 = alpha[3];
    const x = x1 - x2;

    return (-G(t, alpha) + f(x, alpha, Mp) * (y1 - y2) - mu * k2 * y2 + p(x, alpha) - k2 * x2) / m2;
};

export const solution = (alpha: number[] = [49.5, 79.5, 1414, 27, 27, 0.4, 5, 6, 0.4, 89], Mp: number = mp) => {
    const n = (T1 - T0) / h;

    const t0 = T0;
    let t = t0;
    let y1 = Y1;
    let y2 = Y2;
    let x1 = X1;
    let x2 = X2;

    const result: { t: number; x1: number; x2: number; y1: number; y2: number }[] = [{ t, x1, x2, y1, y2 }];

    for (let i = 1; i <= n; i++) {
        t = parseFloat((t0 + i * h).toFixed(3));

        const x1_new = x1 + h * y1;
        const x2_new = x2 + h * y2;

        const y1_new = y1 + h * $y1(t, x1, x2, y1, y2, alpha, Mp);
        const y2_new = y2 + h * $y2(t, x1, x2, y1, y2, alpha, Mp);

        y1 = y1_new;
        y2 = y2_new;
        x1 = x1_new;
        x2 = x2_new;

        result.push({ t, x1, x2, y1, y2 });
    }

    // console.log(result);
    return result;
};

export const printChart = () => {
    const data = solution();

    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');
    const chart = document.createElement('canvas');

    chartContainer.appendChild(chart);

    new Chart(chart, {
        type: 'line',
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    suggestedMax: T1,
                    suggestedMin: T0,
                },
                // y: {
                //     suggestedMin: -15,
                //     suggestedMax: 15,
                // },
            },
        },
        data: {
            labels: data.map((item) => item.t.toString()),
            datasets: [
                {
                    label: 'x1',
                    data: data.map((item) => item.x1),
                    borderColor: '#ff0000',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                },
                {
                    label: 'x2',
                    data: data.map((item) => item.x2),
                    borderColor: '#0aaab0',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                },
                {
                    label: 'y1',
                    data: data.map((item) => item.y1),
                    borderColor: '#00ff00',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                },
                {
                    label: 'y2',
                    data: data.map((item) => item.y2),
                    borderColor: '#ff00ff',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                },
            ],
        },
    });

    return chartContainer;
};
