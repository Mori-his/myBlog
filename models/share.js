/**
 * Created by Mori on 2015/11/27.
 */
var mongoose = require('mongoose');
var ShareSchema = require("../schemas/share");
var Share = mongoose.model('share',ShareSchema);

module.exports = Share;