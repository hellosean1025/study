### chrome extension介绍
chrome扩展其实就是由html,js,css文件组成的，可以调用浏览器所有api,ajax请求不会收到浏览器跨域限制，解决跨域请求，有两种实现办法。

#### 一.通过修改服务器返回的resHeader(Access-Control-Allow-Origin)为*来解决

1. 根据跨域资源共享 CORS 协议，只要服务器返回access-control-allow-origin为*则允许跨域请求，但只有满足不带cookie和简单请求才行


2. 默认情况下ajax请求不会发送cookie，如果要发送cookie，一方面需要服务器打开Access-Control-Allow-Credentials: true如果要发送cookie,Access-Control-Allow-Origin就不能为*，另一方面需要xmlhttprequest请求中打开withCredentials属性

3. cors协议分为简单请求和非简单请求，修改req header信息或者method方法不是get,post就是非简单请求

4. 非简单请求在请求前会先发一个预检的options请求，服务器检查Origin、Access-Control-Request-Method和Access-Control-Request-Headers等字段后，做出回应。
浏览器根据返回的Access-Control-Allow-Origin等字段判断是否容许跨域,而chrome扩展对这部分是没有操作权限的

**综上所述** ： 通过修改header方案是不可行的


#### 二.使用chrome提供的content_scripts

content_scripts是扩展提供的js脚本。js脚本可获取和修改当前页面dom元素，也就是说可以和原有页面的js脚本共享dom，但是js是不能相互调用的

通过参考nei和apizza.cc chrome扩展，他们是通过content_scripts脚本绑定原网页dom事件，操作原网页dom来实现的。

但这样是有一定问题的，比如我们的网站页面更新了，旧的谷歌扩展很可能不兼容新的页面，很可能导致功能出现问题，必须强制用户升级才可以。

**那还有其他解决办法吗？**

当然有，既然原有的js和content_scripts可以共享dom，那么通过操作dom元素，使用定时器检查dom元素的改变，也能拿到需要进行的操作。

这种解决办法好处就在降低了耦合，新功能页面改变基本不会影响扩展的使用。但同时会带来新的问题，普通ajax请求可能没问题，但像文件提交这样的，不是很好处理。文件的上传必须通过dom事件绑定到dom，不可能将上传后的数据传递到dom，然后再通过dom传递给content_scripts

