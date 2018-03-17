import * as R from "ramda";

export default {
	namespace: "picshow",
	state: {
		nowid: 170000001,
		nowalbum: "inner",
		nowidx: 0,
		info: {},
		infolike: []
	},
	reducers: {
		//改变info
		changeId(state, action) {
			return R.set(R.lensProp("nowid"), action.nowid, state);
		},
		//改变album
		changeNowalbum(state, action) {
			return R.set(R.lensProp("nowalbum"), action.nowalbum, state);
		},
		//改变nowidx
		changeNowidx(state, action) {
			return R.set(R.lensProp("nowidx"), action.nowidx, state);
		},
		//改变info
		changeInfo(state, action) {
			return R.set(R.lensProp("info"), action.info, state);
		},
		//改变infolike
		changeInfolike(state, action) {
			return R.set(R.lensProp("infolike"), action.infolike, state);
		}
	},
	effects: {
		//初始化
		*init(action, { put, call, select }) {
			//改变nowid，根据acation携带的载荷改变nowid
			yield put({ "type": "changeId", "nowid": action.nowid });
			//发出请求，请求信息
			const { result } = yield fetch("/info/" + action.nowid).then(data => data.json());
			//改变info
			yield put({ "type": "changeInfo", "info": result });
			//发出请求，请求相似信息
			const { results } = yield fetch("/infolike/" + action.nowid).then(data => data.json());
			//改变infolike
			yield put({ "type": "changeInfolike", "infolike": results });
			//改变nowalbume
			yield put({ "type": "changeNowalbum", "nowalbum": "inner" });
			//改变nowidx
			yield put({ "type": "changeNowidx", "nowidx": 0 });
		},
		//改变相册
		*changealbum(action, { put, call, select }) {
			//改变相册
			yield put({ "type": "changeNowalbum", "nowalbum": action.nowalbum });
			//将序号归0
			yield put({ "type": "changeNowidx", "nowidx": 0 });
		},
		//下一张
		*goNext(action, { put, call, select }) {
			//先得到idx
			const { nowidx } = yield select(state => state.picshow);
			//得到nowalbum
			const { nowalbum } = yield select(state => state.picshow);
			//得到images
			const { info: { images } } = yield select(state => state.picshow);
			//判断是不是到这个图集的头了
			if (nowidx < images[nowalbum].length - 1) {
				//没有到头，加1
				yield put({ "type": "changeNowidx", "nowidx": nowidx + 1 });
			} else {
				//图集顺序
				const albumarr = ["inner", "layouts", "real", "other"];
				//现在的图集在数组中的位置
				var _now = albumarr.indexOf(nowalbum);
				//让这个数字加1
				_now++;
				//改变相册
				yield put({ "type": "changeNowalbum", "nowalbum": albumarr[_now % 4] });
				//将序号归0
				yield put({ "type": "changeNowidx", "nowidx": 0 });
			}
		},
		//上一张
		*goPrev(action, { put, call, select }) {
			//先得到idx
			const { nowidx } = yield select(state => state.picshow);
			//得到nowalbum
			const { nowalbum } = yield select(state => state.picshow);
			//得到images
			const { info: { images } } = yield select(state => state.picshow);
			//判断是不是到这个图集的头了
			if (nowidx > 0) {
				//没有到头，加1
				yield put({ "type": "changeNowidx", "nowidx": nowidx - 1 });
			} else {
				//图集顺序
				const albumarr = ["inner", "layouts", "real", "other"];
				//现在的图集在数组中的位置
				var _now = albumarr.indexOf(nowalbum);
				//让这个数字加1
				_now--;
				if (_now == -1) {
					_now = 3;
				}
				//改变相册
				yield put({ "type": "changeNowalbum", "nowalbum": albumarr[_now] });
				//将序号归0
				yield put({ "type": "changeNowidx", "nowidx": images[albumarr[_now]].length - 1 });
			}
		}
	}
}