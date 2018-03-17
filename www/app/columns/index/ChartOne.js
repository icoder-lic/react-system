import React from 'react';

export default class ChartOne extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(this.refs.main);

		// 指定图表的配置项和数据
		var option = {
			title: {
				text: '成交价格统计(千万)',
				subtext: '本市数据',
				x: 'left'
			},
			color: ['#FFB035'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '销售额',
					type: 'bar',
					barWidth: '40%',
					data: [10, 52, 200, 334, 390, 330, 220, 200, 334, 390, 330, 220]
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

	}

	render() {
		return (
			<div ref="main" style={{ "width": "100%", "height": "350px", "margin": "0 auto" }}></div>
		);
	}
}