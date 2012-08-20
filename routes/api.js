fs = require('fs')
logger = require('../common/logger');
models = require('../models/schema');

ret = {
  code: 0,
  msg: '操作成功'
}
pagesize = 20
exports.api = {
  readVideo: function(req, res) {
    var page = (req.query.page || 1) - 1
    models.Video.findAll({
      offset: page * pagesize,
      limit: pagesize
    }).success(function(videos) {
      console.log(videos);
      res.json(videos)
    })
  },
  createVideo: function(req, res) {
    models.Video.create(req.body).success(function(video) {
      res.json(video)
    })
  },
  updateVideo: function(req, res) {
    models.Video.find(req.body.id).success(function(v) {
      v.updateAttributes(req.body)
    })
  },
  deleteVideo: function(req, res) {
    models.Video.find(req.body.id).success(function(v) {
      v.destroy().success(function() {
        res.json(ret)
      })
    })
  }
}