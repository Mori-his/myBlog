/**
 * Created by Mori on 2015/12/1.
 */
var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoStore = require('connect-mongo')(session);



var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost/blog";
mongoose.connect(dbUrl);            // 连接数据库


router.use(bodyParser.urlencoded({extended: true}));          // urlEncoding
router.use(bodyParser.json());                                 // application/json
router.use(express.static(path.join(__dirname, 'public'))); // 设置静态文件目录


router.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "blog",
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));



var index = require('./routers/index');
var signup = require('./routers/signup');
var signin = require('./routers/signin');
var userList = require('./routers/userlist');
var createShare = require('./routers/createshare');
var createMoments = require('./routers/createmoments');
var articleList = require('./routers/articlelist');
var articleInfo = require('./routers/articleinfo');


router.all('*',function(req,res,next){
    var _user = req.session.user;
    if(_user){
        res.locals.user = _user;
    }
    res.locals.currentUrl = req.originalUrl;
    next();
});
router.use(function(req,res,next){
    var _user = req.session.user,
        _url = req.originalUrl;
    var permissions = {
        signin: "/admin/signin",
        signuo: "/admin/signup",
        admin: "/admin/"
    };
    if(!_user){
        if(_url.indexOf(permissions.admin) !== -1 && _url.indexOf(permissions.signin) === -1 && _url.indexOf(permissions.signuo) === -1){
            return res.redirect('/');
        }
    }
    next();
})
router.use('/',
    index,
    signup,
    signin,
    userList,
    createShare,
    createMoments,
    articleList,
    articleInfo
);

module.exports = router;