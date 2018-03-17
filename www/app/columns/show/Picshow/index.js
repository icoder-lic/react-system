import React from 'react';
import { connect } from "dva";

import "./Picshow.less";

import Info from "./Info.js";
import Albums from "./Albums.js";
import Infolikes from "./Infolikes.js";
import Smallpics from "./Smallpics.js";
import BigImgBox from "./BigImgBox.js";

class Picshow extends React.Component {
	constructor(props) {
		super(props);
		props.dispatch({ "type": "picshow/init", "nowid": props.id });
	}

	render() {
		return (
			<div className="picshow">
				<BigImgBox></BigImgBox>
				<div className="rightpart">
					<Info></Info>
					<Albums></Albums>
					<Infolikes></Infolikes>
					<Smallpics></Smallpics>
				</div>
			</div>
		);
	}
}

export default connect(
	({ routing }) => ({
		location: routing.location
	})
)(Picshow);
