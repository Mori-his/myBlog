/**
 * Created by Mori on 2015/11/27.
 */
var mongoose = require('mongoose');
var MomentsSchema = require("../schemas/moments");
var Moments = mongoose.model('moments',MomentsSchema);

module.exports = Moments;