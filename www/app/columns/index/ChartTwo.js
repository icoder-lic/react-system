import React from 'react';

export default class ChartTwo extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(this.refs.main);

		// 指定图表的配置项和数据
		var option = {
			legend: {
				padding: 0
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			xAxis: {
				type: 'category',
				data: ['2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [820, 932, 941, 964, 1290, 1330, 1320],
				type: 'line',
				smooth: true
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

	}

	render() {
		return (
			<div ref="main" style={{ "width": "100%", "height": "100%" }}></div>
		);
	}
}