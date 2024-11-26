import { HeaderComponent } from './components/header';
import { getPointsTable } from './stages/stage1';
import { getSelectionTable } from './stages/stage2';
import { printChart } from './stages/stage3';
import { solution } from './stages/stage4';
import './style.css';

document.querySelector('#app')!.innerHTML = HeaderComponent;

const pathname = window.location.pathname;

switch (pathname) {
    case '/task1': {
        document.querySelector('#app')!.innerHTML += getPointsTable();
        break;
    }
    case '/task2': {
        document.querySelector('#app')!.innerHTML += getSelectionTable();
        break;
    }
    case '/task3': {
        document.querySelector('#app')!.appendChild(printChart());
        break;
    }
    case '/task4': {
        solution();
        document.querySelector('#app')!.appendChild();
        break;
    }
    default: {
        break;
    }
}
