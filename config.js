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
  tpl_path : __dirname + '/public/javascripts/tpl/admin',
  LOG_LEVEL: 'DEBUG',
  LOG_FILE: path.join(__dirname, 'all.log'),
  debug: true,
  name: 'Node Club',
  description: 'Node Club 是用Node.js开发的社区软件',
  version: '0.2.2',

  // site settings
  site_headers: ['<meta name="author" content="EDP@TAOBAO" />', ],
  host: 'localhost.cnodejs.org',
  site_logo: '',
  // default is `name`
  site_navs: [
  // [ path, title, [target=''] ]
  ['/about', '关于'], ],
  site_static_host: '',
  // 静态文件存储域名
  site_enable_search_preview: false,
  // 开启google search preview
  site_google_search_domain: 'cnodejs.org',
  // google search preview中要搜索的域名
  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),

  // db: 'mongodb://127.0.0.1/node_club_dev',
  session_secret: 'node_club',
  auth_cookie_name: 'node_club',
  port: 3000,
  // 话题列表显示的话题数量
  list_topic_count: 20,
};