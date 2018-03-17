import React, { Component } from 'react';
import { connect } from "dva";

import { Slider, InputNumber, Row, Col, Button, Input } from 'antd';
const InputGroup = Input.Group;

class PriceRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.filters.price,
            startp: props.filters.price[0],
            endp: props.filters.price[1]
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            price: nextProps.filters.price,
            startp: nextProps.filters.price[0],
            endp: nextProps.filters.price[1]
        })
    }
    //点击确定改变价格区间
    changePrice() {
        const startPrice = this.state.startp;
        const endPrice = this.state.endp;
        if (startPrice >= 0 && startPrice <= 2000 && endPrice >= 0 && endPrice <= 2000) {
            var minp = startPrice >= endPrice ? endPrice : startPrice;
            var maxp = startPrice < endPrice ? endPrice : startPrice;
            this.props.dispatch({ "type": "infolist/changeFilter", "propsname": "price", value: [minp, maxp] })
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span="14">
                        <Slider
                            range
                            min={0}
                            max={2000}
                            value={this.state.price}
                            onChange={(value) => {
                                this.setState({ price: value, startp: value[0], endp: value[1] })
                            }}
                            onAfterChange={(value) => {
                                this.props.dispatch({ "type": "infolist/changeFilter", "propsname": "price", value })
                            }} />
                    </Col>
                    <Col span="1"></Col>
                    <Col span="9">
                        <InputGroup size="large">
                            <Col span={7}>
                                <InputNumber
                                    ref="startp"
                                    min={0}
                                    max={2000}
                                    defaultValue={0}
                                    value={this.state.startp}
                                    onChange={(v) => { this.setState({ startp: v }) }}
                                />
                            </Col>
                            <Col span={7}>
                                <InputNumber
                                    ref="endp"
                                    min={0}
                                    max={2000}
                                    defaultValue={2000}
                                    value={this.state.endp}
                                    onChange={(v) => { this.setState({ endp: v }) }}
                                />
                            </Col>
                            <Col span={6}>
                                <Button type="primary"
                                    onClick={() => { this.changePrice() }}
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
)(PriceRange);