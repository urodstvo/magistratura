import { HeaderComponent } from './components/header';
import { getPointsTable } from './stages/stage1';
import { getSolutionTable as getStep2SolutionTable } from './stages/stage2';
import { printChart } from './stages/stage3';
import { getSolutionTable as getStep4SolutionTable } from './stages/stage4';
import { getSolutionTable as getStep5SolutionTable } from './stages/stage5';
import './style.css';

document.querySelector('#app')!.innerHTML = HeaderComponent;

const pathname = window.location.pathname;

switch (pathname) {
    case '/task1': {
        document.querySelector('#app')!.innerHTML += getPointsTable();
        break;
    }
    case '/task2': {
        document.querySelector('#app')!.innerHTML += getStep2SolutionTable();
        break;
    }
    case '/task3': {
        document.querySelector('#app')!.appendChild(printChart());
        break;
    }
    case '/task4': {
        document.querySelector('#app')!.innerHTML += getStep4SolutionTable();
        break;
    }
    case '/task5': {
        document.querySelector('#app')!.innerHTML += getStep5SolutionTable();
        break;
    }
    default: {
        break;
    }
}
