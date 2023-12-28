export function getColors() {
    const colorPicker = document.querySelector('#colorPicker');
    return colorPicker.value;
}

export function getThickness() {
    const rangeInput = document.querySelector('input[type="range"]');
    return rangeInput.value;
}
