import React, { Component } from 'react';
import { connect } from "dva";
import moment from "moment";
import * as R from "ramda";

import { Table, Row, Col, Modal, Button, Icon, Select, Radio, Menu, Dropdown } from "antd";
const Option = Select.Option;

//设置列 组件
import SetCols from "./SetCols";
import Grid from "./Grid.js";
//获取列的头信息
import * as columns from "./api/colmuns";

class TableBox extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      cols: (function () {
        if (localStorage.getItem("system-cols")) {
          return JSON.parse(localStorage.getItem("system-cols"));
        } else {
          return ["id", "title", "images", "area", "decoration", "room", "sq", "price"]
        }
      })(),
      showtype: "table"
    }
  }
  //组件已经上树
  componentDidMount() {
    var self = this;
    //委托，点击缩略图
    $(this.refs.infoTableBox).delegate(".avatar_images", "click", function () {
      self.props.setXuanfu($(this).data("id"), true);
    })
  }
  render() {
    const columnArr = this.state.cols.map(item => {
      if (item != this.props.sortinfo.sortby) {
        return columns[item];
      }
      return R.set(R.lensProp("sortOrder"), this.props.sortinfo.sortdirection == 1 ? "ascend" : "descend", columns[item]);
    });
    // const columnArr = this.state.cols;
    //临时数组
    var tempCols = [];
    const setTempCols = (__tempCols) => {
      tempCols = __tempCols;
    }
    return (
      <div ref="infoTableBox">
        <Row>
          <Col span={12}>
            <div className="infotip">共{this.props.count}条数据符合要求 当前{this.props.pageinfo.current} / {Math.ceil(this.props.count / this.props.pageinfo.pageSize)}页</div>
          </Col>
          <Col span={12}>
            {/* 更改列设置 */}
            <Radio.Group className="radioGroup" value={this.state.showtype} onChange={
              (e) => {
                this.setState({ showtype: e.target.value })
                this.props.dispatch({
                  "type": "infolist/changePage",
                  "current": 1
                });
              }
            }>
              <Radio.Button value="table">列表视图</Radio.Button>
              <Radio.Button value="grid">网格视图</Radio.Button>
            </Radio.Group>

            <Button
              className="setColsBtn"
              type="primary"
              icon="setting"
              shape="circle"
              onClick={() => { this.setState({ showModal: true }) }}
            ></Button>
          </Col>
        </Row>

        <Modal
          title="列设置(拖拽以进行排序和设置当前列)"
          visible={this.state.showModal}
          onOk={() => {
            this.setState({
              showModal: false,
              cols: tempCols
            });
            //本地存储
            localStorage.setItem("system-cols", JSON.stringify(tempCols));
          }}
          onCancel={() => { this.setState({ showModal: false }) }}
          width={900}
          // 关闭时销毁里面的元素
          destroyOnClose={true}
        >
          <SetCols cols={this.state.cols} setTempCols={setTempCols.bind(this)} ></SetCols>
        </Modal>
        {
          this.state.showtype == "grid"
            ?
            <Grid></Grid>
            :
            <Table
              rowKey={record => record.id}
              dataSource={this.props.infos}
              columns={columnArr}
              pagination={{
                current: this.props.pageinfo.current,
                pageSize: this.props.pageinfo.pageSize,
                total: this.props.count,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15", "20", "50", "100"]
              }}
              onChange={(pagination, filter, sorter) => {
                //换页 改变pagesize 改变排序的时候 触发
                if (pagination.current != this.props.pageinfo.current || pagination.pageSize != this.props.pageinfo.pageSize) {
                  this.props.dispatch({
                    "type": "infolist/changePage",
                    "current": pagination.current,
                    "pageSize": pagination.pageSize
                  });
                  return;
                }
                var temp = this.props.sortinfo.sortdirection == 1 ? "ascend" : "descend";
                if (sorter.columnKey != this.props.sortinfo.sortby || sorter.order != temp) {
                  this.props.dispatch({
                    "type": "infolist/changeSort",
                    "sortby": sorter.columnKey,
                    "sortdirection": sorter.order == "ascend" ? 1 : -1
                  });
                }
              }}
            />
        }
      </div>
    )
  }
}
export default connect(
  ({ infolist }) => ({
    infos: infolist.infos,
    pageinfo: infolist.pageinfo,
    count: infolist.count,
    sortinfo: infolist.sortinfo
  })
)(TableBox);