import { getColors } from './color-picker.js';

export function startDrawingPolygon(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    const points = [];

    const doubleClickThreshold = 10;

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
        dcOverlay.fillText('To draw a polygon, tap and hold a point until', 10, 100);
        dcOverlay.fillText("it's in the desired location.", 10, 130);
        dcOverlay.fillText('If the point is clicked and released, the final', 10, 160);
        dcOverlay.fillText('shape is drawn.', 10, 190);

        canvas.onpointerdown = (e1) => {
            const point = { x: e1.offsetX, y: e1.offsetY };
            points.push(point);

            draw();

            canvas.onpointermove = (e2) => {
                point.x = e2.offsetX;
                point.y = e2.offsetY;

                draw();
            };

            canvas.onpointerup = (e2) => {
                canvas.onpointermove = null;
                canvas.onpointerup = null;

                const lastPoint = points[points.length - 1];

                const distance = Math.sqrt((lastPoint.x - e1.offsetX) ** 2 + (lastPoint.y - e1.offsetY) ** 2);

                if (points.length > 2 && distance < doubleClickThreshold) {
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

/* export function startDrawingPolygon(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    const points = [];

    function draw() {
        dcOverlay.clear();
        console.log(points);

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
 */
