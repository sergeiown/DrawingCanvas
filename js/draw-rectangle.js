import { getColors } from './color-picker.js';

export function startDrawingRectangle(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        canvas.onmousedown = (e1) => {
            window.onmousemove = (e2) => {
                dcOverlay.clear();

                dcOverlay.rectangle({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    color: 'grey',
                    thickness: 1,
                });
            };

            window.onmouseup = (e2) => {
                window.onmousemove = null;
                window.onmouseup = null;

                dcOverlay.clear();

                dc.rectangle({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    color: getColors(),
                });
            };
        };
    };
}

export function startDrawingRectangleTouch(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        const getTouchCoords = (e) => {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
            };
        };

        canvas.addEventListener(
            'touchstart',
            (e1) => {
                e1.preventDefault();

                const { x: startX, y: startY } = getTouchCoords(e1);

                canvas.addEventListener(
                    'touchmove',
                    (e2) => {
                        e2.preventDefault();

                        const { x: currentX, y: currentY } = getTouchCoords(e2);

                        dcOverlay.clear();

                        dcOverlay.rectangle({
                            x1: startX,
                            y1: startY,
                            x2: currentX,
                            y2: currentY,
                            color: 'grey',
                            thickness: 1,
                        });
                    },
                    { passive: false }
                );

                canvas.addEventListener(
                    'touchend',
                    (e2) => {
                        e2.preventDefault();

                        const { x: endX, y: endY } = getTouchCoords(e2);

                        dcOverlay.clear();

                        dc.rectangle({
                            x1: startX,
                            y1: startY,
                            x2: endX,
                            y2: endY,
                            color: getColors(),
                        });

                        canvas.removeEventListener('touchmove', null);
                        canvas.removeEventListener('touchend', null);
                    },
                    { passive: false }
                );
            },
            { passive: false }
        );
    };
}
