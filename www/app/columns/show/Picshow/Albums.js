import React from 'react';
import { connect } from "dva";
import classnames from "classnames";

class Albums extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		//这里要看看this.props.info.images是不是undefined
		if (!this.props.info.images) return null;

		return (
			<div className="albums">
				<ul>
					<li
						onClick={() => {
							this.props.dispatch({ "type": "picshow/changealbum", "nowalbum": "inner" })
						}}
						className={classnames({ "cur": this.props.nowalbum == "inner" })}>室内图（{this.props.info.images.inner.length}）</li>
					<li
						onClick={() => {
							this.props.dispatch({ "type": "picshow/changealbum", "nowalbum": "layouts" })
						}}
						className={classnames({ "cur": this.props.nowalbum == "layouts" })}>户型图（{this.props.info.images.layouts.length}）</li>
					<li
						onClick={() => {
							this.props.dispatch({ "type": "picshow/changealbum", "nowalbum": "real" })
						}}
						className={classnames({ "cur": this.props.nowalbum == "real" })}>实景图（{this.props.info.images.real.length}）</li>
					<li
						onClick={() => {
							this.props.dispatch({ "type": "picshow/changealbum", "nowalbum": "other" })
						}}
						className={classnames({ "cur": this.props.nowalbum == "other" })}>其他（{this.props.info.images.other.length}）</li>
				</ul>
			</div>
		);
	}
}

export default connect(
	({ picshow }) => ({
		info: picshow.info,
		nowalbum: picshow.nowalbum
	})
)(Albums);