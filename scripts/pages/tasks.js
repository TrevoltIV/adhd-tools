

// Task page
function tasks() {
  // Remove previous task items if user clicks the task tab while still on the same page for some unknown ADHD reason :D
  const taskListActive = document.getElementById('task-list-active');
  const taskListCompleted = document.getElementById('task-list-completed');
  taskListActive.innerHTML = "";
  taskListCompleted.innerHTML = "";

    // Display active tasks
    function createTaskItem(task) {
      // Create task items from local storage request and append to task list, if none exist, display message
      const taskItem = document.createElement('div');
      const title = taskItem.appendChild(document.createElement('p'));
      title.classList.add('task-title');
      title.appendChild(document.createTextNode(task.title));
      const btnWrapper = taskItem.appendChild(document.createElement('div'));
      btnWrapper.classList.add('task-btn-wrapper');
      const deleteBtn = btnWrapper.appendChild(document.createElement('button'));
      deleteBtn.classList.add('task-delete');
      deleteBtn.appendChild(document.createTextNode('Delete'));
      const completeBtn = btnWrapper.appendChild(document.createElement('button'));
      completeBtn.classList.add('task-complete');
      completeBtn.appendChild(document.createTextNode('Complete'));
      taskItem.classList.add('task-item');
      return taskItem;
    }
      
      // Display active tasks
      chrome.runtime.sendMessage('get_active_task_list', (data) => {
        const taskListRoot = document.getElementById('task-list-active');
        if (data.active_task_list.length !== 0) {
          data.active_task_list.forEach((task) => {
            const taskItem = createTaskItem(task);
            taskListRoot.appendChild(taskItem);
          });
        } else {
          
        }
      });
      
      // Display completed tasks
      chrome.runtime.sendMessage('get_completed_task_list', (data) => {
        const taskListRoot = document.getElementById('task-list-completed');
        if (data.completed_task_list.length !== 0) {
          data.completed_task_list.forEach((task) => {
            const taskItem = createTaskItem(task);
            taskListRoot.appendChild(taskItem);
          });
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