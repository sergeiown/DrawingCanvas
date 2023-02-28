export { canvasWidth, canvasHeight, canvasColor };

const body = document.querySelector('body');
body.style.overflow = 'hidden';
body.style.margin = '0';
body.style.padding = '0';

const canvasWidth = window.innerWidth * 0.01 * 100;
const canvasHeight = window.innerHeight * 0.01 * 100;
const canvasColor = '#2a2c35';
