/**
 * Created by Mori on 2015/12/30.
 */
var Schema = require('mongoose').Schema;
var commentsSchema = new Schema({
    name: String,
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});
commentsSchema.pre('save',function(next){
    if(this.isNaN){//判断是否为新增
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.updateAt = Date.now();
    }
    next();
});
commentsSchema.statics = {
    fetch: function(callback){
        return this.find({}).sort('meta.updateAt').exec(callback);
    },
    fetchById: function(id,callback){
        return this.find({_id: id}).exec(callback);
    }
};
module.exports = commentsSchema;