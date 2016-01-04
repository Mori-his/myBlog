/**
 * Created by Mori on 2015/11/27.
 */
var Schema = require('mongoose').Schema;
var ShareSchema = new Schema({
    title : String,
    imgUrl : String,
    author : String,
    source : String,
    content : String,
    meta : {
        createAt : {
            type : Date,
            default : Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

ShareSchema.pre('save',function(next){
    if(this.isNaN){//判断是否为新增
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});

ShareSchema.statics = {
    fetch : function(backcall){
        return this.find({}).sort('meta.updateAt').exec(backcall);
    },
    fetchById : function(id,backcall){
        return this.findOne({_id:id}).exec(backcall);
    }
};
module.exports = ShareSchema;