fs = require('fs')
logger = require('../common/logger');
models = require('../models/schema');
exports.admin = {
  get: function(req, res, app) {
    if(req.signedCookies && req.signedCookies.user){
      var path = app.get('views') + '/index.html'
      output = fs.readFileSync(path, 'utf8')
      res.send(output);
    }else{
      res.render('signin')
    }
  },
  post: function(req, res) {
    models.User.authenticate(req.body.email,req.body.password,function (err, user, msg) {
      if(err){
        console.log(err)
        return
      }
      console.log('filod'+user.email)
      if(user){
        res.cookie('user', user.email, { signed: true });
        res.redirect('/')
      }else{
        res.send(msg)
      }
    })
  }
}



exports.logout = function (req, res) {
  res.clearCookie('user')
  res.redirect('/')
}
var tplStringCache = {}
exports.tpl = function (req, res, app) {
  var path = app.get('views') + '/' + req.body.tplname + '.html'
  if(tplStringCache[path]){
    res.send(tplStringCache[path])
    logger.info('sent with cache')
    return;
  }
  fs.readFile(path,function (err, data) {
    tplStringCache[path] = data
    if(err) {
      throw err;
      return
    }
    logger.info('sent first time')
    res.send(data)
  })
}