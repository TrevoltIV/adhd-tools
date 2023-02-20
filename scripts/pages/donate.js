

// Donate page
function donate() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const donatePage = document.createElement('div');
    donatePage.classList.add('donate-page');
    donatePage.appendChild(document.createTextNode('donate Page'));
    content.appendChild(donatePage);
}

export default donate;