import React, { Component } from 'react';
import { Row, Col } from "antd";

//区域组件
import Area from "./filter_controls/Area";
import Region from "./filter_controls/Region";
//复选框组件
import CheckBoxs from "./filter_controls/CheckBoxs";
//售价滑动条
import PriceRange from "./filter_controls/PriceRange";
import Ranges from "./filter_controls/Ranges";
//选择日期组件
import DateCheck from "./filter_controls/DateCheck";
//下拉菜单
import Dropdowns from "./filter_controls/Dropdowns";
import Selectors from "./filter_controls/Selectors";
//标签组件
import Tags from "./filter_controls/Tags";

export default class FilterBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Row className="row1">
                    <Col span="3">
                        区域 ：
                    </Col>
                    <Col span="21">
                        <Area></Area>
                    </Col>
                </Row>
                <Row className="region">
                    <Col span="3">

                    </Col>
                    <Col span="21">
                        <Region></Region>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        装修 ：
                    </Col>
                    <Col span="21">
                        <CheckBoxs
                            options={['毛坯', '简装修', '中装修', '精装修', '豪华装修']}
                            propsname="decoration"
                        ></CheckBoxs>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        朝向 ：
                    </Col>
                    <Col span="21">
                        <CheckBoxs
                            options={["南北通透", "东西向", "朝南", "朝北", "朝东", "朝西"]}
                            propsname="direction"
                        ></CheckBoxs>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        建筑类型 ：
                    </Col>
                    <Col span="21">
                        <CheckBoxs
                            options={['板楼', '塔楼', '平房']}
                            propsname="type"
                        ></CheckBoxs>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        售价(万元)：
                    </Col>
                    <Col span="21">
                        {/* <PriceRange></PriceRange> */}
                        <Ranges
                            propsname="price"
                            min={0}
                            max={2000}
                        ></Ranges>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        面积(平方)：
                    </Col>
                    <Col span="21">
                        <Ranges
                            propsname="sq"
                            min={0}
                            max={300}
                        ></Ranges>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        挂牌日期：
                    </Col>
                    <Col span="21">
                        <DateCheck
                            propsname="saledate"
                        ></DateCheck>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        购买日期：
                    </Col>
                    <Col span="21">
                        <DateCheck
                            propsname="buydate"
                        ></DateCheck>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        建筑日期：
                    </Col>
                    <Col span="21">
                        <DateCheck
                            propsname="builddate"
                        ></DateCheck>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        更多条件 ：
                    </Col>
                    <Col span="5">
                        <Dropdowns
                            title="户型"
                            propsname="room"
                            options={[{ "一居": 1 }, { "两居": 2 }, { "三居": 3 }, { "四居": 4 }, { "五居以上": 5 }]}
                        ></Dropdowns>
                    </Col>
                    <Col span="5">
                        <Selectors
                            title="有无电梯"
                            propsname="elevator"
                            options={["有", "无"]}
                        ></Selectors>
                    </Col>
                    <Col span="5">
                        <Selectors
                            title="产权"
                            propsname="property"
                            options={["个人产权", "其他产权"]}
                        ></Selectors>
                    </Col>
                    <Col span="5">
                        <Dropdowns
                            title="楼层"
                            propsname="floor"
                            options={[{ "1层": [1, 1] }, { "6层以下": [1, 6] }, { "6层到12层": [6, 12] }, { "12层以上": [12, 36] }]}
                        ></Dropdowns>
                    </Col>
                </Row>
                <Row>
                    <Col span="3">
                        当前 ：
                    </Col>
                    <Col span="21">
                        <Tags></Tags>
                    </Col>
                </Row>
            </div>
        )
    }
}