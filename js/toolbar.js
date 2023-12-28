import { canvasColor, setCanvasColor } from './config.js';
import { getCanvasColor } from './color-picker.js';

export default class ToolBar {
    constructor(buttonDescriptors) {
        this.bar = document.createElement('ul');
        this.bar.style.display = 'flex';
        this.bar.style.flexWrap = 'wrap';
        this.bar.style.justifyContent = 'center';
        this.bar.style.gap = '10px';
        this.bar.style.listStyle = 'none';
        this.bar.style.padding = '10px 0 0 0';
        this.bar.style.margin = '0';
        this.bar.style.background = canvasColor;
        this.bar.style.userSelect = 'none';

        const liCanvas = document.createElement('li');
        const inputCanvas = document.createElement('input');
        inputCanvas.type = 'color';
        inputCanvas.id = 'canvasColorPicker';
        inputCanvas.value = '#2a2c35';
        inputCanvas.style.width = '85px';
        inputCanvas.style.height = '30px';
        inputCanvas.style.cursor = 'pointer';
        inputCanvas.title = 'Choose a canvas color';
        liCanvas.appendChild(inputCanvas);
        this.bar.appendChild(liCanvas);

        document.addEventListener('DOMContentLoaded', function () {
            const canvasColorPicker = document.querySelector('#canvasColorPicker');
            if (canvasColorPicker) {
                canvasColorPicker.addEventListener('input', function () {
                    let newCanvasColor = getCanvasColor();
                    setCanvasColor(newCanvasColor);
                });
            } else {
                console.error('Element with ID "canvasColorPicker" not found.');
            }
        });

        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'color';
        input.id = 'colorPicker';
        input.value = '#ffff00';
        input.style.width = '85px';
        input.style.height = '30px';
        input.style.cursor = 'pointer';
        input.title = 'Choose a tool color';
        li.appendChild(input);
        this.bar.appendChild(li);

        const liRange = document.createElement('li');
        const inputRange = document.createElement('input');
        inputRange.type = 'range';
        inputRange.value = '1';
        inputRange.min = '1';
        inputRange.max = '100';
        inputRange.id = 'pen-range';
        inputRange.style.width = '85px';
        inputRange.style.height = '30px';
        inputRange.style.cursor = 'pointer';
        inputRange.title = 'Choose thickness';
        liRange.appendChild(inputRange);
        this.bar.appendChild(liRange);

        for (const label in buttonDescriptors) {
            if (Object.hasOwnProperty.call(buttonDescriptors, label)) {
                const { handler } = buttonDescriptors[label];
                const li = document.createElement('li');

                const btn = document.createElement('button');
                btn.style.width = '85px';
                btn.style.height = '30px';
                btn.style.cursor = 'pointer';

                btn.innerText = label;
                btn.onclick = handler;

                if (
                    label === Object.keys(buttonDescriptors).slice(-2)[0] ||
                    label === Object.keys(buttonDescriptors).slice(-1)[0]
                ) {
                    btn.style.fontWeight = 'bold';
                }

                this.bar.appendChild(li).append(btn);
            }
        }
    }

    appendTo(selector) {
        const parent = document.querySelector(selector);

        if (!parent) {
            throw new ReferenceError('There is no element like that: ' + selector);
        }

        parent.appendChild(this.bar);
    }
}
