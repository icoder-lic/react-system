import React from "react";
import dva from "dva";
import logger from "redux-logger";

import router from "./router";

//引入模型
import infolist from "./models/infolist.js";
import addinfo from "./models/addinfo.js";
import picshow from "./models/picshow.js";

//创建dva的app对象
const app = dva({
	onAction: logger
});

//注册模型
app.model(infolist);
app.model(addinfo);
app.model(picshow);

// const router = () => <App></App>;
//设置路由
app.router(router);

app.start("#app");