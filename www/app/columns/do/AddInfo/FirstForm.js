import React, { Component } from 'react';

import { Radio, Form, Input, Tooltip, Icon, Cascader, DatePicker, Select, Row, Col, Checkbox, Button, AutoComplete, Canlenda } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

export default class FirstForm extends Component {
    constructor() {
        super();
    }


    render() {
        //定义表格的布局，xs表示极小，sm表示小屏
        const zhai = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return <div>
            <Form>
                <FormItem
                    {...zhai}
                    label="小区名称"
                >
                    {
                        getFieldDecorator(
                            'title',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="区域"
                >
                    {
                        getFieldDecorator(
                            'area',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Cascader options={this.props.areasOptions} />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="装修"
                >
                    {
                        getFieldDecorator(
                            'decoration',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Select>
                                {
                                    ["毛坯", "简装修", "中装修", "精装修", "豪华装修"].map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="朝向"
                >
                    {
                        getFieldDecorator(
                            'direction',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Select>
                                {
                                    ["南北通透", "东西向", "朝南", "朝北", "朝东", "朝西"].map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="建筑类型"
                >
                    {
                        getFieldDecorator(
                            'type',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Select>
                                {
                                    ["板楼", "塔楼"].map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="产权"
                >
                    {
                        getFieldDecorator(
                            'property',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Select>
                                {
                                    ["个人产权", "其他产权"].map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="有无电梯"
                >
                    {
                        getFieldDecorator(
                            'elevator',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Select>
                                {
                                    ["有", "无"].map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="第几层"
                >
                    {
                        getFieldDecorator(
                            'floor',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 50)) {
                                                callback("请填写合理的楼层");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="楼层总数"
                >
                    {
                        getFieldDecorator(
                            'totalFloor',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 50)) {
                                                callback("请填写合理的楼层");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="几室"
                >
                    {
                        getFieldDecorator(
                            'room',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 10)) {
                                                callback("请填写合理的数字");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="几厅"
                >
                    {
                        getFieldDecorator(
                            'hall',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 10)) {
                                                callback("请填写合理的数字");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="几卫"
                >
                    {
                        getFieldDecorator(
                            'toilet',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 50)) {
                                                callback("请填写合理的数字");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="售价（万元）"
                >
                    {
                        getFieldDecorator(
                            'price',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 2000)) {
                                                callback("请填写0~2000之内的数字");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="面积"
                >
                    {
                        getFieldDecorator(
                            'sq',
                            {
                                rules: [
                                    {
                                        "validator": function (rule, value, callback) {
                                            //如果不是数组，势必就是NaN，NaN不能参与比较
                                            value = Number(value);
                                            if (!(parseFloat(value) > 0 && parseFloat(value) <= 500)) {
                                                callback("请填写0~500之内的数字");
                                                return;
                                            }
                                            callback();
                                        }
                                    },
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <Input />
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="购买日期"
                >
                    {
                        getFieldDecorator(
                            'buydate',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <DatePicker ></DatePicker >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="建筑日期"
                >
                    {
                        getFieldDecorator(
                            'builddate',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <DatePicker ></DatePicker >
                            )
                    }
                </FormItem>
                <FormItem
                    {...zhai}
                    label="挂牌日期"
                >
                    {
                        getFieldDecorator(
                            'saledate',
                            {
                                rules: [
                                    { "required": true, "message": "必填" }
                                ]
                            }
                        )(
                            <DatePicker ></DatePicker >
                            )
                    }
                </FormItem>
            </Form>
        </div>
    }
}