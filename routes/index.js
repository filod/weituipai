
/*
 * GET home page.
 */

exports.home = function(req, res){
  var path = app.get('views') + '/web/index.html'
  output = fs.readFileSync(path, 'utf8')
  res.send(output);
};