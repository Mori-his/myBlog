/**
 * Created by Mori on 2015/11/27.
 */
var express = require('express');
var router = express.Router();
var Share = require('../models/share');

router.get('/admin/addShare',function(req,res,next){
    res.render('createshare',{
        title : "添加经验积累文章"
    });
});

router.post('/admin/create.share',function(req,res){
    var _user = req.session.user;
    var _share = req.body.share;
    //console.log(_share);
    //for(var i in _share){
    //    if(_share[i] === ''){
    //        return res.redirect('/admin/addShare');
    //    }
    //}
    _share.author = _share.author ? _share.author : _user.name;
    _share.source = _share.source ? _share.source : "本站";
    if(!_user){
        res.redirect('/admin/addShare');
    }else{
        var share = new Share(_share);
        share.save(function(err,share){
            if(err){
                console.log(err);
            }
            res.redirect('/');
        })
    }
});

module.exports = router;