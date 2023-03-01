import { getColors } from './color-picker.js';

export function startDrawingPolygon(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    const points = [];

    function draw() {
        dcOverlay.clear();

        if (points.length >= 2) {
            dcOverlay.polygon({
                points,
                color: 'grey',
            });
        }

        points.forEach((point) => {
            dcOverlay.circle({
                x: point.x,
                y: point.y,
                radius: 3,
                color: 'grey',
                thickness: 1,
            });
        });
    }

    return () => {
        dcOverlay.fillText('Notice:', 10, 70);
        dcOverlay.fillText('use a double-click to complete the shape', 10, 100);

        canvas.onmousedown = (e1) => {
            const point = { x: e1.offsetX, y: e1.offsetY };
            points.push(point);

            draw();

            canvas.onmousemove = (e2) => {
                point.x = e2.offsetX;
                point.y = e2.offsetY;

                draw();
            };

            canvas.onmouseup = (e2) => {
                canvas.onmousemove = null;
                canvas.onmouseup = null;

                if (e2.detail === 2) {
                    dcOverlay.clear();

                    if (points.length >= 3) {
                        dc.polygon({
                            points,
                            color: getColors(),
                        });
                    }

                    points.length = 0;
                }
            };
        };
    };
}
