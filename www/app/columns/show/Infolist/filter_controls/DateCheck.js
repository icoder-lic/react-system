import React, { Component } from 'react';
import { connect } from "dva";

import { DatePicker, Row, Col, Button } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from "moment";

class DateCheck extends Component {
	constructor() {
		super();
	}
	render() {
		const date = this.props.filters[this.props.propsname];

		return (
			<div>
				<Row>
					<Col span="14">
						<RangePicker
							allowClear={false}
							value={
								date[0]
									?
									[moment(Number(date[0])), moment(Number(date[1]))]
									:
									[]
							}
							onChange={(value) => {
								//value是数组，数组中的两个项都是moment对象
								this.props.dispatch({
									"type": "infolist/changeFilter",
									"propsname": this.props.propsname,
									"value": [value[0].unix() * 1000, value[1].unix() * 1000]
								});
							}}
						/>
					</Col>
					<Col span="1"></Col>
					<Col span="3">
						<Button onClick={() => {
							this.props.dispatch({
								"type": "infolist/changeFilter",
								"propsname": this.props.propsname,
								"value": [Date.parse(new Date()) - 365 * 86400 * 1000, Date.parse(new Date())]
							})
						}}>
							近1年
						</Button>
					</Col>
					<Col span="3">
						<Button onClick={() => {
							this.props.dispatch({
								"type": "infolist/changeFilter",
								"propsname": this.props.propsname,
								"value": [Date.parse(new Date()) - 2 * 365 * 86400 * 1000, Date.parse(new Date())]
							})
						}}>
							近2年
						</Button>
					</Col>
					<Col span="3">
						<Button onClick={() => {
							this.props.dispatch({
								"type": "infolist/changeFilter",
								"propsname": this.props.propsname,
								"value": [Date.parse(new Date()) - 3 * 365 * 86400 * 1000, Date.parse(new Date())]
							})
						}}>
							近3年
						</Button>
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
)(DateCheck);