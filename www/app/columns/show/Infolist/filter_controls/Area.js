import React, { Component } from 'react';
import { connect } from "dva";
import cn from "classnames";

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Area extends Component {
    constructor() {
        super()
        this.state = {
            options: {}
        }

        //拉取接口
        this.loadServer((result) => {
            // console.log(result);
            this.setState({ options: result })
        });
    }
    async loadServer(callback) {
        const result = await fetch("/areas").then((data) => data.json());
        callback(result);
    }
    render() {

        return (
            <div className="area">
                {
                    Object.keys(this.state.options).map(item => {
                        return <a
                            key={item}
                            className={cn({ "cur": this.props.filters.area == item })}
                            onClick={() => {
                                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": "area", value: item })
                                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": "region", value: "" })
                            }}
                        >{item}</a>
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
)(Area);