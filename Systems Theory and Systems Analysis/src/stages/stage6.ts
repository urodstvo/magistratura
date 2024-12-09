import { Cell, Row, Table, Header, HCell, Body } from '../components/table';
import { solution as stage5_solution } from './stage5';

export function solution() {
    const Fs = stage5_solution();
    console.log('@before', Fs.length);

    const deleted: number[] = [];

    for (let i = 0; i < Fs.length - 1; i++)
        for (let j = i + 1; j < Fs.length; j++) {
            if (deleted.includes(i) || deleted.includes(j)) continue;

            const a = Fs[i];
            const b = Fs[j];

            if (a.slice(1).every((f, ind) => b[ind + 1] < f)) deleted.push(b[0]);
            else if (b.slice(1).every((f, ind) => a[ind + 1] < f)) deleted.push(a[0]);
        }

    const new_fs = Fs.filter((el) => !deleted.includes(el[0]));

    console.log('@after', new_fs.length);
    return new_fs;
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
