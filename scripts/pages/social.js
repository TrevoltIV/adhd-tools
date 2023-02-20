

// Social page
function social() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const socialPage = document.createElement('div');
    socialPage.classList.add('social-page');
    socialPage.appendChild(document.createTextNode('social Page'));
    content.appendChild(socialPage);
}

export default social;