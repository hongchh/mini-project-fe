const port = 8080
const express = require('express')
const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./config')
const compression = require('compression')

const index = path.join(__dirname, './dist/index.html')
const js = path.join(__dirname, './dist/static/js')
const css = path.join(__dirname, './dist/static/css')
const img = path.join(__dirname, './dist/static/img')
const manifest = path.join(__dirname, './dist/index.manifest')

let app = express()

app.use(compression())
app.use(config.rootUrl, express.static(index))
app.use('/static/js', express.static(js))
app.use('/static/css', express.static(css))
app.use('/static/img', express.static(img))
app.use('/index.manifest', express.static(manifest))
app.use('/*/index.manifest', express.static(manifest))
app.use('/login', proxyMiddleware({target: config.apiServer, changeOrigin: true}))

app.use('*', (req, res) => {
  res.redirect('/app')
})

app.listen(port)

console.log('http://localhost:' + port)
