import React, { Component } from 'react';
import { connect } from "dva";

//引入筛选组件
import FilterBox from "./FilterBox";
//引入表格组件
import TableBox from "./TableBox";

import PicShow from "../Picshow";

import "./index.less";

import Show from "../../../containers/Show.js";

class InfoList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type": "infolist/init" })
        this.state = {
            xuanfuId: 0, 			//悬浮层显示的id
            isShowXuanfu: false //是否显示悬浮层
        }
    }
    //设置悬浮层的id
    setXuanfu(xuanfuId, isShowXuanfu) {
        this.setState({ xuanfuId, isShowXuanfu });
    }
    render() {
        return (
            <Show k="infolist" c="大表筛选">
                <div>
                    <FilterBox></FilterBox>
                    <TableBox setXuanfu={this.setXuanfu.bind(this)} ></TableBox>
                    {
                        this.state.isShowXuanfu
                            ?
                            <div className="xuanfu">
                                <div className="inner_ccc">
                                    <div
                                        className="closeBtn"
                                        onClick={() => {
                                            this.setState({ isShowXuanfu: false })
                                        }}
                                    >
                                        ×
									</div>
                                    <PicShow id={this.state.xuanfuId}></PicShow>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </Show>
        )
    }
}
export default connect()(InfoList)