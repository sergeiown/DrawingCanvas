import { getColors } from './color-picker.js';

export function startDrawingLine(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        canvas.onmousedown = (e1) => {
            canvas.onmousemove = (e2) => {
                dcOverlay.clear();

                dcOverlay.line({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    thickness: 1,
                    color: 'grey',
                });
            };

            canvas.onmouseup = (e2) => {
                canvas.onmousemove = null;
                canvas.onmouseup = null;

                dc.line({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    thickness: 3,
                    color: getColors(),
                });

                dcOverlay.clear();
            };
        };
    };
}

export function startDrawingLineTouch(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    let startX, startY;

    return () => {
        canvas.addEventListener('touchstart', (e1) => {
            startX = e1.touches[0].clientX - canvas.offsetLeft;
            startY = e1.touches[0].clientY - canvas.offsetTop;

            canvas.addEventListener('touchmove', (e2) => {
                e2.preventDefault();

                dcOverlay.clear();

                const currentX = e2.touches[0].clientX - canvas.offsetLeft;
                const currentY = e2.touches[0].clientY - canvas.offsetTop;

                dcOverlay.line({
                    x1: startX,
                    y1: startY,
                    x2: currentX,
                    y2: currentY,
                    thickness: 1,
                    color: 'grey',
                });
            });

            canvas.addEventListener('touchend', (e2) => {
                canvas.removeEventListener('touchmove', null);
                canvas.removeEventListener('touchend', null);

                const endX = e2.changedTouches[0].clientX - canvas.offsetLeft;
                const endY = e2.changedTouches[0].clientY - canvas.offsetTop;

                dc.line({
                    x1: startX,
                    y1: startY,
                    x2: endX,
                    y2: endY,
                    thickness: 3,
                    color: getColors(),
                });

                dcOverlay.clear();
            });
        });
    };
}
