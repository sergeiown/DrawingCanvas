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

    return () => {
        canvas.addEventListener('touchstart', (e1) => {
            const touch = e1.touches[0];
            const startX = touch.pageX - touch.target.offsetLeft;
            const startY = touch.pageY - touch.target.offsetTop;

            canvas.addEventListener('touchmove', (e2) => {
                e2.preventDefault();
                const touch = e2.touches[0];
                const endX = touch.pageX - touch.target.offsetLeft;
                const endY = touch.pageY - touch.target.offsetTop;
                const dx = endX - startX;
                const dy = endY - startY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);

                dcOverlay.clear();
                dcOverlay.circle({
                    x: startX,
                    y: startY,
                    radius,
                    color: 'grey',
                    thickness: 1,
                });
            });

            canvas.addEventListener('touchend', (e2) => {
                const touch = e2.changedTouches[0];
                const endX = touch.pageX - touch.target.offsetLeft;
                const endY = touch.pageY - touch.target.offsetTop;
                const dx = endX - startX;
                const dy = endY - startY;
                const radius = Math.sqrt(dx ** 2 + dy ** 2);

                dcOverlay.clear();
                dc.circle({
                    x: startX,
                    y: startY,
                    radius,
                    color: getColors(),
                });
            });
        });
    };
}
