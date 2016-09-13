'use strict'
let coLoop = require('../index')
let assert = require('assert')
describe('the test to looper', function () {
    it('test for for loop', function (done) {
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
        p.then(done)
        console.log('after')
        console.timeEnd('test with for loop')
    })
    it('interate over a array', function (done) {
        console.time('test with for coloop')
        let array = [1, 2, 3]
        console.log('before')
        coLoop(array, function (value) {
            return new Promise(function (resolve) {
                assert(value < 4)
                resolve()
            })
        })
  .then(() => {
      console.log('inter')
      console.timeEnd('test with for coloop')
      done()
  })
  .catch(done)
        console.log('after')
    })
    it('interate over a string', function (done) {
        let array = '0:3'
        coLoop(array, function (value) {
            return new Promise(function (resolve, reject) {
                assert(value < 4)
                resolve()
            })
        })
  .then(() => {
      done()
  })
  .catch(done)
    })
    it('interate over a string with increment', function (done) {
        let array = '0:0.1:3'
        coLoop(array, function (value) {
            return new Promise(function (resolve, reject) {
                assert(value < 4)
                resolve()
            })
        })
  .then(() => {
      done()
  })
  .catch(done)
    })
})
