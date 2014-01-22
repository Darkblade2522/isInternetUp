// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });*/
 
var internetWasOff = 0;

function online(event) {
	var options = {
		type: "basic"
	};

	if (navigator.onLine && internetWasOff == 1){
		internetWasOff = 0
		console.log("Internet Back!");
		options.title 	= "Internet Back!";
		options.message = "It's safe again! Have a kitten";
		options.iconUrl = "images/85.jpeg";
		chrome.notifications.create("1", options, function(){});
	}
	else{
		internetWasOff = 1;
		console.log("Internet Down!");
		options.title 	= "Internet Down!";
		options.message = "I need a medic!";
		options.iconUrl = "images/75.jpeg";
		chrome.notifications.create("1", options, function(){});
	}
}

window.addEventListener('online', online, false);
window.addEventListener('offline', online, false);
