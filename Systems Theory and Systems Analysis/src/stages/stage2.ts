import { findCoords } from './stage1';
import { Body, Cell, HCell, Header, Row, Table } from '../components/table';

const f3 = (alpha: number[]) => alpha[0] * alpha[5];
const f4 = (alpha: number[]) => alpha[6] + 6 - (alpha[1] + alpha[4]) * 10 * (1 / (9.8 * 0.1));
const f5 = (alpha: number[]) => alpha[6] + alpha[7] + 6 - (alpha[3] + alpha[4]) * 10 * (1 / (9.8 * 0.1));
const f6 = (alpha: number[]) =>
    (alpha[3] * 6 * 9.8 - alpha[0] * alpha[5] * (alpha[3] + alpha[4])) /
        (alpha[1] * alpha[3] + alpha[1] * alpha[4] + alpha[3] * alpha[4]) -
    alpha[8];

const checkF3 = (x: number) => x <= 31;
const checkF4 = (x: number) => x <= 0;
const checkF5 = (x: number) => x <= 0;
const checkF6 = (x: number) => x <= 0;

type CounterType = {
    f3: number;
    f4: number;
    f5: number;
    f6: number;
};
export const solution = (): [number[][], CounterType] => {
    const coords = findCoords();

    const selected: number[][] = [];

    const counter: CounterType = {
        f3: 0,
        f4: 0,
        f5: 0,
        f6: 0,
    };

    for (let i = 0; i < coords.length; i++) {
        if (checkF3(f3(coords[i]))) counter.f3++;
        else continue;

        if (checkF4(f4(coords[i]))) counter.f4++;
        else continue;

        if (checkF5(f5(coords[i]))) counter.f5++;
        else continue;

        if (checkF6(f6(coords[i]))) counter.f6++;
        else continue;

        selected.push([i + 1, ...coords[i]]);
    }

    return [selected, counter];
};

export const getSolutionTable = () => {
    const [selected, counter] = solution();
    console.log(counter);

    const rows: string[] = [];

    for (let i = 0; i < selected.length; i++) {
        const cells: string[] = [];

        for (let j = 0; j < selected[i].length; j++) {
            cells.push(Cell(selected[i][j]));
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
