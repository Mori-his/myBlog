/**
 * Created by Mori on 2015/11/30.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/user');
router.post('/admin/signup',function(req,res){
    var _user = req.body.user;
    var user = new User(_user);
    User.find({name:_user.name},function(err,item){
        if(err){
            console.log(err);
        }
        if(item.length > 0){
            return res.redirect('/');
        }
        user.save(function(err,user){
            if(err){
                console.log(err);
            }
            res.redirect('/admin/userlist');
        });
    })
});



module.exports = router;