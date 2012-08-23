/* make some seed data */
model = require('../models/schema')
logger = require('../common/logger')
config = require('../config')
sequelize = model.sequelize;

var User = model.User;
var Video = model.Video;

var salt = User.getSalt();
User.create({
  email: config.defaultUser,
  password: User.getHash(config.defaultPassword, salt),
  salt: salt,
  role: 'ADMIN',
  lastAuthProvider: 'local'
}).success(function() {
  console.log("Success");
}).error(function(err) {
  console.log("ERROR: " + err);
});
Video.drop().success(function() { 
})
  for (var i = 0; i < 25; i++) {
    var v = Video.build({
      title : ["电视问政直播干部被问得尴尬出汗",'子女听信巫师谗言将母亲活活烧死', '太阳照常升起'][i%3] + i,
      category : ["最新","热门","音乐"][i%3],
      thumb : 'default.jpg',
      video : 'default.m4v',
      description :["提高领导素质上 迈出了一小小步 而欢欣鼓舞，瞬间就暴露出 某些领导 那仅胜于弱智的水平。孰不知，在西方世界的领导人们 早就习惯了电视辩论，个个都是辩论高手，相互对质 面不改色心不跳，强大的逻辑和理论，别说艹民问不倒，就是竞争对手团队 都败倒。",
      "们能把这样的权力交给电视吗？媒体只不过是宣传部的下属，那不是又一个权力怪圈？为什么不让我们自己选的人",
      "有本事上人民广场搞啊，我看那些上啥的不活吃了你们。就会放炮，完了心情好就不搭理你，问的火了你就乐子大"][i%3],
    });
    v.save().error(function (err) {
      if(err){
        logger.info(err)
      }
    })
  }; 

