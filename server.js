var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
// var compression = require('compression')
var app = express()
app.use(serveStatic(__dirname))

app.use('/iavcss', serveStatic(__dirname + '/static'))
var port = process.env.PORT || 5000

app.get('*', function (req, res) {
  // console.log('got something')
  res.sendFile(path.join(__dirname, 'index.html'))
})
var http = require('http')
http.createServer(app).listen(port, function () {
  console.log('HTTP Server listening on port ' + port)
})
