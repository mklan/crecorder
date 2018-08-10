import './index.css';
import createCrecorder from '../crecorder.js';

import { initAnimation } from './sunAnimation.js';

const recordBtn = window.document.getElementById('record-btn');

const recorder = createCrecorder();
initAnimation();

recordBtn.onclick = () => {
    recorder.record({ 
        timeLimit: 3000
    });
}