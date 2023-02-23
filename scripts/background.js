

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

// Respond to Get Active Task List request from tasks.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get_active_task_list') {
    chrome.storage.local.get('active_task_list', data => {
      sendResponse(data);
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Respond to Get Completed Task List request from tasks.js
  if (message === 'get_completed_task_list') {
    chrome.storage.local.get('completed_task_list', data => {
      sendResponse(data);
    });
    return true;
    // Handle add task request from popup.js
  } else if (message.type === 'add_task') {
      chrome.storage.local.get('active_task_list', data => {
      data.active_task_list.push(message.data);
      chrome.storage.local.set({active_task_list: data.active_task_list});
      sendResponse('success');
    });
  }
});


// TODO: Fix the error for response timeout on add task message listener