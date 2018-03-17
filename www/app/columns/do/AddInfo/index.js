import React, { Component } from 'react';
import { connect } from "dva";

import { Steps, Button, message, Row, Col } from 'antd';
const Step = Steps.Step;

//步骤组件
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

import "./index.less";

import Do from "../../../containers/Do.js";

class AddInfo extends Component {
    constructor() {
        super()
        this.state = {
            current: 0,
        };
    }
    render() {
        const steps = [{
            title: '基本信息',
            description: '售价面积等基本信息',
            content: <FirstStep></FirstStep>
        }, {
            title: '图片',
            description: '户型图室内图等',
            content: <SecondStep></SecondStep>
        }, {
            title: '附件',
            description: '房本合同房主信息等',
            content: <ThirdStep></ThirdStep>
        }];
        const { current } = this.state;
        //验证第一步的按钮是否可用
        const checkStep1Disabled = () => {
            var step1 = this.props.step1;
            var noerror = true;
            for (var k in step1) {
                if (step1[k].errors != undefined) {
                    noerror = false;
                }
            }
            return !noerror;
        }
        const showButton = () => {
            if (current == 0) {
                return <Button
                    type="primary"
                    disabled={checkStep1Disabled()}
                    onClick={() => {
                        this.setState({ "current": 1 })
                    }}
                >
                    下一步
                </Button>
            } else if (current == 1) {
                return <Button
                    type="primary"
                    onClick={() => {
                        var inner = [];
                        $(".imgbox[data-album=inner]").find("div.preDiv").each(function () {
                            inner.push($(this).data("pathname"));
                        });
                        var layouts = [];
                        $(".imgbox[data-album=layouts]").find("div.preDiv").each(function () {
                            layouts.push($(this).data("pathname"));
                        });
                        var real = [];
                        $(".imgbox[data-album=real]").find("div.preDiv").each(function () {
                            real.push($(this).data("pathname"));
                        });
                        var other = [];
                        $(".imgbox[data-album=other]").find("div.preDiv").each(function () {
                            other.push($(this).data("pathname"));
                        });

                        if (inner.length * layouts.length * real.length * other.length == 0) {
                            alert("请上传所有图集！");
                            return;
                        }

                        var obj = {
                            inner, layouts, real, other
                        }

                        //改变全局
                        this.props.dispatch({ "type": "addinfo/changeStep2", obj });

                        //前往步骤3
                        this.setState({ "current": 2 });
                    }}
                >
                    下一步
                </Button>
            } else if (this.state.current == 2) {
                return <Button
                    type="primary"
                    onClick={() => {
                        this.props.dispatch({ "type": "addinfo/addinfo" });
                    }}
                >
                    提交
                </Button>
            }
        }
        return (
            <Do k="addinfo" c="添加数据">
                <div>
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} description={item.description} />)}
                    </Steps>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                    <div className="steps-action">
                        {
                            showButton()
                        }
                    </div>
                </div>
            </Do>
        )
    }
}
export default connect(
    ({ addinfo }) => ({
        step1: addinfo.step1
    })
)(AddInfo);