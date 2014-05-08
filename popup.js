// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Store CSS data in the "local" storage area.
//
// Usually we try to store settings in the "sync" area since a lot of the time
// it will be a better user experience for settings to automatically sync
// between browsers.
//
// However, "sync" is expensive with a strict quota (both in storage space and
// bandwidth) so data that may be as large and updated as frequently as the CSS
// may not be suitable.

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});


var storage = chrome.storage.local;

// Get at the DOM controls used in the sample.
//var resetButton = document.querySelector('button.reset');
//var submitButton = document.querySelector('button.submit');
//var textarea = document.querySelector('textarea');

// Load any CSS that may have previously been saved.
//loadChanges();

//submitButton.addEventListener('click', saveChanges);
//resetButton.addEventListener('click', reset);

var storage = chrome.storage.local;

chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;


var res = url.replace("watch?v=","embed/");
   //document.getElementById('link').src =res;
 
document.getElementById('urlfield').value = res;  

});

var submitButton = document.querySelector('button.submit');
submitButton.addEventListener('click', saveChanges);

function saveChanges() {

 var result=document.getElementById('urlfield').value ;
   
if (!result) {
    message('No Url specified');
    return;
  }
  // Save it using the Chrome extension storage API.
    // First fetch the array of saved URLs
    storage.get({ urlList: [] }, function (items) {
        // Push the new URL in it.
        // You should also check that it is not already saved. 
        items.urlList.push(result);


        // Save the array back
        storage.set({ urlList: items.urlList }, function () {
            if (chrome.runtime.lastError) {
                alert('ERROR: ' + chrome.runtime.lastError.message);
            } else {
                alert('Operation completed successfully !');
            }
        });
    });
}



