chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tab) {
		chrome.tabs.create({
			"url": "https://api.uphold.com/v0/ticker/ETH"
		});
	});
});

//////////////////////

var theURL = 'https://api.uphold.com/v0/ticker/ETH'

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader("Access-Control-Allow-Origin", theURL);
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept');

    xhr.onload = function()
    {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};



function setText(stg)
{
  console.log(stg)
  chrome.browserAction.setBadgeBackgroundColor({
    color: '#2283F4'
  });

  chrome.browserAction.setBadgeText({
    text: stg.toString()
  });
}



function loadPrice()
{

    getJSON(theURL).then(function(data) {
        // console.log(data); //you can comment this, i used it to debug

        for(var i =0;i<data.length;i++)
        {
          if (data[i]["pair"] == "ETHUSD")
          {
            console.log("ETHUSD")
             setText(Math.round(data[i]["bid"]).toString())
          }
        }

        // result.innerText = data.result; //display the result in an HTML element
    }, function(status) { //error detection....
      console.log('Something went wrong.');
    });

}

setInterval(loadPrice, 10000);//10s





//https://dev.opera.com/extensions/basics/
