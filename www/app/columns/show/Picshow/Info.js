import React from 'react';
import { connect } from 'dva';

class Info extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="info">
				<h1>
					{this.props.info.title}
					{this.props.info.room}室
					<small>[{this.props.nowid}]</small>
				</h1>
				<h3>
					{this.props.info.sq}平方
					{this.props.info.price}万
					{new Date(this.props.info.buydate).getFullYear()}年
				</h3>
			</div>
		);
	}
}

export default connect(
	({ picshow }) => ({
		info: picshow.info,
		nowid: picshow.nowid
	})
)(Info);