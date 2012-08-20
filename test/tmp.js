model = require('../models/schema')
logger = require('../common/logger')
sequelize = model.sequelize;

var User = model.User;
var Video = model.Video;

// var salt = User.getSalt();
// User.create({
//   email: 'filod@qq.com',
//   password: User.getHash('admin123', salt),
//   salt: salt,
//   role: 'ADMIN',
//   lastAuthProvider: 'local'
// }).success(function() {
//   console.log("Success");
// }).error(function(err) {
//   console.log("ERROR: " + err);
// });
//assert.equal(user.username ,'pranil'), "This should be equal";
var salt = User.getSalt();
console.log(salt)
var newUser = User.build({
  email: 'f',
  salt: salt,
  password: User.getHash('f',salt),
});

newUser.save().error(function(err) {
  if (err) {
    logger.info(err)
    throw err;
  }
  logger.debug('new user Email: ' + newUser.email);
});
for (var i = 0; i < 5; i++) {
  var v = Video.build({
    title : "条目" + i,
    category : "类别"+ i%2,
    thumb : "upload/thumb/"+i+'.png',
    description :"关于条目的说明，哇卡卡卡卡卡卡卡卡"
  });
  v.save().error(function (err) {
    if(err){
      logger.info(err)
    }
  })
};