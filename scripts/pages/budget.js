

// Budget page
function budget() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const budgetPage = document.createElement('div');
    budgetPage.classList.add('budget-page');
    budgetPage.appendChild(document.createTextNode('Budget Page'));
    content.appendChild(budgetPage);
}

export default budget;