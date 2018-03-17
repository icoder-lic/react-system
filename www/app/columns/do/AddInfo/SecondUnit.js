import React, { Component } from 'react';

import { Row, Col } from "antd";

import uploadfiles from "./utils/uploadfiles.js";

export default class SecondUnit extends Component {
    constructor() {
        super();
    }

    //上传DOM业务
    createFileReaderAndUpload(files) {
        var self = this;

        for (let i = 0; i < files.length; i++) {
            let $div = $(`<div class="preDiv"><em></em><i></i><b></b></div>`);
            let fr = new FileReader();
            fr.readAsDataURL(files[i]);
            fr.onload = function (e) {
                //实例化一个图片
                var image = new Image();
                image.src = e.currentTarget.result;
                //设置背景图片
                $div.css("background-image", `url(${image.src})`);
                //上树
                $(self.refs.imgbox).append($div);
            }
            //得到用户上传的filelist对象
            uploadfiles(
                files[i],
                function (pathname) {
                    //回调函数，pathname随机的文件名
                    //去掉自己的em和i
                    $div.find("em").remove();
                    $div.find("i").remove();
                    //写data-
                    $div.attr("data-pathname", pathname);
                },
                function (e) {
                    //上传过程中
                    $div.find("i").html(parseInt(e.loaded / e.total * 100) + "%");
                },
                "/uploadinfoimages"
            );
        }
    }


    //组件上树之后
    componentDidMount() {
        var self = this;

        //允许小图片移动
        $(this.refs.imgbox).sortable();

        //关闭按钮b的事件监听
        $(this.refs.imgbox).delegate("b", "click", function () {
            //删除自己的父元素
            $(this).parents(".preDiv").remove();
        });

        //监听filectrl的onchange事件
        $(this.refs.filectrl).bind("change", function (e) {
            var files = $(this)[0].files;
            self.createFileReaderAndUpload(files);
        });

        //拖拽的一套事情
        $(this.refs.imgbox).bind("dragover", function (e) {
            e.preventDefault();
            $(this).addClass("cur");
        });

        $(this.refs.imgbox).bind("dragleave", function (e) {
            e.preventDefault();
            $(this).removeClass("cur");
        });

        $(this.refs.imgbox).bind("drop", function (e) {
            e.preventDefault();
            var files = e.originalEvent.dataTransfer.files;
            $(this).removeClass("cur");

            self.createFileReaderAndUpload(files);
        });
    }

    render() {
        return <div>
            <div className="hd">
                <Row>
                    <Col span={12}>
                        <h3>请添加{this.props.title}的图片</h3>
                    </Col>
                    <Col span={4}>
                        <div className="shangchuanniu" ref="shangchuanniu" onClick={() => {
                            $(this.refs.filectrl).trigger("click");
                        }}></div>
                        <input ref="filectrl" type="file" hidden multiple />
                    </Col>
                </Row>
            </div>

            <div ref="imgbox" className="imgbox" data-album={this.props.album}></div>
        </div>
    }
}
