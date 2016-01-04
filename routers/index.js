/**
 * Created by Mori on 2015/11/27.
 */
var express = require('express');
var router = express.Router();
var Eventr = require('eventr');
var left = new Eventr();
var myUtil = require('../libs/util/util');

//导入数据
var Moments = require('../models/moments');
var Share = require('../models/share');
//并发取出数据
left.emit('Moments','ssss');
Share.fetch(function(err,shares){
    if(err){
        console.log(err);
    }else{
        left.emit('Share',shares);
    }
});
var data;
left.on(['Share','Moments'],function(edata){
    data = edata;
    for(var i in data.Share){
        data.Share[i].content = myUtil.cutStrLen(data.Share[i].content,200);
    }
});
router.get('/',function(req,res,next){
    console.log("user is session:")
    console.log(req.session.user);
    res.render('index',{
        title : "首页",
        moments : {
            title : "精彩瞬间",
            list : [
                {
                    _id : 1,
                    imgUrl : "images/p6big.jpg",
                    title : "这里是title1",
                    content : "这里是内容1"
                },
                {
                    _id : 2,
                    imgUrl : "images/p7big.jpg",
                    title : "这里是title2",
                    content : "这里是内容2"
                },
                {
                    _id : 3,
                    imgUrl : "images/p7big.jpg",
                    title : "这里是title3",
                    content : "这里是内容3"
                },
                {
                    _id : 4,
                    imgUrl : "images/p7big.jpg",
                    title : "这里是title4",
                    content : "这里是内容4"
                },
            ]
        },
        share : {
            title : "经验分享",
            list : data.Share
        }
    });
});
router.get('/logout',function(req,res,next){
    delete req.session.user;
    res.redirect('/');
});
module.exports = router;