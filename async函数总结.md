## 基本概念
async函数是对go函数的改进，使异步处理更简单和方便。

```javascript
const fs = require('fs');

function readFile(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, function(error, data){
            if(error) reject(error);
            resolve(data);
        })
    })
}

var asyncReadFile = async function () {
  var f1 = await readFile('./index.js');
  var f2 = await readFile('./package.json');
  console.log(f1.toString());
  console.log(f2.toString());
};

var result = asyncReadFile(); //自带执行器，直接输出结果,result是一个promise对象
```
