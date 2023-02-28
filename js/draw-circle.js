import { getColors } from './color-picker.js';

export function startDrawingCircle(dc, dcOverlay) {
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
                const dx = e2.offsetX - startX;
                const dy = e2.offsetY - startY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);
                dcOverlay.clear();

                dcOverlay.circle({
                    x: startX,
                    y: startY,
                    radius,
                    color: 'grey',
                    thickness: 1,
                });
            }

            function handlePointerUp(e2) {
                canvas.removeEventListener('pointermove', handlePointerMove);
                canvas.removeEventListener('pointerup', handlePointerUp);
                canvas.removeEventListener('pointercancel', handlePointerCancel);

                const dx = e2.offsetX - startX;
                const dy = e2.offsetY - startY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);

                dcOverlay.clear();

                dc.circle({
                    x: startX,
                    y: startY,
                    radius,
                    color: getColors(),
                });
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

/* export function startDrawingCircle(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        canvas.onmousedown = (e1) => {
            window.onmousemove = (e2) => {
                const dx = e2.offsetX - e1.offsetX;
                const dy = e2.offsetY - e1.offsetY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);
                dcOverlay.clear();

                dcOverlay.circle({
                    x: e1.offsetX,
                    y: e1.offsetY,
                    radius,
                    color: 'grey',
                    thickness: 1,
                });
            };

            window.onmouseup = (e2) => {
                window.onmousemove = null;
                window.onmouseup = null;

                const dx = e2.offsetX - e1.offsetX;
                const dy = e2.offsetY - e1.offsetY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);

                dcOverlay.clear();

                dc.circle({
                    x: e1.offsetX,
                    y: e1.offsetY,
                    radius,
                    color: getColors(),
                });
            };
        };
    };
} */
