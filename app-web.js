/**
 * Module dependencies.
 */
fs = require('fs')
hbs = require('hbs')
config  = require('./config')

var express = require('express'),
  routes = require('./routes/web'),
  http = require('http'),
  path = require('path')
  // engines = require('consolidate')

var app = express()
var maxAge = 3600000 * 24 * 30;
app.configure(function() {
  app.set('port', process.env.PORT || config.port)
  app.set('views', config.tpl_path)
  app.set('layout', false)
  app.set('view engine', 'html')
  app.engine('html', hbs.__express)
  app.use(express.favicon())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(require('less-middleware')({
    src: __dirname + '/public'
  }))
  app.use(express.static(path.join(__dirname, 'public'),{maxAge: maxAge}))
})

app.configure('development', function() {
  app.use(express.errorHandler())
})
app.configure('production', function() {
  app.use(express.errorHandler())
})

var home = function (req, res ) {
  return routes.home(req, res ,app)
}
/* routers*/
app.get('/', home)
// app.post('/', routes.home)
app.get('/categories', home)
app.get('/c/:category', home)
app.get('/v/:id', home)

/*apis */
var api = require('./routes/api')
api.register(app)


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'))
})


