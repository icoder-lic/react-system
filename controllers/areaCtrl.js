exports.areas = function (req, res) {
	res.json({
		"朝阳": [
			{ "A": ["安贞", "奥林匹克公园"] },
			{ "B": ["百子湾", "北工大", "北沙滩", "北苑"] }
		],
		"海淀": [
			{ "A": ["安宁庄"] },
			{ "B": ["八里庄", "北京大学", "北太平庄", "二里庄"] }
		],
		"丰台": [
			{ "B": ["北大地"] },
			{ "C": ["草桥", "成寿寺"] },
			{ "S": ["宋家庄"] }
		],
		"东城": [
			{ "C": ["崇文门"] },
			{ "D": ["东四十条"] },
			{ "Y": ["永定门"] }
		],
		"西城": [
			{ "X": ["西直门"] }
		],
		"石景山": [
			{ "B": ["八角"] },
			{ "P": ["苹果园"] }
		],
		"昌平": [
			{ "L": ["立水桥"] }
		],
		"大兴": [
			{ "Y": ["亦庄"] }
		],
		"通州": [
			{ "B": ["北关"] }
		],
		"顺义": [
			{ "H": ["后沙峪"] }
		],
		"房山": [
			{ "C": ["长阳"] }
		],
		"密云": [
			{ "B": ["宾阳"] }
		]
	});
}