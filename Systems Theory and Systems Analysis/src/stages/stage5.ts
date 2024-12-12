import { solution as step4_solution } from './stage4';
import { solution as step3_solution } from './stage3';
import { Cell, Row, Table, Header, HCell, Body } from '../components/table';

export function solution() {
    const points = step4_solution();
    const result: number[][] = [];
    for (let alpha of points) {
        const m0 = alpha[7];
        const m2 = alpha[8];

        const w_1Hs = [];
        const w_1Bs = [];
        for (let mp of [4, 5, 6, 8]) {
            const s = step3_solution(alpha, mp).map((el) => el.y1);
            w_1Bs.push(Math.min(...s));
            w_1Hs.push(Math.max(...s));
        }
        const max_w_1B = Math.max(...w_1Bs);
        const min_w_1B = Math.min(...w_1Bs);
        const max_w_1H = Math.max(...w_1Hs);
        const min_w_1H = Math.min(...w_1Hs);

        const F1 = m0 + m2;
        const F2 = max_w_1B / max_w_1H;
        const F3 = max_w_1B / min_w_1B - 1;
        const F4 = max_w_1B / min_w_1H - 1;

        result.push([alpha[0], F1, F2, F3, F4]);
    }
    return result;
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
