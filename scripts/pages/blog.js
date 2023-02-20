

// Blog page
function blog() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const blogPage = document.createElement('div');
    blogPage.classList.add('blog-page');
    blogPage.appendChild(document.createTextNode('Blog Page'));
    content.appendChild(blogPage);
}

export default blog;