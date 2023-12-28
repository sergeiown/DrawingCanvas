import { getColors } from './color-picker.js';
import { getThickness } from './color-picker.js';
export { startDrawingCurve };

function startDrawingCurve(dc, dcOverlay) {
    const { canvas } = dcOverlay;
    let isDrawing = false;

    if (!dc.history) {
        dc.history = [];
    }

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
