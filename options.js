

var storage = chrome.storage.local;
loadChanges();

function loadChanges() {

  // Retrieve the whole list
    storage.get({ urlList: [] }, function (items) {
        // Process the URLs one-by-one
        for (var i = 0; i < items.urlList.length; i++) {
            var url = items.urlList[i];
            // Do something with this URL
$('<iframe />', {
    name: 'myFrame',
    id:   'myFrame',
    src:  url,
}).appendTo('body');
        }

    });
}




