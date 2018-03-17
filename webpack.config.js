const path = require('path');

module.exports = {
	entry: "./www/app/main", 		//入口文件
	output: {
		path: path.resolve(__dirname, "www/dist"),  //出口文件的路径
		filename: "bundle.js" 						//出口文件的文件名
	},
	watch : true,
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "www/app")
				],
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				loader: "babel-loader",
				options: {
					  presets: ["env","react"],
					  plugins: [
						  "transform-runtime",
						  "transform-object-rest-spread",
						//！！！！！！实现antd按需加载☆☆☆☆☆☆☆！！！！！！！！
						["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
					  ]
        		}
			},
			{
				test : /\.less$/,
				// exclude: [
				// 	path.resolve(__dirname, "node_modules")
				// ],
				// include: [
				// 	path.resolve(__dirname, "www/app"),
				// 	path.resolve(__dirname, "node_modules/antd")
				// ],
				
				use: [
					{
	                	loader: "style-loader" // creates style nodes from JS strings
	            	}, 
	            	{
	                	loader: "css-loader" // translates CSS into CommonJS
	            	}, 
	            	{
						loader: "less-loader", // compiles Less to CSS
						options: {
							//！！！！！☆☆☆☆设置antd的主题☆☆☆☆！！！！！
                            "modifyVars":{ "@primary-color": "#FFB035"  }
                        }
	            	}
            	]
			}
		]
	}
}