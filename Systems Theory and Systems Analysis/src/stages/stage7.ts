import { Cell, Row, Table, Header, HCell, Body } from '../components/table';
import { solution as stage6_solution } from './stage6';
import { solution as stage2_solution } from './stage2';
import { solution as stage3_solution } from './stage3';
import { Chart } from 'chart.js';

const [selected] = stage2_solution();

function solution() {
    const fs = stage6_solution();

    const optim = fs.sort((a, b) => a[1] - b[1])[0];
    return [optim];
}

export const getSolutionTable = () => {
    const points = solution();

    const rows: string[] = [];

    for (let i = 0; i < points.length; i++) {
        const cells: string[] = [];

        for (let j = 0; j < points[i].length; j++) {
            cells.push(Cell(points[i][j]));
        }
        rows.push(Row(cells));
    }

    return Table(
        Header(
            Row([
                HCell('№'),
                HCell('F<sub>1</sub>'),
                HCell('F<sub>2</sub>'),
                HCell('F<sub>3</sub>'),
                HCell('F<sub>4</sub>'),
            ]),
        ),
        Body(rows),
        null,
    );
};

export const getSolutionPointTable = () => {
    const dot = solution();

    const points = selected.filter((el) => el[0] === dot[0][0]);

    const rows: string[] = [];

    for (let i = 0; i < points.length; i++) {
        const cells: string[] = [];

        for (let j = 0; j < points[i].length; j++) {
            cells.push(Cell(points[i][j]));
        }
        rows.push(Row(cells));
    }

    return Table(
        Header(
            Row([
                HCell('№'),
                HCell('α<sub>1</sub>'),
                HCell('α<sub>2</sub>'),
                HCell('α<sub>3</sub>'),
                HCell('α<sub>4</sub>'),
                HCell('α<sub>5</sub>'),
                HCell('α<sub>6</sub>'),
                HCell('α<sub>7</sub>'),
                HCell('α<sub>8</sub>'),
                HCell('α<sub>9</sub>'),
                HCell('α<sub>10</sub>'),
            ]),
        ),
        Body(rows),
        null,
    );
};

export const getChart = (mp: number) => {
    const dot = solution();

    const points = selected.filter((el) => el[0] === dot[0][0]);
    const data = stage3_solution(points[0], mp);

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
                    suggestedMax: 0,
                    suggestedMin: 15,
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

export const getCharts = () => {
    const mps = [4, 5, 6, 8];

    return mps.map((el) => getChart(el));
};
