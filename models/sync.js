schema = require('./schema');
logger = require('../common/logger');

schema.sync(function(err) {
  if (err) {
    logger.error("Unable to create schema" + err)
  } else {
    logger.info("Schema created successfully")
  }
})