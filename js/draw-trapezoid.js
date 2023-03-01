import { getColors } from './color-picker.js';

export function startDrawingTrapezoid(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        const start = (canvas.onmousedown = (e1) => {
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
                dcOverlay.clear();

                dcOverlay.rectangle({
                    x1: e1.offsetX,
                    y1: e1.offsetY,
                    x2: e2.offsetX,
                    y2: e2.offsetY,
                    color: 'grey',
                    thickness: 1,
                });

                const x = (e2.offsetX + e1.offsetX) / 2;
                const y = Math.max(e1.offsetY, e2.offsetY);
                const bottomLength = Math.abs(e2.offsetX - e1.offsetX);
                const height = Math.abs(e2.offsetY - e1.offsetY);

                window.onmousemove = (e3) => {
                    const topLength = Math.abs(e3.offsetX - x) * 2;

                    dcOverlay.clear();

                    dcOverlay.trapezoid({
                        x,
                        y,
                        bottomLength,
                        topLength,
                        height,
                        color: 'grey',
                        thickness: 1,
                    });
                };

                canvas.onmousedown = (e3) => {
                    const topLength = Math.abs(e3.offsetX - x) * 2;

                    dcOverlay.clear();

                    dc.trapezoid({
                        x,
                        y,
                        bottomLength,
                        topLength,
                        height,
                        color: getColors(),
                    });
                    window.onmousemove = null;
                    canvas.onmousedown = start;
                };

                window.onmouseup = null;
            };
        });
    };
}

export function startDrawingTrapezoidTouch(dc, dcOverlay) {
    const { canvas } = dcOverlay;

    return () => {
        let startTouch = null;

        const handleTouchMove = (e) => {
            e.preventDefault();

            const touches = e.changedTouches;

            if (startTouch && touches.length === 1) {
                const touch = touches[0];

                dcOverlay.clear();

                dcOverlay.rectangle({
                    x1: startTouch.offsetX,
                    y1: startTouch.offsetY,
                    x2: touch.offsetX,
                    y2: touch.offsetY,
                    color: 'grey',
                    thickness: 1,
                });

                const x = (touch.offsetX + startTouch.offsetX) / 2;
                const y = Math.max(startTouch.offsetY, touch.offsetY);
                const bottomLength = Math.abs(touch.offsetX - startTouch.offsetX);
                const height = Math.abs(touch.offsetY - startTouch.offsetY);

                dcOverlay.trapezoid({
                    x,
                    y,
                    bottomLength,
                    topLength: bottomLength,
                    height,
                    color: 'grey',
                    thickness: 1,
                });
            }
        };

        const handleTouchEnd = (e) => {
            e.preventDefault();

            const touches = e.changedTouches;

            if (startTouch && touches.length === 1) {
                const touch = touches[0];

                dcOverlay.clear();

                dcOverlay.rectangle({
                    x1: startTouch.offsetX,
                    y1: startTouch.offsetY,
                    x2: touch.offsetX,
                    y2: touch.offsetY,
                    color: 'grey',
                    thickness: 1,
                });

                const x = (touch.offsetX + startTouch.offsetX) / 2;
                const y = Math.max(startTouch.offsetY, touch.offsetY);
                const bottomLength = Math.abs(touch.offsetX - startTouch.offsetX);
                const height = Math.abs(touch.offsetY - startTouch.offsetY);
                const topLength = bottomLength;

                dc.trapezoid({
                    x,
                    y,
                    bottomLength,
                    topLength,
                    height,
                    color: getColors(),
                });

                startTouch = null;

                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            }
        };

        canvas.addEventListener('touchstart', (e) => {
            const touches = e.changedTouches;

            if (touches.length === 1) {
                startTouch = touches[0];

                window.addEventListener('touchmove', handleTouchMove);
                window.addEventListener('touchend', handleTouchEnd);
            }
        });
    };
}
