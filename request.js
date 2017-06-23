(function(win){

/*==============common begin=================*/

var container = 'y-request';
var INITSTATUS = 0;
var RUNSTATUS = 1;
var ENDSTATUS = 2;

/*==============common end=================*/


function createNode(tagName, attributes, parentNode){
    options = attributes || {};
    tagName =  tagName || 'div';
    var dom = document.createElement(tagName);
    for(var attr in attributes){
        if(attr === 'id')  dom.id = options[attr];
        else dom.setAttribute(attr, options[attr]);
    }
    if(parentNode) parentNode.appendChild(dom);
    return dom;
}

function getid(){
    return container + '-' + id++;
}


var yRequestDom = createNode('div', {id: container, style: 'display:none'}, document.getElementsByTagName('body')[0]);

var yRequestMap = {};
var id= 0;


 function yRequest(req){
     data = {
         res: null,
         req: req
     }
     data = JSON.stringify(data, null, 4);
     var newId = getid();
     var div = createNode('div', {
            _id: newId,
            status: INITSTATUS
         }, yRequestDom);
     div.innerText = data;
     yRequestMap[newId] =  {
        id: newId,
        status: INITSTATUS,
        success: function(success){
            if(typeof success === 'function'){
                yRequestMap[newId].success = success;
            }
            return yRequestMap[newId];
        },
        error: function(error){
            if(typeof error === 'function'){
                yRequestMap[newId].error = error;
            }
            return yRequestMap[newId];
        }
     }
     return yRequestMap[newId];
 }

 setInterval(function(){
    var queueDom = yRequestDom.childNodes;
    queueDom.forEach(function(dom){
        if(+dom.getAttribute('status') ===ENDSTATUS){
            var text = dom.innerText;
            if(text){
                var data = JSON.parse(dom.innerText);
                var id   = dom.getAttribute('_id');

                if(data && data.res && data.res.body){
                     yRequestMap[id].success.call(data, data.res.body);
                }else{
                    yRequestMap[id].success.call(data, '');
                }
                dom.parentNode.removeChild(dom);

            }
            
        }

    })
 }, 100)

 win.yRequest = yRequest;


})(window)

