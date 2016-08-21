'use strict'

/**
* Helper method to do a loop async
*
* @function coLoop
* @version 1.0.0
*
*/
module.exports = function (iterator, promise) {
  var self = this
  var res
  return new Promise(function (resolve, reject) {
    var next = function () {
      res = iterator.next()
      if (!res.done) {
        promise.call(self, res.value)
        .then(function (_next) {
          if (_next) {
            next()
            return
          }
          resolve(res.value)
        })
        .catch(reject)
        return
      }
      resolve(res.value)
    }
    try {
      res = iterator.next()
      if (!res.done) {
        promise.call(self, res.value)
      .then(function (_next) {
        if (_next) {
          next()
          return
        }
        resolve(res.value)
      })
      .catch(reject)
        return
      }
      resolve(res.value)
    } catch (e) {
      reject(e)
    }
  })
}
