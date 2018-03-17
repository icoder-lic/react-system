import * as R from "ramda";
import { fetchServer } from "./utils/server.js";

export default {
	namespace: "infolist",
	state: {
		"filters": {
			"decoration": [],
			"type": [],
			"elevator": "",
			"price": [0, 2000],
			"area": "",
			"region": "",
			"saledate": [],
			"buydate": [],
			"builddate": [],
			"room": 0,
			"floor": [],
			"sq": [0, 300],
			"property": "",
			"direction": []
		},
		"pageinfo": {
			"current": 1,
			"pageSize": 20
		},
		"sortinfo": {
			"sortby": "id",
			"sortdirection": 1
		},
		"infos": [],
		"count": 0
	},
	reducers: {
		//改变filter，会发来{propsname , value}，直接改变
		changeFilter_sync(state, { propsname, value }) {
			return R.set(R.lensProp("filters"), R.set(R.lensProp(propsname), value, state.filters), state);
		},
		changeInfos(state, { infos }) {
			return R.set(R.lensProp("infos"), infos, state);
		},
		changePage_sync(state, { current = state.pageinfo.current }) {
			return R.set(R.lensProp("pageinfo"), R.set(R.lensProp("current"), current, state.pageinfo), state);
		},
		changeSort_sync(state, { sortby, sortdirection }) {
			return R.set(R.lensProp("sortinfo"), { sortby, sortdirection }, state);
		},
		changePageSize_sync(state, { pageSize = state.pageinfo.pageSize }) {
			return R.set(R.lensProp("pageinfo"), R.set(R.lensProp("pageSize"), pageSize, state.pageinfo), state);
		},
		changeCount(state, { count }) {
			return R.set(R.lensProp("count"), count, state);
		}
	},
	effects: {
		//改变filter，会发来{propsname , value}，直接改变
		*changeFilter({ propsname, value }, { put, select, call }) {
			yield put({ "type": "changeFilter_sync", propsname, value });
			yield put({ "type": "changePage_sync", "current": 1 });
			//过滤
			var { filters, pageinfo, sortinfo } = yield select(data => data.infolist);
			var { results, count } = yield call(fetchServer, filters, pageinfo, sortinfo);
			//改变
			yield put({ "type": "changeInfos", "infos": results });
			yield put({ "type": "changeCount", count });
		},
		//初始化
		*init(action, { put, select, call }) {
			//得到当前的过滤情况
			var { filters, pageinfo, sortinfo } = yield select(data => data.infolist);
			var { results, count } = yield call(fetchServer, filters, pageinfo, sortinfo);
			//改变
			yield put({ "type": "changeInfos", "infos": results });
			yield put({ "type": "changeCount", count });
		},
		//改变分页
		*changePage({ current, pageSize }, { put, select, call }) {
			//要判断是否改变了每页多少条
			var { pageinfo } = yield select(data => data.infolist);
			//页码归一
			if (pageSize) {
				//如果pagesize存在
				current = pageSize != pageinfo.pageSize ? 1 : current;
			}
			yield put({ "type": "changePage_sync", current });
			yield put({ "type": "changePageSize_sync", pageSize });

			//得到当前的过滤情况
			var { filters, pageinfo, sortinfo } = yield select(data => data.infolist);
			var { results, count } = yield call(fetchServer, filters, pageinfo, sortinfo);
			//改变
			yield put({ "type": "changeInfos", "infos": results });
			yield put({ "type": "changeCount", count });
		},
		//改变排序
		*changeSort({ sortby, sortdirection }, { put, select, call }) {
			//排序改变要改变当前页
			yield put({ "type": "changePage_sync", current: 1 });
			yield put({ "type": "changeSort_sync", sortby, sortdirection });

			//得到当前的过滤情况
			var { filters, pageinfo, sortinfo } = yield select(data => data.infolist);
			var { results, count } = yield call(fetchServer, filters, pageinfo, sortinfo);
			//改变
			yield put({ "type": "changeInfos", "infos": results });
			yield put({ "type": "changeCount", count });
		}
	}
}