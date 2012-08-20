/**
 * Module dependencies.
 */
fs = require('fs')
hbs = require('hbs')
config  = require('./config')

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
readPartials(config.tpl_path)
 

var rawRender = function (view, options, fn) { 
  fn(err,str)
}

var express = require('express'),
  routes = require('./routes/admin'),
  http = require('http'),
  path = require('path'),
  engines = require('consolidate');
  

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', config.tpl_path);
  app.set('layout', false);
  app.set('view engine', 'html');
  app.engine('html', hbs.__express);
  app.use(express.favicon());
  app.use(express.cookieParser('jct7o32mxbjzto6r'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
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

app.get('/', function(req,res){
  return routes.admin.get(req, res, app) 
});
app.post('/', routes.admin.post);


app.get('/logout', routes.logout);
app.post('/tpl', function(req,res){
  return routes.tpl(req, res, app) 
});

/*apis */
api = require('./routes/api').api,
console.log(api);

app.get('/api/v',api.readVideo)
app.post('/api/v/update',api.updateVideo)
app.post('/api/v/destory',api.destoryVideo)
app.post('/api/v/create',api.createVideo)

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});


