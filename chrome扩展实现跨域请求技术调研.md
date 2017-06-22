### chrome extension介绍
chrome扩展其实就是由html,js,css文件组成的，可以调用浏览器所有api,ajax请求不会收到浏览器跨域限制，解决跨域请求，有两种实现办法。

#### 一.通过修改服务器返回的resHeader(Access-Control-Allow-Origin)为*来解决

1. 根据跨域资源共享 CORS 协议，默认情况下ajax请求不会发送cookie，如果要发送cookie，
一方面需要服务器打开Access-Control-Allow-Credentials: true，
另一方面需要xmlhttprequest请求中打开withCredentials属性

2. 如果要发送cookie,Access-Control-Allow-Origin就不能为*

3. cors协议分为简单请求和非简单请求，修改req header信息或者method方法不是get,post就是非简单请求

4. 非简单请求在请求前会先发一个预检的options请求，服务器检查Origin、Access-Control-Request-Method和Access-Control-Request-Headers等字段后，做出回应。
浏览器根据返回的Access-Control-Allow-Origin等字段判断是否容许跨域


#### 二.使用chrome提供的content_scripts，运行扩展提供的js脚本。js脚本可获取和修改页面dom元素

