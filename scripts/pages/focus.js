

// Focus page
function focus() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const focusPage = document.createElement('div');
    focusPage.classList.add('focus-page');
    focusPage.appendChild(document.createTextNode('focus Page'));
    content.appendChild(focusPage);
}

export default focus;