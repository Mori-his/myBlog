/**
 * Created by Mori on 2015/12/30.
 */
var express = require('express');
var router = express.Router();
var Eventr = require('eventr');

var Share = require('../models/share');

router.get('/articleInfo/:id',function(req,res){
    var id = req.params.id;
    Share.fetchById(id, function(err,shares){
        if(err){
            console.log(err);
        }
        //console.log(shares);
        res.render('articleinfo',{
            data: shares
        });
    })
});

module.exports = router;