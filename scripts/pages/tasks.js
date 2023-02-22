

// Task page
function tasks() {

    // Display active tasks
    chrome.runtime.sendMessage('get_active_task_list', (data) => {
        if (data.active_task_list.length !== 0) {
            const taskListRoot = document.getElementById('task-list-active');

            data.active_task_list.map((task) => {
                const taskItem = document.createElement('div', { class: 'task-item' });
                taskItem.appendChild(document.createElement('p', { class: 'task-text' })).appendChild(document.createTextNode(task.title));
                taskItem.appendChild(document.createElement('button', { class: 'task-delete' })).appendChild(document.createTextNode('Delete'));
                taskItem.appendChild(document.createElement('button', { class: 'task-complete' })).appendChild(document.createTextNode('Complete'));
                taskListRoot.appendChild(taskItem);
            });
        } else {
            const taskListRoot = document.getElementById('task-list-active');
        }
    });

    // Display completed tasks
    chrome.runtime.sendMessage('get_completed_task_list', (data) => {
        if (data.completed_task_list.length !== 0) {
            const taskListRoot = document.getElementById('task-list-completed');

            data.completed_task_list.map((task) => {
                const taskItem = document.createElement('div', { class: 'task-item' });
                taskItem.appendChild(document.createElement('p', { class: 'task-text' })).appendChild(document.createTextNode(task.title));
                taskItem.appendChild(document.createElement('button', { class: 'task-delete' })).appendChild(document.createTextNode('Delete'));
                taskItem.appendChild(document.createElement('button', { class: 'task-complete' })).appendChild(document.createTextNode('Complete'));
                taskListRoot.appendChild(taskItem);
            });
        } else {
            const taskListRoot = document.getElementById('task-list-completed');
        }
    });

    // Render task page and hide all other pages
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
    blogRoot.style.display = 'none';
    donateRoot.style.display = 'none';
    helpRoot.style.display = 'none';
    optionsRoot.style.display = 'none';
    tasksRoot.style.display = 'flex';
}





export default tasks;


// TODO: Fix infinite task re-rendering upon switching pages (elements not being removed)