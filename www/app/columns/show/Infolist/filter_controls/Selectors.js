import React, { Component } from 'react';
import { connect } from "dva";

import { Menu, Dropdown, Button, Icon, Row } from 'antd';

class Selectors extends Component {
    constructor() {
        super()
    }
    render() {
        const menu = (
            <Menu onClick={({ key }) => {
                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": this.props.propsname, value: key })
            }}>
                {
                    this.props.options.map(item => {
                        return <Menu.Item key={item}>{item}</Menu.Item>
                    })
                }
            </Menu>
        );
        return (
            <div>
                <span>{this.props.title}:&nbsp;</span>
                <Dropdown.Button overlay={menu}>
                    {
                        (this.props.filters[this.props.propsname])
                            ?
                            this.props.filters[this.props.propsname]
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
)(Selectors);