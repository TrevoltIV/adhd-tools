


/*
********  Front end request fulfillment protocol  ********
*/


// Update URL when tabs are updated
chrome.tabs.onUpdated.addListener((tab) => {
  chrome.storage.local.set({currentURL: tab.url});
});

// Update URL when tabs are switched
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    chrome.storage.local.set({currentURL: tab.url});
  });
});

// Respond to Get URL request from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get_url') {
      chrome.storage.local.get('currentURL', data => {
        sendResponse(data.currentURL);
      });
      return true;
    }
});

// Handle task list requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get_completed_task_list') {
    // Respond to Get Completed Task List request from tasks.js
    chrome.storage.local.get('completed_task_list', data => {
      sendResponse(data);
    });
    return true;
  } else if (message === 'get_active_task_list') {
    chrome.storage.local.get('active_task_list', data => {
      if (data) {
        sendResponse(data);
      } else {
        sendResponse(false)
      }
    });
    return true;
  } else if (message.type === 'add_task') {
      // Handle add task request from popup.js
      chrome.storage.local.get('active_task_list', data => {
        if (data.active_task_list.length === 0) {
          const newId = 1;
          const newObj = {...message.data, id: newId};
          data.active_task_list.push(newObj);
        } else {
          const newId = data.active_task_list[data.active_task_list.length - 1].id + 1;
          const newObj = {...message.data, id: newId};
          data.active_task_list.push(newObj);
        }
        chrome.storage.local.set({active_task_list: data.active_task_list});
        sendResponse('success');
      });
    return true;
  } else if (message.type === 'delete_active_task') {
      // Handle delete task request from tasks.js
      chrome.storage.local.get('active_task_list', data => {
        const newTaskList = data.active_task_list.filter(task => task.id !== message.id);
        chrome.storage.local.set({active_task_list: newTaskList});
        sendResponse('success');
      });
      return true;
  } else if (message.type === 'delete_completed_task') {
    // Handle delete task request from tasks.js
    chrome.storage.local.get('completed_task_list', data => {
      const newTaskList = data.completed_task_list.filter(task => task.id !== message.id);
      chrome.storage.local.set({completed_task_list: newTaskList});
      sendResponse('success');
    });
    return true;
  } else if (message.type === 'complete_task') {
    // Handle complete task request from tasks.js
    chrome.storage.local.get('active_task_list', data => {
      const completedTask = data.active_task_list.filter(task => task.id === message.id)[0];
      chrome.storage.local.get('completed_task_list', data => {
        data.completed_task_list.push(completedTask);
        chrome.storage.local.get('points', data => {
          if (data.points === undefined) {
            chrome.storage.local.set({points: completedTask.hours * 10});
          } else {
            chrome.storage.local.set({points: data.points + completedTask.hours * 10});
          }
        });
        chrome.storage.local.set({completed_task_list: data.completed_task_list});
      });
      const newActiveTaskList = data.active_task_list.filter(task => task.id !== message.id);
      chrome.storage.local.set({active_task_list: newActiveTaskList});
      sendResponse('success');
    });
    return true;
  } 
});


// Instance Initialization (preparing extension for use)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'initialize_instance') {
    chrome.storage.local.get('active_task_list', data => {
      if (data.active_task_list === undefined) {
        chrome.storage.local.set({active_task_list: []});
      }
    });
    chrome.storage.local.get('completed_task_list', data => {
      if (data.completed_task_list === undefined) {
        chrome.storage.local.set({completed_task_list: []});
      }
    });
    chrome.storage.local.set({instance_initialized: true});
    chrome.storage.local.set({sort_by: 'priority'});
    sendResponse(true);
    return true;
  }
});