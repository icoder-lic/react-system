import React, { Component } from 'react';

import { Card, Col, Row, Button, Modal, Progress } from 'antd';
import uploadfiles from "./utils/uploadfiles.js";
import { connect } from "dva";

import ThirdBar from "./ThirdBar";
import ThirdFile from "./ThirdFile";
import ThirdCmm from "./ThirdCmm";

class ThirdStep extends Component {
    constructor() {
        super();

        this.state = {
            isShowModal: false,
            isShowcmm: false,
            nowUpfiles: [

            ],
            nowcmmfilename: ""
        }
    }

    //显示重命名
    changeisShowcmm(isShowcmm, nowcmmfilename) {
        this.setState({
            isShowcmm
        });

        this.setState({
            nowcmmfilename
        })
    }

    //改名
    changefilename(filename, changedfilename) {
        this.setState({
            "nowUpfiles": this.state.nowUpfiles.map(item => item.filename == filename ? { ...item, changedfilename } : item)
        })
    }

    //组件已经上树
    componentDidMount() {
        var self = this;
        //监听filectrl
        $(this.refs.filectrl).bind("change", function () {
            //文件队列
            var files = $(this)[0].files;
            //变为数组
            files = [...files];

            var arr = files.map(item => ({
                "filename": item.name,
                "changedfilename": item.name,
                "progress": 0
            }));

            self.setState({ nowUpfiles: arr });

            //执行上传
            for (let i = 0; i < files.length; i++) {
                let filename = files[i].name;

                uploadfiles(
                    files[i],
                    function (realpath) {
                        //完成
                        //改变state，添加一个realpath
                        self.setState({
                            "nowUpfiles": self.state.nowUpfiles.map(item => {
                                if (item.filename == filename) {
                                    return {
                                        ...item,
                                        realpath
                                    }
                                }
                                return item;
                            })
                        })
                    },
                    function (e) {
                        //进度
                        var progress = parseInt(e.loaded / e.total * 100);
                        //设置state
                        self.setState({
                            "nowUpfiles": self.state.nowUpfiles.map(item => {
                                if (item.filename == filename) {
                                    return {
                                        ...item,
                                        progress
                                    }
                                }
                                return item;
                            })
                        })
                    },
                    "/uploadfiles"
                );
            }
            //弹出模态框
            self.setState({ isShowModal: true });
        })
    }

    render() {
        return <div>
            <div className="hd">
                <h3>必备资料文件</h3>
                <Button type="primary" onClick={() => {
                    $(this.refs.filectrl).trigger("click");
                }}>上传</Button>
                <input type="file" hidden multiple ref="filectrl" />
            </div>

            {/* 罗列已经上传的文件 */}
            <div className="filebox">
                {
                    this.props.files.map((item, index) => {
                        return <ThirdFile
                            key={index}
                            item={item}
                            changeisShowcmm={this.changeisShowcmm.bind(this)}
                        ></ThirdFile>
                    })
                }
            </div>

            <Modal
                title="上传"
                visible={this.state.isShowModal}
                onOk={() => {
                    //发出dispatch
                    this.props.dispatch({ "type": "addinfo/changeStep3", "arr": this.state.nowUpfiles })
                    this.setState({
                        isShowModal: false
                    })
                }}
                onCancel={() => {
                    this.setState({
                        isShowModal: false
                    })
                }}
                width={600}
                destroyOnClose={true}
            >
                {
                    this.state.nowUpfiles.map((item, index) => {
                        return <ThirdBar
                            key={index}
                            item={item}
                            changefilename={this.changefilename.bind(this)}
                        ></ThirdBar>
                    })
                }
            </Modal>

            <Modal
                title="重命名"
                visible={this.state.isShowcmm}
                onOk={() => {
                    this.setState({
                        isShowcmm: true
                    })
                }}
                onCancel={() => {
                    this.setState({
                        isShowcmm: false
                    })
                }}
                width={600}
                destroyOnClose={true}
            >
                <ThirdCmm
                    changefilename={this.changefilename.bind(this)}
                    item={this.props.files.filter(item => item.filename == this.state.nowcmmfilename)[0]}
                ></ThirdCmm>
            </Modal>
        </div>
    }
}

export default connect(
    ({ addinfo }) => ({
        files: addinfo.step3.files
    })
)(ThirdStep);
