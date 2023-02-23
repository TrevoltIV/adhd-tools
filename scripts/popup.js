import tasks from './pages/tasks.js';
import budget from './pages/budget.js';
import focus from './pages/focus.js';
import social from './pages/social.js';
import blog from './pages/blog.js';
import donate from './pages/donate.js';
import help from './pages/help.js';
import options from './pages/options.js';


/*
********  Service worker requests  ********
*/


const content = document.querySelector('.content');

// Retrieve current URL response from background.js
chrome.runtime.sendMessage('get_url', (currentURL) => {
  if (currentURL) {
    return null;
  }
});


/*
********  Pagination  ********
*/


// Open task page on extension load by default
const openTasksOnLoad = () => {
  tasks();
}

const tasksButton = document.getElementById('nav-button-tasks');
const budgetButton = document.getElementById('nav-button-budget');
const focusButton = document.getElementById('nav-button-focus');
const socialButton = document.getElementById('nav-button-social');
const blogButton = document.getElementById('nav-button-blog');
const donateButton = document.getElementById('nav-button-donate');
const helpButton = document.getElementById('nav-button-help');
const optionsButton = document.getElementById('nav-button-options');

document.addEventListener("DOMContentLoaded", openTasksOnLoad());
tasksButton.addEventListener('click', () => tasks());
budgetButton.addEventListener('click', () => budget());
focusButton.addEventListener('click', () => focus());
socialButton.addEventListener('click', () => social());
blogButton.addEventListener('click', () => blog());
donateButton.addEventListener('click', () => donate());
helpButton.addEventListener('click', () => help());
optionsButton.addEventListener('click', () => options());


/*
********  Task page  ********
*/


const addTaskButton = document.getElementById('add-task-button');
const addTaskModalCloseButton = document.getElementById('add-task-modal-close-button');
const addTaskModal = document.getElementById('add-task-modal');
const addTaskModalContent = document.getElementById('add-task-modal-content');

// Open add task modal
addTaskButton.addEventListener('click', () => {
  addTaskModalContent.classList.add('add-task-modal-content');
  addTaskModalContent.classList.remove('add-task-modal-content-collapsed');
});

// Close add task modal
addTaskModalCloseButton.addEventListener('click', () => {
  addTaskModalContent.classList.add('add-task-modal-content-collapsed');
  addTaskModalContent.classList.remove('add-task-modal-content');
});

// Add task to storage
const addTask = () => {
  const taskName = document.getElementById('add-task-name').value;
  const taskDescription = document.getElementById('add-task-description').value;
  const taskDate = document.getElementById('add-task-date').value;
  const taskPriority = document.getElementById('add-task-priority').value;
  const taskHours = document.getElementById('add-task-hours').value;
  const task = {
    title: taskName,
    description: taskDescription,
    priority: taskPriority,
    date: taskDate,
    hours: taskHours,
  }
  chrome.runtime.sendMessage({type: 'add_task', data: task}, (response) => {
    if (response === 'success') {
      tasks();
      alert('test');
    } else {
      // Insert error handling here
    }
  });
}

const addTaskSubmitButton = document.getElementById('add-task-submit-button');
addTaskSubmitButton.addEventListener('click', () => addTask());