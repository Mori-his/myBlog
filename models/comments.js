/**
 * Created by Mori on 2015/12/30.
 */
var mongoose = require('mongoose');
var commentsSchema = require('../schemas/comments');
var comments = mongoose.model('comments',commentsSchema);

module.exports = comments;