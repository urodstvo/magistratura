import { Body, Cell, HCell, Header, Row, Table } from '../components/table';
import c from '../param-contsraint.json';

const num_table = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 5, 15, 17, 51, 85, 255, 257, 771],
    [1, 1, 7, 11, 13, 61, 67, 79, 465, 721],
    [1, 3, 7, 5, 7, 43, 49, 147, 439, 1011],
    [1, 1, 5, 3, 15, 51, 125, 141, 177, 759],
    [1, 3, 1, 1, 9, 59, 25, 89, 321, 835],
    [1, 1, 3, 7, 31, 47, 109, 173, 181, 949],
    [1, 3, 3, 9, 9, 57, 43, 43, 225, 113],
    [1, 3, 7, 13, 3, 35, 89, 9, 235, 929],
    [1, 1, 5, 11, 27, 53, 69, 25, 103, 615],
];

const findCoords = (x: number, y: number) => {
    const arr = new Array(x).fill(0).map(() => new Array(y).fill(0));

    for (let i = 1; i <= x; i++) {
        const m = 1 + Math.trunc(Math.log(i) / Math.log(2));
        for (let j = 1; j <= y; j++) {
            let q_ij = 0;
            for (let k = 1; k <= m; k++) {
                let z = 0;
                for (let l = k; l <= m; l++) {
                    let tmp = i * Math.pow(2, -l);
                    const left = 2 * (tmp - Math.trunc(tmp));

                    tmp = num_table[j - 1][l - 1] * Math.pow(2, k - 1 - l);
                    const right = 2 * (tmp - Math.trunc(tmp));

                    z += Math.trunc(left) * Math.trunc(right);
                }
                q_ij += Math.pow(2, -k + 1) * (z / 2 - Math.trunc(z / 2));
            }

            const p = c[j - 1];
            arr[i - 1][j - 1] = p.min + (p.max - p.min) * q_ij;
        }
    }

    return arr;
};

export const getPointsTable = (x: number, y: number) => {
    const coords = findCoords(x, y);
    const rows: string[] = [];

    for (let i = 0; i < x; i++) {
        const cells: string[] = [Cell(i + 1)];

        for (let j = 0; j < y; j++) {
            cells.push(Cell(coords[i][j]));
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
