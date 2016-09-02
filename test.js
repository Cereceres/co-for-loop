'use strict'
function * test () {
  let i = 0
  yield i
  while (true) {
    yield i++
  }
}

// let a = new Promise((resolve, reject) => {
//   let res
//   let gen
//   function next () {
//     console.log('res.value', res.value, res.done)
//     if (res.done) return res.value
//     res = gen.next()
//     next()
//   }
//   try {
//     gen = test()
//     res = gen.next()
//     next()
//     resolve()
//   } catch (err) {
//     reject(err)
//   }
// })
// console.log('antes')
// a.then((value) => {
//   console.log('inter')
// })
// .catch(err => {
//   console.log('err', err)
// })
// console.log('despues')

function next () {
  next()
}
next()
