'use strict'
var res
var increment
var self
var max, keys, object
let debug = require('debug')('co-for-loop')
let controller = {
/**
* Helper method to do a loop async with objects
*
* @function coLoop
* @version 1.0.0
*
*/
    object: function (iterator, promise) {
        return new Promise(function (resolve, reject) {
            var count = 0
            var next = function () {
                count++
                res = iterator.next()
                if (!res.done) {
                    debug('calling with : ',res.value)
                    return promise
                    .call(self, res.value, object[res.value] === undefined ?
                        count : object[res.value], object)
                    .then( _next=> {
                        if (!_next) {
                            debug.info('fellowing the loop')
                            return next()
                        }
                        resolve(res.value)
                    })
                    .catch(reject)
                }
                resolve(res.value)
            }
            try {
                res = iterator.next()
                if (!res.done) {
                    debug('calling with : ',res.value)
                    return promise
                    .call(self, res.value, object[res.value] === undefined ?
                        count : object[res.value], object)
                    .then(function (_next) {
                        if (!_next){
                            debug.info('following the loop')
                            return next()
                        }
                        resolve(res.value)
                    })
                    .catch(reject)
                }
                resolve(res.value)
            } catch (e) {
                debug.error('error catched',e)
                reject(e)
            }
        })
    },
  /**
  * Helper method to do a loop async with strings
  *
  * @function coLoop
  * @version 1.0.0
  *
  */
    string: function (string, promise) {
        return new Promise(function (resolve, reject) {
            var next = function () {
                res += increment
                if (res <= max) {
                    return promise
                    .call(self, res)
                    .then(function (_next) {
                        if (!_next) {
                            debug.info('following the loop')
                            return next()}
                        resolve(res)
                    })
                    .catch(reject)
                }
                resolve(res)
            }
            try {
                string = string.split(':')
                res = +(string[0])
                string[2] && (max = +(string[2])) && (increment = +(string[1]))
                !string[2] && (max = +(string[1])) && (increment = 1)
                max < res && (increment = -increment)
                if (!max) throw new Error('max value is required')
                if (max < res && increment > 0) return resolve()
                if (max !== res && increment === 0) return resolve()
                if (res <= max) {
                    debug('calling with : ',res)
                    return promise
                    .call(self, res)
                    .then(function (_next) {
                        if (!_next) {
                            debug.info('following the loop')
                            return next()
                        }
                        resolve(res.value)
                    })
                    .catch(reject)
                }
                resolve(res.value)
            } catch (e) {
                debug.error('error catched',e)
                reject(e)
            }
        })
    }
}

/**
* Helper method to do a loop async
*
* @function coLoop
* @version 1.0.0
*
*/
module.exports = function (iterator, promise) {
    object = iterator
    !iterator.next && Array.isArray(iterator) && (keys = iterator[Symbol.iterator]())
    typeof iterator === 'object' && !(iterator instanceof Array) &&
  (keys = Object.keys(iterator)[Symbol.iterator]())
    self = this
    let arg = typeof iterator === 'string' ? iterator : keys
    return typeof controller[typeof iterator] === 'function'
  ? controller[typeof iterator].call(self, arg, promise) : Promise.reject('No type suppoerted')
}
