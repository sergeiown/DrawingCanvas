export default class DrawingCanvas {
    constructor(width, height, bgColor) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.display = 'block';
        this.canvas.style.pointerEvents = 'all';
        this.ctx = this.canvas.getContext('2d');

        if (bgColor) {
            this.bgColor = bgColor;
            this.canvas.style.background = bgColor;
        }
    }

    appendTo(selector) {
        const parent = document.querySelector(selector);

        if (!parent) {
            throw new ReferenceError('There is no element like that: ' + selector);
        }

        parent.appendChild(this.canvas);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    saveAsPngTouch() {
        const link = document.createElement('a');
        const fileName = new Date().toLocaleString('ukr').replace(/[^\d]/g, '_');
        console.log(fileName);

        link.href = this.canvas.toDataURL('image/png');
        link.download = `image__${fileName}.png`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }

    async saveAsPng() {
        const fileName = `image__${new Date().toLocaleString('ukr').replace(/[^\d]/g, '_')}`;

        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [
                    {
                        description: 'PNG file',
                        accept: { 'image/png': ['.png'] },
                    },
                ],
            });

            const canvasDataUrl = this.canvas.toDataURL('image/png');
            const blob = await fetch(canvasDataUrl).then((res) => res.blob());
            const writableStream = await handle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
        } catch (err) {
            console.error(err);
        }
    }

    trapezoid({ x, y, bottomLength, topLength, height, thickness, color }) {
        const x1 = x - bottomLength / 2;
        const x2 = x1 + bottomLength;
        const x3 = x + topLength / 2;
        const x4 = x3 - topLength;
        const y1 = y;
        const y2 = y;
        const y3 = y - height;
        const y4 = y3;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.closePath();

        if (thickness) {
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = thickness;
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }

    circle({ x, y, radius, color, thickness }) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);

        if (!thickness) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = thickness;
            this.ctx.stroke();
        }
    }

    rectangle({ x, y, width, height, color, thickness, x1, y1, x2, y2 }) {
        if (!width || !height) {
            x = x || x1;
            y = y || y1;
            width = x2 - x;
            height = y2 - y;
        }

        if (thickness) {
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = thickness;
            this.ctx.strokeRect(x, y, width, height);
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, width, height);
        }
    }

    polygon({ points, color }) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        for (const { x, y } of points) {
            this.ctx.lineTo(x, y);
        }

        this.ctx.closePath();
        this.ctx.fill();
    }

    line({ x1, y1, x2, y2, thickness, color }) {
        this.ctx.lineWidth = thickness;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    curve({ x1, y1, thickness, color }) {
        this.ctx.lineWidth = thickness;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
    }

    fillText(text, x, y) {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = 'lightblue';
        this.ctx.maxWidth = 50;
        this.ctx.fillText(text, x, y);
    }
}
