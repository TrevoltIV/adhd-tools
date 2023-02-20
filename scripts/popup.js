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

const tasksButton = document.getElementById('nav-button-tasks');
const budgetButton = document.getElementById('nav-button-budget');
const focusButton = document.getElementById('nav-button-focus');
const socialButton = document.getElementById('nav-button-social');
const blogButton = document.getElementById('nav-button-blog');
const donateButton = document.getElementById('nav-button-donate');
const helpButton = document.getElementById('nav-button-help');
const optionsButton = document.getElementById('nav-button-options');

tasksButton.addEventListener('click', () => tasks());
budgetButton.addEventListener('click', () => budget());
focusButton.addEventListener('click', () => focus());
socialButton.addEventListener('click', () => social());
blogButton.addEventListener('click', () => blog());
donateButton.addEventListener('click', () => donate());
helpButton.addEventListener('click', () => help());
optionsButton.addEventListener('click', () => options());