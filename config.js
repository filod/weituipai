/**
 * config
 */
var path = require('path');
module.exports = {
  MYSQL: {
    HOST: "localhost",
    DB: "weituipai",
    USERNAME: "root",
    PASSWORD: "root",
    PORT: 3306
  },
  defaultUser: 'filod',
  defaultPassword: 'fuck',
  tpl_path : __dirname + '/views',
  LOG_LEVEL: 'DEBUG',
  LOG_FILE: path.join(__dirname, 'all.log'),
  debug: true,
  name: '微·推派',
  description: '',
  version: '0.2.2',
  port: 3000,
  admin_port: 3001,
  // 话题列表显示的话题数量
  list_topic_count: 20,
};