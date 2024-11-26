import { solution as step3_solution } from './stage3';
import { solution as step2_solution } from './stage2';

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

function calculateAcceleration(positions: number[], timeStep: number = 0.005): number[] {
    const accelerations: number[] = [];
    for (let i = 1; i < positions.length - 1; i++) {
        const acceleration = (positions[i + 1] - 2 * positions[i] + positions[i - 1]) / (timeStep * timeStep);
        accelerations.push(acceleration);
    }
    return accelerations;
}

export function solution() {
    const mps = [4, 5, 6, 8];
    let [points] = step2_solution();
    // console.log(points.length, counter);
    points = points.map((el) => el.slice(1));
    console.log(points);

    for (let mp of mps) {
        points = points.filter((alpha) => {
            const system_solution = step3_solution(alpha, mp);
            const periods = calculatePeriods(system_solution.map((el) => [el.x1, el.x2]));
            // const period = findClosestToMajority(periods);
            const period = periods[0];
            const omega = 1.0 / period;

            if (alpha[9] - omega < 83) return false;
            const x1 = system_solution.map((el) => el.x1);
            const accelerations = calculateAcceleration(x1);
            if (Math.min(...accelerations) < 4 || Math.min(...accelerations) > 6) return false;
            if (Math.max(...accelerations) < 4 || Math.max(...accelerations) > 6) return false;

            console.log(accelerations);
            return true;
        });
    }
    console.log(points);
}
