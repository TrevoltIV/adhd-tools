

// Budget page
function budget() {
    const tasksRoot = document.getElementById('tasks-page-wrapper');
    const budgetRoot = document.getElementById('budget-page-wrapper');
    const focusRoot = document.getElementById('focus-page-wrapper');
    const socialRoot = document.getElementById('social-page-wrapper');
    const blogRoot = document.getElementById('blog-page-wrapper');
    const donateRoot = document.getElementById('donate-page-wrapper');
    const helpRoot = document.getElementById('help-page-wrapper');
    const optionsRoot = document.getElementById('options-page-wrapper');
    
    blogRoot.style.display = 'none';
    focusRoot.style.display = 'none';
    socialRoot.style.display = 'none';
    tasksRoot.style.display = 'none';
    donateRoot.style.display = 'none';
    helpRoot.style.display = 'none';
    optionsRoot.style.display = 'none';
    budgetRoot.style.display = 'flex';

    const taskListActive = document.getElementById('task-list-active');
    const taskListCompleted = document.getElementById('task-list-completed');

    taskListActive.innerHTML = "";
    taskListCompleted.innerHTML = "";
}





export default budget;