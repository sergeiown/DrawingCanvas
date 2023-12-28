import { getColors } from './color-picker.js';
import { getThickness } from './color-picker.js';
export { startDrawingCurve, startDrawingCurveTouch };

function startDrawingCurve(dc, dcOverlay) {
    const { canvas } = dcOverlay;
    let isDrawing = false;

    return () => {
        canvas.onmousedown = (e1) => {
            const canvasRect = canvas.getBoundingClientRect();
            isDrawing = true;
            dc.ctx.beginPath();
            dc.curve({
                x1: e1.clientX - canvasRect.left,
                y1: e1.clientY - canvasRect.top,
                thickness: getThickness(),
                color: 'grey',
            });

            window.onmousemove = (e2) => {
                if (!isDrawing) return;
                dc.curve({
                    x1: e2.clientX - canvasRect.left,
                    y1: e2.clientY - canvasRect.top,
                    thickness: getThickness(),
                    color: getColors(),
                });
            };

            window.onmouseup = () => {
                isDrawing = false;
                window.onmousemove = null;
                window.onmouseup = null;
                dc.ctx.beginPath();
            };
        };
    };
}

function startDrawingCurveTouch(dc, dcOverlay) {
    const { canvas } = dcOverlay;
    let isDrawing = false;

    return () => {
        canvas.ontouchstart = (e1) => {
            const canvasRect = canvas.getBoundingClientRect();
            isDrawing = true;
            dc.ctx.beginPath();
            dc.curve({
                x1: e1.touches[0].clientX - canvasRect.left,
                y1: e1.touches[0].clientY - canvasRect.top,
                thickness: getThickness(),
                color: 'grey',
            });

            window.ontouchmove = (e2) => {
                if (!isDrawing) return;
                dc.curve({
                    x1: e2.touches[0].clientX - canvasRect.left,
                    y1: e2.touches[0].clientY - canvasRect.top,
                    thickness: getThickness(),
                    color: getColors(),
                });
            };

            window.ontouchend = () => {
                isDrawing = false;
                window.ontouchmove = null;
                window.ontouchend = null;
                dc.ctx.beginPath();
            };
        };
    };
}
