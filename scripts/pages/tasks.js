

// Task page
function tasks() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const tasksPage = document.createElement('div');
    tasksPage.classList.add('tasks-page');
    tasksPage.appendChild(document.createTextNode('Tasks Page'));

    const tasksList = tasksPage.appendChild(document.createElement('div'));
    tasksList.classList.add('tasks-list');
    tasksList.appendChild(document.createTextNode('Tasks List'));
    content.appendChild(tasksPage);
}





export default tasks;