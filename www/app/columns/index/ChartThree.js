import React from 'react';

export default class ChartThree extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(this.refs.main);

		// 指定图表的配置项和数据
		var option = {
			title: {
				text: '购房需求统计',
				subtext: '本市数据',
				x: 'center'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: ['买房落户', '改善居住条件', '投资', '方便工作、学习、生活', '其他']
			},
			series: [
				{
					name: '购房需求',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [
						{ value: 335, name: '买房落户' },
						{ value: 310, name: '改善居住条件' },
						{ value: 234, name: '投资' },
						{ value: 1335, name: '方便工作、学习、生活' },
						{ value: 548, name: '其他' }
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
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