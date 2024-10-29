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

const getMU1 = (Mp: number) => {
    return mu + Kmu * Mp;
};

const G = (t: number, alpha: number[]) => {
    const k0 = alpha[0];
    const velocity = alpha[9];
    const p = alpha[5];

    return k0 * p * (Math.sin(velocity * t) + mu * velocity * Math.cos(velocity * t));
};

const sigma = (x: number) => (x >= e ? 0 : 1);

const f = (x: number, alpha: number[], Mp: number = 4) => {
    const mu1 = getMU1(Mp);
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

const $y1 = (t: number, y1: number, y2: number, alpha: number[], Mp = 4) => {
    const m1 = alpha[6] + Km * Mp;
    const k3 = alpha[4];
    const x1 = X1;

    return (G(t, alpha) - f(X1 - X2, alpha, Mp) * (y1 - y2) - mu * k3 * y1 - p(X1 - X2, alpha) - k3 * x1) / m1;
};

const $y2 = (t: number, y1: number, y2: number, alpha: number[], Mp = 4) => {
    const m2 = alpha[7];
    const k2 = alpha[3];
    const x2 = X2;

    return (-G(t, alpha) + f(X1 - X2, alpha, Mp) * (y1 - y2) - mu * k2 * y2 - p(X1 - X2, alpha) - k2 * x2) / m2;
};

export const solution = () => {
    const n = (T1 - T0) / h;

    const t0 = T0;
    let y1 = Y1;
    let y2 = Y2;

    const result: { t: number; y1: number; y2: number }[] = [];
    const alpha = [49.5, 79.5, 1414, 27, 27, 0.4, 5, 6, 0.4, 89];
    for (let i = 0; i < n; i++) {
        const t = t0 + i * h;

        y1 = y1 + h * $y1(t, y1, y2, alpha, 4);
        y2 = y1 + h * $y2(t, y1, y2, alpha, 4);

        result.push({
            t: t,
            y1: y1,
            y2: y2,
        });
    }

    console.log(result);
};
