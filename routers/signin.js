/**
 * Created by Mori on 2015/11/30.
 */
var express = require('express');
var router = express.Router();
var User = require("../models/user");

router.post('/admin/signin',function(req,res,next){
    var _user = req.body.user;
    var name = _user.name,
        password = _user.password;
    User.findOne({name:name},function(err,user,next){
        if(err){
            console.log(err);
        }else{
            if(!user){
                res.redirect('/');
            }else{
                user.comparePassword(password,function(err,isMatch){
                    if(err){
                        console.log(err);
                    }else{
                        if(isMatch){
                            req.session.user = user;
                            return res.redirect('/');
                        }else{
                            console.log("Password is not matched")
                        }
                    }
                });
            }
        }

    });
});

module.exports = router;