## 基本概念
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同，可以把Generator函数理解成一种状态机，封装了多个状态。
执行Generator函数会生成一个遍历器对象，也就是说Generator不仅封装了多个状态，还是个遍历对象生成函数。

Generator函数特征：*函数名 和 yield

```javascript
function* testGenerator(){
  yield "abc"
  yield "xyz"
  return "test"
}

var hw = helloWorldGenerator();

console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
```

### 执行结果
```javascript
{ value: 'hello', done: false }
{ value: 'world', done: false }
{ value: 'ending', done: true }
{ value: undefined, done: true }
```





