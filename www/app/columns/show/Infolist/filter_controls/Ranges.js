import React, { Component } from 'react';
import { connect } from "dva";

import { Slider, InputNumber, Row, Col, Button, Input } from 'antd';
const InputGroup = Input.Group;

class Ranges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.filters[this.props.propsname],
            start: props.filters[this.props.propsname][0],
            end: props.filters[this.props.propsname][1]
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.filters[this.props.propsname],
            start: nextProps.filters[this.props.propsname][0],
            end: nextProps.filters[this.props.propsname][1]
        })
    }
    //点击确定改变区间
    changeBetween() {
        const startB = this.state.start;
        const endB = this.state.end;
        if (startB >= this.props.min && startB <= this.props.max && endB >= this.props.min && endB <= this.props.max) {
            var minp = startB >= endB ? endB : startB;
            var maxp = startB < endB ? endB : startB;
            this.props.dispatch({ "type": "infolist/changeFilter", "propsname": this.props.propsname, value: [minp, maxp] })
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span="14">
                        <Slider
                            range
                            min={this.props.min}
                            max={this.props.max}
                            value={this.state.data}
                            onChange={(value) => {
                                this.setState({ data: value, start: value[0], end: value[1] })
                            }}
                            onAfterChange={(value) => {
                                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": this.props.propsname, value })
                            }} />
                    </Col>
                    <Col span="1"></Col>
                    <Col span="9">
                        <InputGroup size="large">
                            <Col span={7}>
                                <InputNumber
                                    ref="startp"
                                    min={this.props.min}
                                    max={this.props.max}
                                    defaultValue={this.props.min}
                                    value={this.state.start}
                                    onChange={(v) => { this.setState({ start: v }) }}
                                />
                            </Col>
                            <Col span={7}>
                                <InputNumber
                                    ref="endp"
                                    min={this.props.min}
                                    max={this.props.max}
                                    defaultValue={this.props.max}
                                    value={this.state.end}
                                    onChange={(v) => { this.setState({ end: v }) }}
                                />
                            </Col>
                            <Col span={6}>
                                <Button type="primary"
                                    onClick={() => { this.changeBetween() }}
                                >确定</Button>
                            </Col>
                        </InputGroup>


                    </Col>
                </Row>
            </div>
        )
    }
}
export default connect(
    ({ infolist }) => ({
        filters: infolist.filters
    })
)(Ranges);