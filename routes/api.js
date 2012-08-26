fs = require('fs')
path = require('path')
_ = require('underscore')
logger = require('../common/logger');
models = require('../models/schema');
sequelize = models.sequelize;
format = require('util').format;
ret = {
  code: 0,
  msg: '操作成功'
}
pagesize = 5
var api = {
  readCategories: function (req, res) {
    var statement = "SELECT DISTINCT category FROM Videoes"
    sequelize.query(statement, null, {raw: true}).on('success', function(r) {
      res.json(r)
    })
  },
  // readVideoByCategory: function (req, res) {
  //   var page = (req.query.page || 1) - 1
  //   var query = {
  //     order: "id DESC"
  //   }
  //   if (req.query.category) {
  //     _.extend(query, {
  //       where: {
  //         category: req.query.category，
  //         offset: page * pagesize,
  //         limit: pagesize
  //       }
  //     })
  //   } else {
  //     _.extend(query, {
  //       offset: page * pagesize,
  //       limit: pagesize
  //     })
  //   }
  //   models.Video.findAll(query).success(function(videos) {
  //     res.json(videos)
  //   })
  // },
  readVideo: function(req, res) {
    var page = (req.query.page || 1) - 1
    var query = {
      order: "id DESC"
    }
    var where = {}
    if(req.params.id){
      models.Video.find(parseInt(req.params.id)).success(function(v) {
        v.updateAttributes({
          viewcount : v.viewcount+1
        }).success(function(v) {
          res.json(v)
        })
      })
      return
    }
    console.log(req.query.filter);
    if (req.query.category) {
      _.extend(where, {
          category: req.query.category
      })
    }
    if (req.query.status) {
      _.extend(where, {
          status: req.query.status
      })
    }
    if(_.keys(where).length >0){
      query.where = where
    }
    _.extend(query, {
      offset: page * pagesize,
      limit: pagesize
    })
    models.Video.findAll(query).success(function(videos) {
      res.json(videos)
    })
  },
  createVideo: function(req, res) {
    models.Video.create(req.body).success(function(video) {
      res.json(video)
    })
  },
  updateVideo: function(req, res) {
    models.Video.find(parseInt(req.params.id)).success(function(v) {
      v.updateAttributes(req.body).success(function(v) {
        res.json(v)
      })
    })
  },
  destoryVideo: function(req, res) {
    console.log(req.params.id);
    models.Video.find(parseInt(req.params.id)).success(function(v) {
      v.destroy().success(function() {
        res.json(ret)
      })
    })
  },
  upload: function(req, res, next) {
    // console.log(req.files);
    console.log(req.files.thumb);
    if (req.path.indexOf("upload/thumb") > -1) {
      req.body.thumb = path.basename(req.files['thumb'].path)
    } else if (req.path.indexOf("upload/video") > -1) {
      req.body.video = path.basename(req.files['video'].path)
    }
    api.updateVideo(req, res);
  },
}

module.exports.register = function(app) {
  app.get('/api/categories', api.readCategories)
  app.get('/api/v', api.readVideo)
  app.get('/api/v/:id', api.readVideo)
  app.put('/api/v/:id', api.updateVideo)
  app.delete('/api/v/:id', api.destoryVideo)
  app.post('/api/v', api.createVideo)
  app.post('/api/v/:id/upload/thumb', api.upload)
  app.post('/api/v/:id/upload/video', api.upload)
}