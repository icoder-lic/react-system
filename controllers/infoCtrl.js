var path = require("path");
var url = require("url");
var fs = require("fs");
var gm = require("gm");
var formidable = require("formidable");
//引入mongoose的model文件
var Info = require("../models/Info.js");

exports.getinfo = function (req, res) {
	//得到:id的值
	var id = req.params.id;
	//查询数据库
	Info.find({ id }).exec((err, results) => {
		res.json({ "result": results[0] })
	});
}

//显示相似
exports.infolike = function (req, res) {
	//得到:id的值
	var id = req.params.id;
	Info.find({ id }).exec((err, results) => {
		var area   = results[0].area;
		var region = results[0].region;
		//继续查询
		Info.find({ area, region }).exec((err, results) => {
			res.json({ results });
		});
	});
}

//查询
exports.infosearch = function (req, res) {
	//fomidable语法
	var form = new formidable.IncomingForm();
	form.parse(req, (err, { filters, pageinfo, sortinfo }) => {
		//查询对象
		var search = {};
		//查询体
		for (var k in filters) {
			if (k == "decoration" || k == "type" || k == "direction" || k == "area" || k == "region" || k == "elevator" || k == "property") {
				if (filters[k].length != 0) {
					search[k] = filters[k];
				}
			} else if (k == "room") {
				if (filters[k] != 0) {
					search[k] = filters[k];
				}
			} else if (k == "price" || k == "saledate" || k == "buydate" || k == "builddate" || k == "floor" || k == "sq") {
				if (filters[k].length != 0) {
					search[k] = { "$gte": Number(filters[k][0]), "$lte": Number(filters[k][1]) };
				}
			}
		}
		//分页信息
		const { pageSize, current } = pageinfo;
		//排序信息
		const { sortby, sortdirection } = sortinfo;
		//进行查询
		Info.count(search, (err, count) => {
			//进行查询
			Info.find(search).sort({ [sortby]: sortdirection }).skip(pageSize * (current - 1)).limit(pageSize).exec((err, docs) => {
				res.json({
					"count": count, 	//数量
					"results": docs 	//结果
				})
			});
		});
	});
}

//上传图片
exports.uploadinfoimages = function (req, res) {
	var form = new formidable.IncomingForm();
	//上传文件夹
	form.uploadDir = path.resolve(__dirname, "../www/uploads");
	//保留拓展名
	form.keepExtensions = true;
	form.parse(req, function (err, content, files) {
		if (!files) return;
		//图片上传后会被随机改名
		//所以我们要用path.parse()来得到最重要的文件名部分
		res.send(path.parse(files.file.path).base);
	});
}

//上传资料
exports.uploadfiles = function (req, res) {
	var form = new formidable.IncomingForm();
	//上传文件夹
	form.uploadDir = path.resolve(__dirname, "../www/uploads");
	//保留拓展名
	form.keepExtensions = true;
	form.parse(req, function (err, content, files) {
		if (!files) return;
		res.send(path.parse(files.file.path).name);
	});
}


//添加
exports.addinfo = function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, { step1, step2, step3 }, files) {
		var title = step1.title.value;
		var area = step1.area.value[1];
		var region = step1.area.value[2];
		var decoration = step1.decoration.value;
		var direction = step1.direction.value;
		var type = step1.type.value;
		var property = step1.property.value;
		var elevator = step1.elevator.value;
		var floor = Number(step1.floor.value);
		var totalFloor = Number(step1.totalFloor.value);
		var room = Number(step1.room.value);
		var hall = Number(step1.hall.value);
		var toilet = Number(step1.toilet.value);
		var price = Number(step1.price.value);
		var sq = Number(step1.sq.value);
		var buydate = Date.parse(step1.buydate.value);
		var builddate = Date.parse(step1.builddate.value);
		var saledate = Date.parse(step1.saledate.value);
		var images = step2;
		var files = step3;


		//决定ID
		Info.find({}).sort({ "id": -1 }).limit(1).exec((err, docs) => {
			var id = docs[0].id + 1;

			//创建文件夹
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages/" + id));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages_small/" + id));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages/" + id + "/inner"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages/" + id + "/layouts"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages/" + id + "/real"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages/" + id + "/other"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages_small/" + id + "/inner"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages_small/" + id + "/layouts"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages_small/" + id + "/real"));
			fs.mkdirSync(path.resolve(__dirname, "../www/infoimages_small/" + id + "/other"));
			console.log(images);
			//移动文件
			for (let i = 0; i < images.inner.length; i++) {
				fs.renameSync(
					path.resolve(__dirname, "../www/uploads/" + images.inner[i]),
					path.resolve(__dirname, "../www/infoimages/" + id + "/inner/" + images.inner[i])
				);
				//改变为小图
				gm(path.resolve(__dirname, "../www/infoimages/" + id + "/inner/" + images.inner[i]))
					.resize(150, 100)
					.write(path.resolve(__dirname, "../www/infoimages_small/" + id + "/inner/" + images.inner[i]), function () {

					})
			}
			for (let i = 0; i < images.layouts.length; i++) {
				fs.renameSync(
					path.resolve(__dirname, "../www/uploads/" + images.layouts[i]),
					path.resolve(__dirname, "../www/infoimages/" + id + "/layouts/" + images.layouts[i])
				);
				//改变为小图
				gm(path.resolve(__dirname, "../www/infoimages/" + id + "/layouts/" + images.layouts[i]))
					.resize(150, 100)
					.write(path.resolve(__dirname, "../www/infoimages_small/" + id + "/layouts/" + images.layouts[i]), function () {

					})
			}
			for (let i = 0; i < images.real.length; i++) {
				fs.renameSync(
					path.resolve(__dirname, "../www/uploads/" + images.real[i]),
					path.resolve(__dirname, "../www/infoimages/" + id + "/real/" + images.real[i])
				);
				//改变为小图
				gm(path.resolve(__dirname, "../www/infoimages/" + id + "/real/" + images.real[i]))
					.resize(150, 100)
					.write(path.resolve(__dirname, "../www/infoimages_small/" + id + "/real/" + images.real[i]), function () {

					})
			}
			for (let i = 0; i < images.other.length; i++) {
				fs.renameSync(
					path.resolve(__dirname, "../www/uploads/" + images.other[i]),
					path.resolve(__dirname, "../www/infoimages/" + id + "/other/" + images.other[i])
				);
				//改变为小图
				gm(path.resolve(__dirname, "../www/infoimages/" + id + "/other/" + images.other[i]))
					.resize(150, 100)
					.write(path.resolve(__dirname, "../www/infoimages_small/" + id + "/other/" + images.other[i]), function () {

					})
			}
			var obj = {
				id,
				title,
				area,
				region,
				decoration,
				direction,
				type,
				property,
				elevator,
				floor,
				totalFloor,
				room,
				hall,
				toilet,
				price,
				sq,
				buydate,
				builddate,
				saledate,
				images,
				files
			}


			Info.create(obj, function () {
				console.log("ok");
				res.send("ok");
			});
		});
	});
}