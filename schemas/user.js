/**
 * Created by Mori on 2015/11/30.
 */
var Schema = require("mongoose").Schema;
var bcrypt = require('bcrypt-nodejs');
var ITERACTION_COUNT = 10;
var UserSchema = new Schema({
    name : String,
    password : String,
    // 0: nomal user
    // 1: verified user
    // 2: professonal user
    // >10: admin
    // >50: super admin
    role: {//角色
        type: Number,
        default: 0
    },
    meta : {
        createAt : {
            type : Date,
            default: Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

UserSchema.pre("save",function(next){
    if(this.isNaN){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.updateAt = Date.now();
    }
    var user = this;
    bcrypt.genSalt(ITERACTION_COUNT,function(err,salt){
       if(err){
           return next(err);
       }
        bcrypt.hash(user.password,salt,false,function(err,hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});

UserSchema.methods = {
    comparePassword: function(password,callback){
        bcrypt.compare(password,this.password,function(err,isMatch){
            if(err){
                callback(err);
            }else{
                callback(null,isMatch);
            }

        });
    }
}

UserSchema.statics = {
    fetch : function(callback){
        return this.find({}).sort("meta.updateAt").exec(callback);
    },
    fetchById : function(id,callback){
        return this.findOne({_id:id}).exec(callback);
    }
}


module.exports = UserSchema;