import React, { Component } from 'react';
import { connect } from "dva";

import { Form } from "antd";
import FirstForm from "./FirstForm";

class FirstStep extends Component {
    constructor() {
        super();
        this.state = {
            areasOptions: []
        }
    }
    componentDidMount() {
        this.getAreas((areas) => {

            var areasOptions = [];
            //进行形式转换
            for (var k in areas) {
                areasOptions.push({
                    value: k,
                    label: k,
                    children: areas[k].map(item => ({
                        value: Object.keys(item)[0],
                        label: Object.keys(item)[0],
                        children: Object.values(item)[0].map(item => ({
                            value: item,
                            label: item
                        }))
                    }))
                })
            }
            this.setState({
                areasOptions
            })
        });
    }

    async getAreas(callback) {
        const areas = await fetch("/areas").then(data => data.json());
        callback(areas)
    }

    render() {
        //创建表格的包装组件
        const WrappedRegistrationForm = Form.create({
            onFieldsChange: (props, fields) => {
                this.props.dispatch({ "type": "addinfo/changeStep1", "propname": Object.keys(fields)[0], "value": Object.values(fields)[0] })
            }
        })(FirstForm);

        return <div>
            <h1>
                <WrappedRegistrationForm
                    areasOptions={this.state.areasOptions}
                ></WrappedRegistrationForm>
            </h1>
        </div>
    }
}
export default connect()(FirstStep);