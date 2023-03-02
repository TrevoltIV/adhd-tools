

// Task page
function tasks() {
  // Remove previous task items if user clicks the task tab while still on the same page for some unknown ADHD reason :D
  const taskListActive = document.getElementById('task-list-active');
  const taskListCompleted = document.getElementById('task-list-completed');
  taskListActive.innerHTML = "";
  taskListCompleted.innerHTML = "";

    // Display tasks
    function createTaskItem(task, listType) {
      // Create task items from local storage request and append to task list
      if (listType === 'active') {
        const taskItem = document.createElement('div');

        if (task.priority === '0') {
          const starImage = document.createElement('img');
          starImage.classList.add('task-star');
          starImage.src = '../images/grey_star_icon.png';
          taskItem.appendChild(starImage);
        } else if (task.priority === '1') {
          const starImage = document.createElement('img');
          starImage.classList.add('task-star');
          starImage.src = '../images/red_star_icon.png';
          taskItem.appendChild(starImage);
        } else if (task.priority === '2') {
          const starImage = document.createElement('img');
          starImage.classList.add('task-star');
          starImage.src = '../images/green_star_icon.png';
          taskItem.appendChild(starImage);
        } else if (task.priority === '3') {
          const starImage = document.createElement('img');
          starImage.classList.add('task-star');
          starImage.src = '../images/blue_star_icon.png';
          taskItem.appendChild(starImage);
        } else if (task.priority === '4') {
          const starImage = document.createElement('img');
          starImage.classList.add('task-star');
          starImage.src = '../images/gold_star_icon.png';
          taskItem.appendChild(starImage);
        }

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

        deleteBtn.addEventListener('click', () => deleteTask(task.id, listType));
        completeBtn.addEventListener('click', () => completeTask(task.id));

        return taskItem;
      } else if (listType === 'completed') {
        const taskItem = document.createElement('div');
        const title = taskItem.appendChild(document.createElement('p'));
        title.classList.add('task-title');
        title.appendChild(document.createTextNode(task.title));
        const btnWrapper = taskItem.appendChild(document.createElement('div'));
        btnWrapper.classList.add('task-btn-wrapper');
        const deleteBtn = btnWrapper.appendChild(document.createElement('button'));
        deleteBtn.classList.add('task-delete-completed');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        taskItem.classList.add('task-item');

        deleteBtn.addEventListener('click', () => deleteTask(task.id, listType));

        return taskItem;
      }
    }

    // Create an empty task item box w/ message when there are no tasks
    const createEmptyTaskItem = (type) => {
      if (type === 'active') {
        const taskListRoot = document.getElementById('task-list-active');
        const taskItem = document.createElement('div');
        const title = taskItem.appendChild(document.createElement('p'));
        title.classList.add('task-list-empty');
        title.appendChild(document.createTextNode('No active tasks. Click the "+" button to add one!'));
        taskItem.classList.add('task-item-box');
        taskListRoot.appendChild(taskItem);
      } else if (type === 'completed') {
        const taskListRoot = document.getElementById('task-list-completed');
        const taskItem = document.createElement('div');
        const title = taskItem.appendChild(document.createElement('p'));
        title.classList.add('task-list-empty');
        title.appendChild(document.createTextNode('No completed tasks. Get to work!'));
        taskItem.classList.add('task-item-box');
        taskListRoot.appendChild(taskItem);
      }
    };
      
      // Display active tasks and sort by the user's sort_by option preference
      chrome.runtime.sendMessage('get_active_task_list', (data) => {
        const taskListRoot = document.getElementById('task-list-active');
        const activeTaskList = data.active_task_list;
        if (activeTaskList.length !== 0) {
          chrome.storage.local.get('sort_by', (data) => {
            const sortByButton = document.getElementById('sort-by-button');
            if (data.sort_by === 'priority') {
              activeTaskList.sort((a, b) => b.priority - a.priority);
              sortByButton.innerHTML = 'Priority';
            } else if (data.sort_by === 'date') {
              activeTaskList.sort((a, b) => new Date(a.date) - new Date(b.date));
              sortByButton.innerHTML = 'Date';
            } else if (data.sort_by === 'hours') {
              activeTaskList.sort((a, b) => b.hours - a.hours);
              sortByButton.innerHTML = 'Time';
            }
            activeTaskList.forEach((task) => {
              const taskItem = createTaskItem(task, 'active');
              taskListRoot.appendChild(taskItem);
            });
          });
        } else {
          // Create a message box and set sort button if there are no active tasks
          createEmptyTaskItem('active');
          chrome.storage.local.get('sort_by', (data) => {
            const sortByButton = document.getElementById('sort-by-button');
            if (data.sort_by === 'priority') {
              sortByButton.innerHTML = 'Priority';
            } else if (data.sort_by === 'date') {
              sortByButton.innerHTML = 'Date';
            } else if (data.sort_by === 'hours') {
              sortByButton.innerHTML = 'Time';
            }
          });
        }
      });
      
      // Display completed tasks
      chrome.runtime.sendMessage('get_completed_task_list', (data) => {
        const taskListRoot = document.getElementById('task-list-completed');
        if (data.completed_task_list.length !== 0) {
          data.completed_task_list.forEach((task) => {
            const taskItem = createTaskItem(task, 'completed');
            taskListRoot.appendChild(taskItem);
          });
        } else {
          createEmptyTaskItem('completed');
        }
      });

      // Delete a specific task by ID
      const deleteTask = (id, listType) => {
        if (listType === 'active') {
          chrome.runtime.sendMessage({type: 'delete_active_task', id: id}, (response) => {
            if (response === 'success') {
              location.reload();
            }
          });
        } else if (listType === 'completed') {
          chrome.runtime.sendMessage({type: 'delete_completed_task', id: id}, (response) => {
            if (response === 'success') {
              location.reload();
            }
          });
        }
      };

      // Complete a specific task by ID
      const completeTask = (id) => {
        chrome.runtime.sendMessage({type: 'complete_task', id: id}, (response) => {
          if (response === 'success') {
            location.reload();
          }
        });
      };

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