/**
 * Module dependencies.
 */
fs = require('fs')
// hbs = require('hbs')
config  = require('./config')

var express = require('express'),
  routes = require('./routes/admin'),
  http = require('http'),
  path = require('path');
  // engines = require('consolidate');

function readPartials(path) {
  var files = fs.readdirSync(path);
  var partials = [];
  var i = 0;
  for (i in files) {
    if (files[i].indexOf("_") === 0) {
      var partialName = files[i].substr(0, files[i].lastIndexOf('.'));
      var partialFile = path + '/' + files[i];
      var partialTemplate = fs.readFileSync(partialFile, 'utf8');
      hbs.registerPartial(partialName, partialTemplate);
      //console.log(partialName, partialTemplate)
    }
  }
  return partials;
}
// readPartials(config.tpl_path)  

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || config.admin_port);
  app.set('views', config.tpl_path);
  app.set('layout', false);
  app.set('view engine', 'html');
  app.engine('html', hbs.__express);
  app.use(express.favicon());
  app.use(express.cookieParser('jct7o32mxbjzto6r'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, 'public/upload') }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({
    src: __dirname + '/public'
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

/* routers*/
app.post('/', routes.admin.post);
var home =function(req,res){
  return routes.admin.get(req, res, app) 
}
app.get('/', home);
app.get('/page/:page?', home);
app.get('/logout', routes.logout);
app.post('/tpl', function(req,res){
  return routes.tpl(req, res, app) 
});

/*apis */
api = require('./routes/api'),
api.register(app)


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});


