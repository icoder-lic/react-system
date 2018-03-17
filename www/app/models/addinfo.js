import * as R from "ramda";
import { fetchServer } from "./utils/server.js";

export default {
    namespace: "addinfo",
    state: {
        step1: {
            title: { value: "", errors: [] },
            area: { value: "", errors: [] },
            decoration: { value: "", errors: [] },
            direction: { value: "", errors: [] },
            type: { value: "", errors: [] },
            property: { value: "", errors: [] },
            elevator: { value: "", errors: [] },
            floor: { value: "", errors: [] },
            totalFloor: { value: "", errors: [] },
            room: { value: "", errors: [] },
            hall: { value: "", errors: [] },
            toilet: { value: "", errors: [] },
            price: { value: "", errors: [] },
            sq: { value: "", errors: [] },
            buydate: { value: "", errors: [] },
            builddate: { value: "", errors: [] },
            saledate: { value: "", errors: [] }
        },
        step2: {
            inner: [],
            layouts: [],
            real: [],
            other: []
        },
        step3: {
            files: []
        }
    },
    reducers: {
        changeStep1(state, { propname, value }) {
            return R.set(R.lensProp("step1"), R.set(R.lensProp(propname), value, state.step1), state);
        },
        changeStep2(state, { obj }) {
            return R.set(R.lensProp("step2"), obj, state);
        },
        changeStep3(state, { arr }) {
            //深克隆
            var files = R.clone(state.step3.files);
            files = files.concat(arr);
            return R.set(R.lensProp("step3"), R.set(R.lensProp("files"), files, state.step3), state);
        },
        changeStep3OneFileName(state, { filename, changedfilename }) {
            return R.set(R.lensProp("step3"), R.set(R.lensProp("files"), state.step3.files.map(item => {
                if (item.filename == filename) {
                    return {
                        ...item,
                        changedfilename
                    }
                }
                return item
            }), state.step3), state);
        }
    },
    effects: {
        *addinfo(action, { put, select }) {
            const { step1, step2, step3 } = yield select(state => state.addinfo);
            yield fetch("/addinfo", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    step1,
                    step2,
                    step3
                })
            });
        }
    }
}