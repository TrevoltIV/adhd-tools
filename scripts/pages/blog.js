

// Blog page
function blog() {
    const tasksRoot = document.getElementById('tasks-page-wrapper');
    const budgetRoot = document.getElementById('budget-page-wrapper');
    const focusRoot = document.getElementById('focus-page-wrapper');
    const socialRoot = document.getElementById('social-page-wrapper');
    const blogRoot = document.getElementById('blog-page-wrapper');
    const donateRoot = document.getElementById('donate-page-wrapper');
    const helpRoot = document.getElementById('help-page-wrapper');
    const optionsRoot = document.getElementById('options-page-wrapper');
    
    budgetRoot.style.display = 'none';
    focusRoot.style.display = 'none';
    socialRoot.style.display = 'none';
    tasksRoot.style.display = 'none';
    donateRoot.style.display = 'none';
    helpRoot.style.display = 'none';
    optionsRoot.style.display = 'none';
    blogRoot.style.display = 'flex';
}





export default blog;