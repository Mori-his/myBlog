/**
 * Created by Mori on 2015/11/30.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/user');
router.get('/admin/userlist',function(req,res){
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render('userlist',{
            title : "用户列表",
            active: "active",
            users : users
        });
    });

});

router.delete('/admin/moveUser',function(req,res){
    var id = req.query.id;
    if(id){
        User.remove({_id:id},function(err,user){
            if(err){
                console.log(err);
            }
            res.json({success:1});
        })
    }
});

module.exports = router;