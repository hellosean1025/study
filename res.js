/*==============common begin=================*/

var container = 'y-request';
var INITSTATUS = 0;
var RUNSTATUS = 1;
var ENDSTATUS = 2;
/*==============common end=================*/

var yRequestDom = document.getElementById(container);







function yResponse(){
    var reqsDom = yRequestDom.childNodes;
    reqsDom.forEach(function(dom){
        var status  = dom.getAttribute("status"), request;
        
        if(+status === INITSTATUS){
            dom.setAttribute("status", RUNSTATUS);
            var data = JSON.parse(dom.innerText);
            var success = function(res){
                return resFn(res, 'success', dom, data);
            }
            var error   = function(res){
                return resFn(res, 'error', dom, data);
            }
            chrome.runtime.sendMessage(data.req, function (res){
                if(!res) return;
                console.log(arguments)
                var dom = this;
                var type = res.status || 200;
                var id      = dom.getAttribute("_id");
                
                data.res = {
                    status: type,
                    header: {},
                    body:   res
                };

                dom.innerText = JSON.stringify(data);
                dom.setAttribute('status', ENDSTATUS);
            })
        }
    })
}

setInterval(function(){
    yResponse()
}, 100)





//background.js
'use strict';
chrome.runtime.onMessage.addListener(function(objRequest, _, sendResponse){
	objRequest.async = false;
	var result;
	$.ajax(objRequest).then(function(res){
		result = {
			status: 200,
			res: 1
		}
	}, function(err){
		result = {
			status: 500,
			res: 2
		}
	})


	console.log(result)
	sendResponse(result)
});


manifest.json

{
    "manifest_version": 2,
    "name": "Getting started example",
    "description": "This extension shows a Google Image search result for the current page",
    "version": "1.0",
    "browser_action": {
        "default_icon": "icon.png",
        "default_popup": "popup.html"
    },
     "permissions": [ "tabs", "storage", "webRequest", "webRequestBlocking", "*://*/*" ],
    "background": 
    {
      "scripts" : [
          "node_modules/jquery/dist/jquery.js",
          "node_modules/underscore/underscore.js",
          "background.js"
          ]
    },
     "content_scripts": [{
          "matches": ["http://*/*", "https://*/*"],
        "js": [
            "node_modules/jquery/dist/jquery.js",
            "test.js"
        ]
    }]
}
