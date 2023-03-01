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

    canvas.on('mousedown', (e1) => {
        $(window).on('mousemove', (e2) => {
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
        });

        $(window).on('mouseup', (e2) => {
            $(window).off('mousemove mouseup');

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
        });
    });
}
