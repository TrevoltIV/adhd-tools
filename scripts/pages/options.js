

// Options page
function options() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const optionsPage = document.createElement('div');
    optionsPage.classList.add('options-page');
    optionsPage.appendChild(document.createTextNode('options Page'));
    content.appendChild(optionsPage);
}

export default options;