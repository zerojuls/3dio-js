import runtime from '../core/runtime.js'
import poll from '../utils/poll.js'
import fetch from '../utils/io/fetch.js'
import urlUtils from '../utils/url.js'
import configs from '../core/configs.js'

// main

export default function getBakeResult(processingId) {
  return poll(function(resolve, reject, next) {
    var url = 'https://' + configs.storageDomainNoCdn + '/' + processingId

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(message) {
        var status = message.params.status

        if (status === 'ERROR') {
          reject(message.params.data)
        } else if (status === 'SUCCESS') {
          resolve(message.params.data)
        } else {
          next()
        }
      })
  })
}
