import { getColors } from './color-picker.js';

export function startDrawingRectangle(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        canvas.addEventListener('pointerdown', onPointerDown);

        function onPointerDown(e1) {
            canvas.addEventListener('pointermove', onPointerMove);
            canvas.addEventListener('pointerup', onPointerUp);

            function onPointerMove(e2) {
                dcOverlay.clear();

                dcOverlay.rectangle({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    color: 'grey',
                    thickness: 1,
                });
            }

            function onPointerUp(e2) {
                canvas.removeEventListener('pointermove', onPointerMove);
                canvas.removeEventListener('pointerup', onPointerUp);

                dcOverlay.clear();

                dc.rectangle({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    color: getColors(),
                });
            }
        }
    };
}

/* import { getColors } from './color-picker.js';

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
} */
