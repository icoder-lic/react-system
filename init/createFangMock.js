var fs     = require("fs");
var path   = require("path");
//产生随机数据包
var Mock   = require("mockjs");
var Random = Mock.Random;

//得到房基数据.json文件的地址
var fromFangMockURL = path.resolve(__dirname, "./fromFangMock.json");
//准备写入的文件的地址
var toFangMockURL = path.resolve(__dirname, "./toFangMock.txt");
//图片地址
var infoimages_smallURL = path.resolve(__dirname, "../www/infoimages_small");



if (fs.existsSync(toFangMockURL)) {
	fs.unlinkSync(toFangMockURL);
}

console.log("即将开始写入新数据...");

//读取文件
fs.readFile(fromFangMockURL, function (err, content) {
	//读取文件，并且变为真实的对象
	var arr = JSON.parse(content.toString());
	//拓展
	for (var i = 0; i < arr.length; i++) {
		//随机增加一个属性【售价price】，单位万元
		arr[i].price = Random.integer(100, 2000);
		//随机增加一个属性【室】
		arr[i].room = Random.integer(1, 6);
		//随机增加一个属性【厅】
		arr[i].hall = Random.integer(0, 2);
		//随机增加一个属性【卫】
		arr[i].toilet = Random.integer(0, 2);
		//随机增加一个属性【平方】
		arr[i].sq = Random.integer(60, 300);
		//随机增加一个属性【朝向】
		arr[i].direction = Random.pick(["南北通透", "东西向", "朝南", "朝北", "朝东", "朝西"]);
		//随机增加一个属性【装修】
		arr[i].decoration = Random.pick(["毛坯", "简装修", "中装修", "精装修", "豪华装修"]);
		//随机增加一个属性【购买日期buydate】，注意是时间戳，我们随机了一个10年的数据
		arr[i].buydate = new Date() - Random.integer(0, 10 * 365 * 24 * 60 * 60 * 1000);
		//随机增加一个属性【几号楼】
		arr[i].build = Random.integer(1, 20);
		//随机增加一个属性【几单元】
		arr[i].unit = Random.integer(1, 8);
		//随机增加一个属性【门牌号】
		arr[i].door = Random.integer(100, 999);
		//随机增加一个属性【楼房类型】
		arr[i].type = Random.pick(["板楼", "塔楼"]);
		//随机增加一个属性【建筑时间】
		arr[i].builddate = new Date() - Random.integer(10, 20 * 365 * 24 * 60 * 60 * 1000);
		//随机增加一个属性【产权】
		arr[i].property = Random.pick(["个人产权", "其他产权"]);
		//随机增加一个属性【挂牌时间】
		arr[i].saledate = new Date() - Random.integer(0, 3 * 365 * 24 * 60 * 60 * 1000);
		//随机增加一个属性【简单介绍】
		arr[i].description = "房源亮点    1、南北通透板楼，精装修、复式结构    2、此房为南北向三室,177.23平米,房子为复式结构。    3、距离科怡路站直线距离348米,公交：小区西门---83路、694路、特7。小区南门---特9、740路。 ：9号线“科怡路”站            6、银行：小区内工商、建行、光大、兴业，邮储、农行、光大、中行。 商超：怡海绿源超市。          自我介绍 我是***置业顾问，从事房地产经纪行业多年。客户满意，是我的职业追求，我相信，拥有专业的知识及真诚的服务才能获得共赢";
		//随机增加一个属性【房主ID，ownerID】
		arr[i].ownerID = Random.integer(10000, 14999);
		//封面图
		arr[i].avatar = fs.readdirSync(`${infoimages_smallURL}/${arr[i].id}/inner`)[0];
		//图片信息
		arr[i].images = {
			"inner": fs.readdirSync(`${infoimages_smallURL}/${arr[i].id}/inner`),
			"layouts": fs.readdirSync(`${infoimages_smallURL}/${arr[i].id}/layouts`),
			"real": fs.readdirSync(`${infoimages_smallURL}/${arr[i].id}/real`),
			"other": fs.readdirSync(`${infoimages_smallURL}/${arr[i].id}/other`)
		}
		//写入最终生成的文件
		fs.appendFileSync(toFangMockURL, JSON.stringify(arr[i]) + "\r\n");
		(i + 1) % 10 == 0 && console.log("已经写入" + (i + 1) + "条数据...");
	}
	console.log("已经写入" + arr.length + "条新数据");
});