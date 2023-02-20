

// Help page
function help() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const helpPage = document.createElement('div');
    helpPage.classList.add('help-page');
    helpPage.appendChild(document.createTextNode('help Page'));
    content.appendChild(helpPage);
}

export default help;