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
        this.bar.style.background = '#2a2c35';

        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'color';
        input.id = 'colorPicker';
        input.value = '#ffff00';
        input.style.width = '85px';
        input.style.height = '30px';
        li.appendChild(input);

        this.bar.appendChild(li);

        for (const label in buttonDescriptors) {
            if (Object.hasOwnProperty.call(buttonDescriptors, label)) {
                const { handler } = buttonDescriptors[label];
                const li = document.createElement('li');

                const btn = document.createElement('button');
                btn.style.width = '85px';
                btn.style.height = '30px';

                btn.innerText = label;
                btn.onclick = handler;
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
