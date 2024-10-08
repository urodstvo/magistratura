import { HeaderComponent } from './components/header';
import { getPointsTable } from './stages/stage1';
import { getSelectionTable } from './stages/stage2';
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
    default: {
        break;
    }
}
