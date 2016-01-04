/**
 * Created by Mori on 2015/12/4.
 */
var express = require('express');
var router = express.Router();
var Eventr = require('eventr');
var myUtil = require('../libs/util/util');
var left = new Eventr();

var Share = require('../models/share');

Share.fetch(function(err,shares){
    if(err){
        console.log(err);
    }else{
        left.emit("share",shares);
    }
})
var data;
left.on(['share'],function(edata){
   data = edata;
});

router.get('/articleList',function(req,res){
    var _data = data;
    for(var i=0;i<_data.length;i++){
        _data[i].content = myUtil.cutStrLen(_data[i].content,150);
    }
    console.log(_data.title);
    res.render('articlelist',{
        title: "经验积累",
        share: {
            list: _data
        }
    })
});


module.exports = router;