import { solution as step3_solution } from './stage3';
import { solution as step2_solution } from './stage2';
import { Cell, Row, Table, Header, HCell, Body } from '../components/table';

function findClosestToMajority(arr: number[]): number {
    // Вычисляем среднее значение разностей для каждого элемента
    let closestValue = arr[0];
    let minAverageDifference = Infinity;

    for (const value of arr) {
        const averageDifference = arr.reduce((sum, other) => sum + Math.abs(value - other), 0) / arr.length;

        if (averageDifference < minAverageDifference) {
            minAverageDifference = averageDifference;
            closestValue = value;
        }
    }

    return closestValue;
}

function calculatePeriods(data: number[][], timeStep: number = 0.005): number[] {
    const periods: number[] = [];

    // Перебираем каждую функцию
    for (let j = 0; j < data[0].length; j++) {
        const zeroCrossings: number[] = []; // Массив временных точек пересечения оси

        let previousValue = data[0][j];
        for (let i = 1; i < data.length; i++) {
            const currentValue = data[i][j];
            const currentTime = i * timeStep;

            // Проверяем пересечение с осью Y (переход от отрицательного к положительному)
            if (previousValue <= 0 && currentValue > 0) {
                // Линейная интерполяция для более точного времени пересечения
                const interpolatedTime = currentTime - timeStep * (currentValue / (currentValue - previousValue));
                zeroCrossings.push(interpolatedTime);
            }

            previousValue = currentValue;
        }

        // Рассчитываем период, если найдено хотя бы два пересечения
        if (zeroCrossings.length > 1) {
            const calculatedPeriods = zeroCrossings
                .map((_, i, arr) => (i > 0 ? arr[i] - arr[i - 1] : null))
                .filter((period) => period !== null) as number[];
            const averagePeriod = calculatedPeriods.reduce((sum, p) => sum + p, 0) / calculatedPeriods.length;
            periods.push(averagePeriod);
        } else {
            periods.push(-1); // Если не удалось найти пересечения
        }
    }

    return periods;
}

export function solution() {
    const mps = [4, 5, 6, 8];
    let [points] = step2_solution();
    // console.log(points.length, counter);
    // points = points.map((el) => el.slice(1));
    // console.log('@step4 start', points.length);

    for (let mp of mps) {
        // console.log(mp);
        points = points.filter((alpha) => {
            const system_solution = step3_solution(alpha.slice(1), mp);
            const periods = calculatePeriods(system_solution.map((el) => [el.x1, el.x2, el.y1, el.y2]));
            const period = findClosestToMajority(periods);
            // const period = periods[0];
            const omega = 1.0 / period;
            // console.log(periods, period);

            if (alpha[10] - omega < 83) return false;
            let accelerations = system_solution.map((el) => el.y1);
            // console.log(Math.min(...accelerations), Math.max(...accelerations));
            if (Math.abs(Math.min(...accelerations)) < 3.5 || Math.abs(Math.min(...accelerations)) > 6) return false;
            if (Math.abs(Math.max(...accelerations)) < 3.5 || Math.abs(Math.max(...accelerations)) > 6) return false;
            return true;
        });
    }
    // console.log('@step4 end', points.length);

    return points;
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
