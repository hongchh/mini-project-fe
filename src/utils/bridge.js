function callNativeHandler (handler, data, callback) {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler(handler, data, callback)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      try {
        console.log('WebViewJavascriptBridge', window.WebViewJavascriptBridge)
        window.WebViewJavascriptBridge.init(function (message, responseCallback) {})
      } catch (e) {
        console.log(e)
      } finally {
        window.WebViewJavascriptBridge.callHandler(handler, data, callback)
      }
    })
  }
}

export default {
  takePhoto () {
    callNativeHandler('takePhoto', {}, null)
  },
  login () {
    callNativeHandler('login', {}, null)
  },
  chat () {
    callNativeHandler('chat', {}, null)
  }
}
