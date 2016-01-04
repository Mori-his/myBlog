/**
 * Created by Mori on 2015/11/27.
 */
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var port = process.env.PORT || 3100;
var app = express();
// routers
var router = require('./router');

app.set("views", __dirname + "/views/pages");  // 默认视图目录
app.set("view engine", 'jade');                            // 设置渲染模板引擎
app.locals.moment = require('moment');

app.listen(port);
console.log("video started on port " + port);


app.use(router);                                //router

// 捕捉404
app.use(function(req,res,next){
    var err = new Error('页面未找到');
    err.status = 404;
    next(err);
});
// 错误处理
// 开发环境错误处理程序
// 将error打印
if(app.get('env') === 'development'){
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
    app.use(function(err,req,res,next){
        res.status(err.status || 500);
        res.render('../error',{
            title: "ERROR",
            message : err.message,
            error : err
        });
    });
}
// 生产环境错误处理程序
// 错误信息不泄露给用户 no print
app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.render('../error',{
        title: "ERROR",
        message : err.message,
        error: {}
    });
})

module.exports = app;