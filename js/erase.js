import { getCanvasColor } from './color-picker.js';
import { getThickness } from './color-picker.js';
export { startErasing };

function startErasing(dc, dcOverlay) {
    const { canvas } = dcOverlay;
    let isDrawing = false;

    return () => {
        canvas.onmousedown = (e1) => {
            dcOverlay.clear();

            const canvasRect = canvas.getBoundingClientRect();
            isDrawing = true;
            dcOverlay.clear();
            dcOverlay.ctx.beginPath();
            dc.ctx.beginPath();
            dcOverlay.curve({
                x1: e1.clientX - canvasRect.left,
                y1: e1.clientY - canvasRect.top,
                thickness: getThickness(),
                color: getCanvasColor(),
            });

            canvas.onmousemove = (e2) => {
                if (!isDrawing) return;

                dc.curve({
                    x1: e2.clientX - canvasRect.left,
                    y1: e2.clientY - canvasRect.top,
                    thickness: getThickness(),
                    color: getCanvasColor(),
                });

                dcOverlay.curve({
                    x1: e2.clientX - canvasRect.left,
                    y1: e2.clientY - canvasRect.top,
                    thickness: getThickness(),
                    color: getCanvasColor(),
                });
            };

            canvas.onmouseup = () => {
                isDrawing = false;
                canvas.onmousemove = null;
                canvas.onmouseup = null;

                dc.ctx.beginPath();
                dcOverlay.ctx.beginPath();
                dcOverlay.clear();
            };
        };
    };
}
