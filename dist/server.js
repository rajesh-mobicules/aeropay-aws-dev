var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
// var compression = require('compression')
var app = express()
app.use(serveStatic(__dirname))

app.use('/iavcss', serveStatic(__dirname + '/static'))
var port = process.env.PORT || 5000


// var app = new (require('express'))()

// var port = 5000
app.listen(port)
console.log('server started ' + port)

// const hostname = 'aeropayments.com'
// var httpsPort = 5443
// app.set('port_https', httpsPort)
// redirect every visit to https
// app.all('*', function (req, res, next) {
//   // console.log(req)
//   if (req.secure) {
//     return next()
//   }
//   const redirectUrl = 'https://' + req.hostname + req.url
//   // console.log('redirected')
//   // const redirectUrl = 'https://'+req.hostname+':'+app.get('port_https')+req.url
//   res.redirect(redirectUrl)
// })

// app.get('*', function (req, res) {
//   // console.log('got something')
//   res.sendFile(path.join(__dirname, 'index.html'))
// })
// app.use(compression())
//
// app.listen(port, function (error) {
//   if (error) {
//     console.error(error)
//   } else {
//     console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
//   }
// })

// var https = require('https')
// var http = require('http')
// var fs = require('fs')

// var options = {
//   key: fs.readFileSync('new-rrponline.us/rrponline_us.key'),
//   cert: fs.readFileSync('new-rrponline.us/rrponline_us.chained.crt')
// }
// var options = {
//   ca: fs.readFileSync('rrponline_us/rrponline_us.ca-bundle'),
//   key: fs.readFileSync('rrponline_us/rrponline_us.key'),
//   cert: fs.readFileSync('rrponline_us/rrponline_us.crt')
// }

// https.createServer(options, app).listen(httpsPort, function () {
//   console.log('Secure Server listening on port ' + httpsPort)
// })
// http.createServer(app).listen(port, function () {
//   console.log('HTTP Server listening on port ' + port)
// })
