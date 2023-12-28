import { canvasWidth as width, canvasHeight as height, canvasColor as bgColor, setCanvasColor } from './js/config.js';
import DrawingCanvas from './js/dc/dc.js';
import ToolBar from './js/toolbar.js';
import { startDrawingLine, startDrawingLineTouch } from './js/draw-line.js';
import { startDrawingTrapezoid } from './js/draw-trapezoid.js';
import { startDrawingRectangle } from './js/draw-rectangle.js';
import { startDrawingCircle } from './js/draw-circle.js';
import { startDrawingPolygon } from './js/draw-polygon.js';
import { startDrawingCurve } from './js/draw-curve.js';
import { startErasing } from './js/erase.js';

if ('ontouchstart' in window) {
    const dc = new DrawingCanvas(width, height, bgColor);
    const dcOverlay = new DrawingCanvas(width, height);
    const toolBar = new ToolBar({
        Line: { handler: startDrawingLineTouch(dc, dcOverlay) },
        SaveImage: { handler: () => dc.saveAsPngTouch() },
        NewImage: {
            handler: () => {
                dc.clear();
                setCanvasColor('#2a2c35');
            },
        },
    });

    toolBar.appendTo('._container');
    dc.appendTo('._container');
    dcOverlay.appendTo('._container');
    dcOverlay.canvas.style.marginTop = -height + 'px';

    dcOverlay.fillText('Notice:', 10, 70);
    dcOverlay.fillText('The full functionality of the application', 10, 100);
    dcOverlay.fillText('is currently only available on devices', 10, 130);
    dcOverlay.fillText('without a touch screen', 10, 160);
} else {
    const dc = new DrawingCanvas(width, height, bgColor);
    const dcOverlay = new DrawingCanvas(width, height);
    const toolBar = new ToolBar({
        Curve: { handler: startDrawingCurve(dc, dcOverlay) },
        Line: { handler: startDrawingLine(dc, dcOverlay) },
        Circle: { handler: startDrawingCircle(dc, dcOverlay) },
        Rectangle: { handler: startDrawingRectangle(dc, dcOverlay) },
        Trapezoid: { handler: startDrawingTrapezoid(dc, dcOverlay) },
        Poligon: { handler: startDrawingPolygon(dc, dcOverlay) },
        Eraser: { handler: startErasing(dc, dcOverlay) },
        SaveImage: { handler: () => dc.saveAsPng() },
        NewImage: {
            handler: () => {
                dc.clear();
                setCanvasColor('#2a2c35');
            },
        },
    });

    toolBar.appendTo('._container');
    dc.appendTo('._container');
    dcOverlay.appendTo('._container');
    dcOverlay.canvas.style.marginTop = -height + 'px';
}
