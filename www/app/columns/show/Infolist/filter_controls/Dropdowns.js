import React, { Component } from 'react';
import { connect } from "dva";

//获取楼层显示信息和厅视显示信息
import { getFloor, getRoom } from "./common";

import { Menu, Dropdown, Button, Icon, Row } from 'antd';

class Dropdowns extends Component {
    constructor() {
        super()
    }
    render() {
        const menu = (
            <Menu onClick={({ key }) => {
                if (this.props.propsname == "floor") {
                    var v = key.split(",").map(item => Number(item));
                } else {
                    var v = Number(key);
                }
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": this.props.propsname, value: v })
            }}>
                {
                    this.props.options.map(item => {
                        return <Menu.Item key={Object.values(item)[0]}>{Object.keys(item)[0]}</Menu.Item>
                    })
                }
            </Menu>
        );
        return (
            <div>
                <span>{this.props.title}:&nbsp;</span>
                <Dropdown.Button overlay={menu}>
                    {
                        (this.props.propsname == "room" && this.props.filters[this.props.propsname] != 0) ||
                            (this.props.propsname == "floor" && this.props.filters[this.props.propsname].length != 0)
                            ?
                            this.props.propsname == "room"
                                ?
                                getRoom(this.props.propsname, this.props.filters[this.props.propsname])
                                :
                                getFloor(this.props.propsname, this.props.filters[this.props.propsname])
                            :
                            `不限`
                    }
                </Dropdown.Button>
            </div>
        )
    }
}
export default connect(
    ({ infolist }) => ({
        filters: infolist.filters
    })
)(Dropdowns);