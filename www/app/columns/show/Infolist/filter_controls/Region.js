import React, { Component } from 'react';
import { connect } from "dva";
import cn from "classnames";

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Region extends Component {
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
        if (!this.props.filters.area) return null;
        return (
            <div className="region">
                <Tabs>
                    {
                        this.state.options[this.props.filters.area].map((item) => {
                            var k = Object.keys(item)[0];
                            var v = Object.values(item)[0];
                            return <TabPane tab={k} key={k}>{
                                v.map((i, k) => {
                                    return <em
                                        key={k}
                                        onClick={() => {
                                            this.props.dispatch({
                                                "type": "infolist/changeFilter",
                                                "propsname": "region",
                                                "value": i
                                            })
                                        }}
                                        className={cn({ "cur": this.props.filters.region == i })}
                                    >
                                        {i}
                                    </em>
                                })
                            }</TabPane>
                        })
                    }

                </Tabs>
            </div>
        )
    }
}
export default connect(
    ({ infolist }) => ({
        filters: infolist.filters
    })
)(Region);