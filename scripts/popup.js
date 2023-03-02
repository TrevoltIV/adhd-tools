import tasks from './pages/tasks.js';
import budget from './pages/budget.js';
import focus from './pages/focus.js';
import social from './pages/social.js';
import blog from './pages/blog.js';
import donate from './pages/donate.js';
import help from './pages/help.js';
import options from './pages/options.js';




/*
********  Initialization Popup  ********
*/


// This popup appears only when the extension is first installed (unless local storage is cleared)
chrome.storage.local.get('instance_initialized', (data) => {
  if (!data.instance_initialized) {
    const initPopupModal = document.getElementById('init-popup-modal');
    initPopupModal.classList.remove('init-popup-modal-collapsed');
    initPopupModal.classList.add('init-popup-modal');
  }
});

// Close initialization popup and send initialize instance request
const initPopupModalButton = document.getElementById('init-popup-modal-button');
initPopupModalButton.addEventListener('click', () => {
  const initPopupModal = document.getElementById('init-popup-modal');
  initPopupModal.classList.remove('init-popup-modal');
  initPopupModal.classList.add('init-popup-modal-collapsed');
  chrome.runtime.sendMessage('initialize_instance', (response) => {
    if (response) {
      tasks();
      return null;
    }
  });
});


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

const pointsNumberText = document.getElementById('points-number');
chrome.storage.local.get('points', (data) => {
  if (data.points !== undefined) {
    pointsNumberText.textContent = data.points;
  } else {
    pointsNumberText.textContent = '0';
  }
});



/*
********  Pagination  ********
*/


// Open task page on extension load by default (only after instance is initialized)
const openTasksOnLoad = () => {
  chrome.storage.local.get('instance_initialized', (data) => {
    if (data.instance_initialized) {
      chrome.storage.local.get('active_task_list', (data) => {
        if (data.active_task_list !== undefined) {
          tasks();
        }
      })
    }
  })
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
const addTaskTitle = document.getElementById('add-task-title');
const addTaskDescription = document.getElementById('add-task-description');
const addTaskDate = document.getElementById('add-task-date');
const addTaskPriority = document.getElementById('add-task-priority');
const addTaskHours = document.getElementById('add-task-hours');

// Open add task modal
addTaskButton.addEventListener('click', () => {
  addTaskModalContent.classList.add('add-task-modal-content');
  addTaskModalContent.classList.remove('add-task-modal-content-collapsed');
});

// Close add task modal
addTaskModalCloseButton.addEventListener('click', () => {
  addTaskTitle.value = '';
  addTaskDescription.value = '';
  addTaskDate.value = '';
  addTaskPriority.value = '2';
  addTaskHours.value = '1';
  addTaskModalContent.classList.add('add-task-modal-content-collapsed');
  addTaskModalContent.classList.remove('add-task-modal-content');
});


const sortByButton = document.getElementById('sort-by-button');
const sortByDropdown = document.getElementById('sort-by-dropdown');
const sortByDropdownButton1 = document.getElementById('sort-by-dropdown-button-1');
const sortByDropdownButton2 = document.getElementById('sort-by-dropdown-button-2');
const sortByDropdownButton3 = document.getElementById('sort-by-dropdown-button-3');

// Open/close sort by dropdown menu
sortByButton.addEventListener('click', () => {
  sortByDropdown.classList.toggle('sort-by-dropdown-collapsed');
  sortByDropdown.classList.toggle('sort-by-dropdown');
});

// Close sort by dropdown menu if clicked outside of it
window.onclick = (event) => {
  if (!event.target.matches('.sort-by-button')) {
    sortByDropdown.classList.add('sort-by-dropdown-collapsed');
    sortByDropdown.classList.remove('sort-by-dropdown');
  }
}

sortByDropdownButton1.addEventListener('click', () => sortBy('priority'));
sortByDropdownButton2.addEventListener('click', () => sortBy('date'));
sortByDropdownButton3.addEventListener('click', () => sortBy('hours'));

// Set sort by preference to local storage
const sortBy = (sort) => {
  chrome.storage.local.set({sort_by: sort}, () => {
    tasks();
  });
}



// Add task to storage
const addTask = () => {
  const taskTitle = document.getElementById('add-task-title');
  const taskDescription = document.getElementById('add-task-description');
  const taskDate = document.getElementById('add-task-date');
  const taskPriority = document.getElementById('add-task-priority');
  const taskHours = document.getElementById('add-task-hours');
  const task = {
    title: taskTitle.value,
    description: taskDescription.value,
    priority: taskPriority.value,
    date: taskDate.value,
    hours: addTaskHours.valueAsNumber,
  }
  if (task.title !== '') {
    if (task.title.length <= 50) {
      // Request to add task if title is 50 characters or less
      chrome.runtime.sendMessage({type: 'add_task', data: task}, (response) => {
        if (response === 'success') {
          tasks();
          taskTitle.value = '';
          taskDescription.value = '';
          taskDate.value = '';
          taskPriority.value = '2';
          taskHours.value = '1';
          addTaskModalContent.classList.add('add-task-modal-content-collapsed'); 
          addTaskModalContent.classList.remove('add-task-modal-content');
        } else {
          alert(response.id);
        }
      });
    } else {
      // Display title character limit reached error message
        const tooManyCharactersText = document.createElement('p');
        tooManyCharactersText.classList.add('input-error-text');
        tooManyCharactersText.appendChild(document.createTextNode('Task title must be 50 characters or less'));
        addTaskModalContent.appendChild(tooManyCharactersText);
      setTimeout(() => {
        tooManyCharactersText.remove();
      }, 5000);
    }
  } else {
    // Display required fields error message
    const requiredFieldsText = document.createElement('p');
    requiredFieldsText.classList.add('input-error-text');
    requiredFieldsText.appendChild(document.createTextNode('Title is required'));
    addTaskModalContent.appendChild(requiredFieldsText);
    setTimeout(() => {
      requiredFieldsText.remove();
    }, 5000);
  }
}

// Handle add task form submission
const addTaskSubmitButton = document.getElementById('add-task-submit-button');
addTaskSubmitButton.addEventListener('click', () => addTask());