import { getColors } from './color-picker.js';

export function startDrawingCircle(dc, dcOverlay) {
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
}

export function startDrawingCircleTouch(dc, dcOverlay) {
    const { canvas } = dcOverlay;
    let touchMoveHandler, touchEndHandler;

    return () => {
        canvas.addEventListener('touchstart', (e1) => {
            const touch1 = e1.touches[0];

            touchMoveHandler = (e2) => {
                const touch2 = e2.touches[0];
                const dx = touch2.clientX - touch1.clientX;
                const dy = touch2.clientY - touch1.clientY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);
                dcOverlay.clear();

                dcOverlay.circle({
                    x: touch1.clientX,
                    y: touch1.clientY,
                    radius,
                    color: 'grey',
                    thickness: 1,
                });
            };

            touchEndHandler = (e2) => {
                window.removeEventListener('touchmove', touchMoveHandler);
                window.removeEventListener('touchend', touchEndHandler);

                const touch2 = e2.changedTouches[0];
                const dx = touch2.clientX - touch1.clientX;
                const dy = touch2.clientY - touch1.clientY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);

                dcOverlay.clear();

                dc.circle({
                    x: touch1.clientX,
                    y: touch1.clientY,
                    radius,
                    color: getColors(),
                });
            };

            window.addEventListener('touchmove', touchMoveHandler);
            window.addEventListener('touchend', touchEndHandler);
        });
    };
}
