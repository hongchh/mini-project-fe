const port = 8080
const express = require('express')
const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./config')
const compression = require('compression')

let app = express()

// TODO

app.listen(port)

console.log('http://localhost:' + port)
