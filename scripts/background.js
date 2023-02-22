

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


chrome.storage.local.set({active_task_list: [{title: 'active', description: 'test', points: 5, date: 'test'}, {title: 'active2', description: 'test', points: 5, date: 'test'}, {title: 'active3', description: 'test', points: 5, date: 'test'}]});
chrome.storage.local.set({completed_task_list: [{title: 'complete', description: 'test', points: 5, date: 'test'}, {title: 'complete2', description: 'test', points: 5, date: 'test'}, {title: 'complete3', description: 'test', points: 5, date: 'test'}]});

// Respond to Get Active Task List request from tasks.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get_active_task_list') {
    chrome.storage.local.get('active_task_list', data => {
      sendResponse(data);
    });
    return true;
  }
});

// Respond to Get Completed Task List request from tasks.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get_completed_task_list') {
    chrome.storage.local.get('completed_task_list', data => {
      sendResponse(data);
    });
    return true;
  }
});