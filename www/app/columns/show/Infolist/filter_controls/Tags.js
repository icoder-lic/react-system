import React, { Component } from 'react';
import { connect } from "dva";

import { Tag } from 'antd';
import moment from "moment";
//获取楼层显示信息和厅视显示信息
import { getFloor, getRoom } from "./common";

class Tags extends Component {
    constructor() {
        super();
    }
    render() {
        const dictionary = {
            "decoration": "装修",
            "type": "建筑类型",
            "direction": "朝向",
            "elevator": "有无电梯",
            "price": "售价",
            "area": "区域",
            "region": "区域",
            "saledate": "挂牌日期",
            "buydate": "购买日期",
            "builddate": "建筑日期",
            "room": "户型",
            "floor": "楼层",
            "sq": "面积",
            "property": "产权"
        }

        const getTag = (item) => {
            if (item == "price") {
                return this.props.filters[item].map(i => `${i}万元`).join("至");
            } else if (item == "sq") {
                return this.props.filters[item].map(i => `${i}平方`).join("至");
            } else if (item == "saledate" || item == "buydate" || item == "builddate") {
                return this.props.filters[item].map(i => moment(i).format("YYYY-MM-DD")).join("至");
            } else if (item == "area" || item == "region" || item == "elevator" || item == "property") {
                return this.props.filters[item];
            } else if (item == "room") {
                return getRoom(item, this.props.filters[item]);
            } else if (item == "floor") {
                return getFloor(item, this.props.filters[item]);
            } else {
                return this.props.filters[item].join("或");
            }
        }
        const close = (item) => {
            if (item == "price") {
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": item, value: [0, 2000] })
            } else if (item == "sq") {
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": item, value: [0, 300] })
            } else if (item == "area") {
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": "area", value: "" })
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": "region", value: "" })
            } else if (item == "region" || item == "elevator" || item == "property") {
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": item, value: "" })
            } else {
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": item, value: [] })
            }
        }
        return (
            <div>
                {
                    Object.keys(this.props.filters).map(item => {
                        if (this.props.filters[item].length > 0 || (item == "room" && this.props.filters[item] != 0)) {
                            if ((item == "price" && this.props.filters[item][0] == 0 && this.props.filters[item][1] == 2000) ||
                                (item == "sq" && this.props.filters[item][0] == 0 && this.props.filters[item][1] == 300)
                            ) {
                                return null;
                            }

                            return <Tag
                                key={item}
                                closable
                                onClose={
                                    (e) => {
                                        e.preventDefault();
                                        close(item)
                                    }
                                }
                            >
                                {dictionary[item]} ：
                                                {
                                    getTag(item)
                                }
                            </Tag>
                        } else {
                            return null
                        }
                    })
                }
            </div>
        )
    }
}
export default connect(
    ({ infolist }) => ({
        filters: infolist.filters
    })
)(Tags);