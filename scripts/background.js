

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

// Respond to Get Completed Task List request from tasks.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get_completed_task_list') {
    chrome.storage.local.get('completed_task_list', data => {
      sendResponse(data);
    });
    return true;
  }
});