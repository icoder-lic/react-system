import React from 'react';
import { connect } from "dva";

import { Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;

class CheckBoxs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<CheckboxGroup
					options={this.props.options}
					value={this.props.filters[this.props.propsname]}
					onChange={(value) => {
						this.props.dispatch({ "type": "infolist/changeFilter", "propsname": this.props.propsname, value })
					}
					}
				/>
			</div>
		);
	}
}

export default connect(
	({ infolist }) => ({
		filters: infolist.filters
	})
)(CheckBoxs);