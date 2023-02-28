import { getColors } from './color-picker.js';

export function startDrawingLine(dc, dcOverlay, color) {
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
}

// import { getColors } from './color-picker.js';

// export function startDrawingLine(dc, dcOverlay, color) {
//     const { canvas } = dcOverlay;

//     return () => {
//         canvas.addEventListener('touchstart', (e1) => {
//             const touch = e1.touches[0];

//             window.addEventListener('touchmove', (e2) => {
//                 e2.preventDefault(); // предотвращаем прокрутку страницы при смахивании пальцем

//                 dcOverlay.clear();

//                 dcOverlay.line({
//                     x1: touch.clientX - canvas.offsetLeft,
//                     y1: touch.clientY - canvas.offsetTop,
//                     x2: e2.touches[0].clientX - canvas.offsetLeft,
//                     y2: e2.touches[0].clientY - canvas.offsetTop,
//                     thickness: 1,
//                     color: 'grey',
//                 });
//             });

//             window.addEventListener('touchend', (e2) => {
//                 window.removeEventListener('touchmove', null);
//                 window.removeEventListener('touchend', null);

//                 dc.line({
//                     x1: touch.clientX - canvas.offsetLeft,
//                     y1: touch.clientY - canvas.offsetTop,
//                     x2: e2.changedTouches[0].clientX - canvas.offsetLeft,
//                     y2: e2.changedTouches[0].clientY - canvas.offsetTop,
//                     thickness: 3,
//                     color: getColors(),
//                 });

//                 dcOverlay.clear();
//             });
//         });
//     };
// }
