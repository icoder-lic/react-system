var express = require("express");
var mongoose = require("mongoose");

//数据库
mongoose.connect("mongodb://localhost/fsystem", { useMongoClient: true });
//引入控制器
var infoCtrl = require("./controllers/infoCtrl.js");
var areaCtrl = require("./controllers/areaCtrl.js");
//引入mongoose的model文件
var Info = require("./models/Info.js");

//创建express的app
var app = express();

//区域数据
app.get("/areas", areaCtrl.areas);
//查询某一个id的信息
app.get("/info/:id", infoCtrl.getinfo);
//查询相似
app.get("/infolike/:id", infoCtrl.infolike);
//接口，查询
app.post("/infosearch", infoCtrl.infosearch);
//上传图片
app.post("/uploadinfoimages", infoCtrl.uploadinfoimages);
//上传资料
app.post("/uploadfiles", infoCtrl.uploadfiles);
//添加
app.post("/addinfo", infoCtrl.addinfo);

//静态
app.use(express.static("www"));

//监听
app.listen(8080);
console.log("项目运行在8080端口");