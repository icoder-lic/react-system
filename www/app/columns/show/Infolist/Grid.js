import React from 'react';
import { connect } from "dva";

import { Select, Radio, Row, Col, Pagination } from 'antd';
const Option = Select.Option;

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "value": "A",
            "col": 4,
            "row": 5   //网格形式
        }
        props.dispatch({
            "type": "infolist/changePage", pageSize: this.state.col * this.state.row
        })
    }
    render() {
        //显示小格内容
        const showGridContent = (n) => {
            const theinfo = this.props.infos[n];
            if (!theinfo) return null;
            return <div>
                <Row>
                    <Col span={18} offset={3}>
                        <img className="gridimg" src={`/infoimages_small/${theinfo.id}/inner/${theinfo.avatar}`} alt="" />
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <h4>{theinfo.title}-{theinfo.room}室{theinfo.hall}厅{theinfo.toilet}卫</h4>
                        <h4>{theinfo.area}-{theinfo.region}</h4>
                        <h4>{theinfo.sq}平方</h4>
                        <h4>售价:{theinfo.price}万元</h4>
                    </Col>
                </Row>
            </div>
        }

        //放二维数组
        var ARR = [];
        for (var i = 0; i < this.state.row; i++) {
            var temp = [];
            for (var j = 0; j < this.state.col; j++) {
                temp.push(
                    <Col key={j} className="grid" span={24 / this.state.col}>
                        {showGridContent(i * this.state.col + j)}
                    </Col>
                )
            }
            ARR.push(<Row key={i}>{temp}</Row>)
        }


        return (
            <div>
                <Radio.Group value={this.state.value} onChange={(e) => {
                    this.setState({
                        col: e.target.col,
                        row: e.target.row,
                        value: e.target.value
                    });

                    //派遣一个action
                    this.props.dispatch({ "type": "infolist/changePage", pageSize: e.target.col * e.target.row })
                }}>
                    <Radio.Button value="A" col="4" row="5">4 * 5</Radio.Button>
                    <Radio.Button value="B" col="3" row="5">3 * 5</Radio.Button>
                    <Radio.Button value="C" col="2" row="5">2 * 5</Radio.Button>
                </Radio.Group>
                <div className="h20"></div>

                {ARR}

                <Pagination
                    current={this.props.pageinfo.current}
                    total={this.props.count}
                    pageSize={this.props.pageinfo.pageSize}
                    onChange={(page) => {
                        this.props.dispatch({ "type": "infolist/changePage", current: page, pageSize: this.state.row * this.state.col })
                    }}
                />
            </div>
        );
    }
}

export default connect(
    ({ infolist }) => ({
        "pageinfo": infolist.pageinfo,
        "infos": infolist.infos,
        "count": infolist.count
    })
)(Grid);