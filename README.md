# co-for-loop
[![Build Status](https://travis-ci.org/Cereceres/co-for-loop.svg?branch=master)](https://travis-ci.org/Cereceres/co-for-loop)
asyn loop using generators
## Install

Install dependencies:

```
$ npm install co-for-loop
```

## co-for-loop
Function that loop over a set of values asynchronous, you can use arrays, object
and strings to do a async loop.
### co_for_loop(iterator,promiseGenerator)=>Promise
The promise will be resolved when iterate over all iterator. Iterator could be a array
, object and string. The function receive promiseGenerator the value stored into iterator, index and array self
if is array, the keys,values and object self if is a object. The return object of promiseGenerator have to
be a promise, if this promise is resolved with a true boolean value the loop is stopped.
The case when the iterator is a string has to be like 'min:increment:max' where the loop is init
in min value and is increment until max value, if the increment value is missing
 ('min:max')takes the default value 1.
```js
console.time('test with for loop')
let array = [1, 2, 3]
console.log('before')
let p = new Promise(function (resolve) {
  for (var i = 0; i < array.length; i++) {
    assert(array[i] < 4)
  }
  console.log('inter')
  resolve()
})
console.log('after')
console.timeEnd('test with for loop')
// before
// inter
// after
// test with for loop: 1.013ms
console.time('test with for coloop')
let array = [1, 2, 3]
console.log('before')
coLoop(array, function (value) {
  return new Promise(function (resolve, reject) {
    assert(value < 4)
    resolve()
  })
})
.then(() => {
console.log('inter')
console.timeEnd('test with for coloop')
})
console.log('after')
// before
// after
// inter
// test with for coloop: 0.934ms
let array = '0:0.1:3'
coLoop(array, function (value) {
    console.log('value=',value)
  return new Promise(function (resolve, reject) {
    assert(value < 4)
    resolve()
  })
})
// value= 0
// value= 0.1
// value= 0.2
// value= 0.30000000000000004
// value= 0.4
// value= 0.5
// value= 0.6
// value= 0.7
// value= 0.7999999999999999
// value= 0.8999999999999999
// value= 0.9999999999999999
// value= 1.0999999999999999
// value= 1.2
// value= 1.3
// value= 1.4000000000000001
// value= 1.5000000000000002
// value= 1.6000000000000003
// value= 1.7000000000000004
// value= 1.8000000000000005
// value= 1.9000000000000006
// value= 2.0000000000000004
// value= 2.1000000000000005
// value= 2.2000000000000006
// value= 2.3000000000000007
// value= 2.400000000000001
// value= 2.500000000000001
// value= 2.600000000000001
// value= 2.700000000000001
// value= 2.800000000000001
// value= 2.9000000000000012
```
