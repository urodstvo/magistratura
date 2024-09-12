import { n, N } from './constants';
import { getPointsTable } from './stages/stage1';
import './style.css';

document.querySelector('#app')!.innerHTML = getPointsTable(N, n);
