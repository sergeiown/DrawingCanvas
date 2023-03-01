import { getColors } from './color-picker.js';

export function startDrawingLine(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        canvas.onmousedown = (e1) => {
            window.onmousemove = (e2) => {
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

            window.onmouseup = (e2) => {
                window.onmousemove = null;
                window.onmouseup = null;

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

    return () => {
        canvas.ontouchstart = (e1) => {
            const touch = e1.touches[0];

            canvas.ontouchmove = (e2) => {
                const touch = e2.touches[0];

                dcOverlay.clear();

                dcOverlay.line({
                    x1: touch.pageX - canvas.offsetLeft,
                    y1: touch.pageY - canvas.offsetTop,
                    x2: touch.pageX - canvas.offsetLeft,
                    y2: touch.pageY - canvas.offsetTop,
                    thickness: 1,
                    color: 'grey',
                });
            };

            canvas.ontouchend = (e2) => {
                const touch = e2.changedTouches[0];

                canvas.ontouchmove = null;
                canvas.ontouchend = null;

                dc.line({
                    x1: touch.pageX - canvas.offsetLeft,
                    y1: touch.pageY - canvas.offsetTop,
                    x2: touch.pageX - canvas.offsetLeft,
                    y2: touch.pageY - canvas.offsetTop,
                    thickness: 3,
                    color: getColors(),
                });

                dcOverlay.clear();
            };
        };
    };
}
