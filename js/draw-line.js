import { getColors } from './color-picker.js';

export function startDrawingLine(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        function handlePointerDown(e1) {
            canvas.setPointerCapture(e1.pointerId);

            canvas.addEventListener('pointermove', handlePointerMove);
            canvas.addEventListener('pointerup', handlePointerUp);
            canvas.addEventListener('pointercancel', handlePointerCancel);

            const startX = e1.offsetX;
            const startY = e1.offsetY;

            function handlePointerMove(e2) {
                dcOverlay.clear();

                dcOverlay.line({
                    x1: startX,
                    y1: startY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    thickness: 1,
                    color: 'grey',
                });
            }

            function handlePointerUp(e2) {
                canvas.removeEventListener('pointermove', handlePointerMove);
                canvas.removeEventListener('pointerup', handlePointerUp);
                canvas.removeEventListener('pointercancel', handlePointerCancel);

                dc.line({
                    x1: startX,
                    y1: startY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    thickness: 3,
                    color: getColors(),
                });

                dcOverlay.clear();
            }

            function handlePointerCancel(e2) {
                canvas.removeEventListener('pointermove', handlePointerMove);
                canvas.removeEventListener('pointerup', handlePointerUp);
                canvas.removeEventListener('pointercancel', handlePointerCancel);

                dcOverlay.clear();
            }
        }

        canvas.addEventListener('pointerdown', handlePointerDown);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
        };
    };
}

/* export function startDrawingLine(dc, dcOverlay) {
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
} */
