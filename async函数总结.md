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
  await readFile('./index.js');
  await readFile('./package.json');
  if(Math.random()> 0.5){
      return 1;
  }else{
      throw new Error('error');
  }
};

var result = asyncReadFile(); //自带执行器，直接输出结果,result是一个promise对象
result.then(function(v){
    console.log(v)
}, function(v){
    console.log(v)
})

```
