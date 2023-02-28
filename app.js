import { canvasWidth as width, canvasHeight as height, canvasColor as bgColor } from './js/config.js';
import DrawingCanvas from './js/dc/dc.js';
import ToolBar from './js/toolbar.js';
import { startDrawingLine } from './js/draw-line.js';
import { startDrawingTrapezoid } from './js/draw-trapezoid.js';
import { startDrawingRectangle } from './js/draw-rectangle.js';
import { startDrawingCircle } from './js/draw-circle.js';
import { startDrawingPolygon } from './js/draw-polygon.js';

const dc = new DrawingCanvas(width, height, bgColor);
const dcOverlay = new DrawingCanvas(width, height);
const toolBar = new ToolBar({
    Clear: { handler: () => dc.clear() },
    Line: { handler: startDrawingLine(dc, dcOverlay) },
    Circle: { handler: startDrawingCircle(dc, dcOverlay) },
    Rectangle: { handler: startDrawingRectangle(dc, dcOverlay) },
    Trapezoid: { handler: startDrawingTrapezoid(dc, dcOverlay) },
    Poligon: { handler: startDrawingPolygon(dc, dcOverlay) },
    SaveImage: { handler: () => dc.saveAsPng() },
});

toolBar.appendTo('._container');
dc.appendTo('._container');
dcOverlay.appendTo('._container');
dcOverlay.canvas.style.marginTop = -height + 'px';

dcOverlay.fillText('Notice:', 10, 70);
dcOverlay.fillText('The application functionality', 10, 100);
dcOverlay.fillText('is currently available only on', 10, 130);
dcOverlay.fillText('devices without a touchscreen', 10, 160);
