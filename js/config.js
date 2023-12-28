export { canvasWidth, canvasHeight, canvasColor, setCanvasColor };

const body = document.querySelector('body');
body.style.overflow = 'hidden';
body.style.margin = '0';
body.style.padding = '0';

const canvasWidth = window.innerWidth * 0.01 * 100;
const canvasHeight = window.innerHeight * 0.01 * 100;
let canvasColor = '#2a2c35';

function setCanvasColor(color) {
    const canvas = document.querySelector('canvas');
    const ul = document.querySelector('ul');
    const input = document.querySelector('#canvasColorPicker');
    canvas.style.backgroundColor = color;
    ul.style.backgroundColor = color;
    input.value = color;
}
