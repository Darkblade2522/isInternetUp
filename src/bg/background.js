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
var threshold = 1;
var adressToTest = "www.google.com";
var interval = 10;

setInterval(function (){
	ping(adressToTest, 5000, response);
}, interval * 1000);

function response(result){
	var options = {
		type: "basic"
	};
	
	switch(result)
	{
		case "responded":
			console.log("Ok!");
			if (internetWasOff >= threshold){
				console.log("Internet Back!");
				options.title 	= "Internet Back!";
				options.message = "It's safe again! Have a kitten";
				options.iconUrl = "images/85.jpeg";
				chrome.notifications.create("1", options, function(){});
			}
			internetWasOff = 0;
			break;
		
		case "timeout":
		default:
			console.log("Acht, nein!");
			internetWasOff++;
			if (internetWasOff == threshold){
				console.log("Internet Down!");
				options.title 	= "Internet Down!";
				options.message = "I need a medic!";
				options.iconUrl = "images/75.jpeg";
				chrome.notifications.create("1", options, function(){});
			}
			break;
	}
}

function ping(ip, timeout, callback) {
	console.log("Pinging...");

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, timeout);
    }
}