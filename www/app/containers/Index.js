import React from 'react';
import App from "./App.js";

import { Layout, Menu, Breadcrumb, Row, Col, Card } from 'antd';
const { Header, Content, Footer } = Layout;

import ChartOne from "../columns/index/ChartOne.js";
import ChartTwo from "../columns/index/ChartTwo.js";
import ChartThree from "../columns/index/ChartThree.js";

export default class Index extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<App k="index">

				<div style={{ padding: 24, minHeight: 780, width: "80%", margin: "0 auto" }}>
					<Row>
						<Col span={12}>
							<ChartThree></ChartThree>
						</Col>

						<Col span={12}>
							<Card title="房子价格走势" bordered={false} style={{ width: "100%" }}>
								<ChartTwo></ChartTwo>
							</Card>
						</Col>
					</Row>
					<Row style={{ "marginTop": "20px" }}>
						<Col style={{ "height": "460px" }} className="w">
							<ChartOne></ChartOne>
						</Col>
					</Row>
				</div>

			</App>
		);
	}
}
