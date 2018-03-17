import React from 'react';
import { connect } from "dva";
import classnames from "classnames";

class Smallpics extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			nowpage: 0
		}
	}

	shouldComponentUpdate(nextProps) {
		//如果nowid变化了，此时就必须info发生变化
		//如果nowid变化了，但是info没变，就说明info还在没有请求回来
		if (nextProps.nowid != this.props.nowid) {
			return nextProps.info != this.props.info;
		}

		return true;
	}

	render() {
		//判断
		if (!this.props.images) return null;

		//当前所在的页数
		const nowpage = parseInt(this.props.nowidx / 4);

		//总页数
		const pageamount = Math.ceil(this.props.images[this.props.nowalbum].length / 4);

		//显示ul和li
		const showUlLIs = () => {
			var ARR = [];
			//图集图片的数组
			var arr = this.props.images[this.props.nowalbum];
			//遍历每一页
			for (let i = 0; i < arr.length / 4; i++) {
				ARR.push(
					<ul key={i}>
						{
							arr.slice(i * 4, i * 4 + 4).map((item, index) => {
								return <li
									key={index}
									className={classnames({
										"cur": this.props.nowidx == i * 4 + index
									})}
									onClick={() => { this.props.dispatch({ "type": "picshow/changeNowidx", "nowidx": i * 4 + index }) }}
								>
									<img src={`infoimages_small/${this.props.nowid}/${this.props.nowalbum}/${item}`} alt="" />
								</li>
							})
						}
					</ul>
				)
			}
			return ARR;
		}

		//显示span
		const showSpans = () => {
			var ARR = [];	//DOM数组
			for (let i = 0; i < pageamount; i++) {
				ARR.push(
					<span
						key={i}
						style={{ "width": 100 / pageamount + "%" }}
						className={classnames({ "cur": i == nowpage })}
						onMouseEnter={(e) => {
							//直接用DOM方法拉动unit即可
							$(this.refs.unit).css("left", -290 * i + "px");
							//直接用DOM方法改变span谁加cur
							$(e.target).addClass('cur').siblings().removeClass('cur');
						}}
					></span>
				)
			}
			return ARR;
		}

		return (
			<div className="smallpics" onMouseLeave={() => {
				//直接用DOM方法拉动unit即可
				$(this.refs.unit).css("left", -290 * nowpage + "px");
				//直接用DOM方法改变cur即可
				$(this.refs.pagenav).find("span").eq(nowpage).addClass('cur').siblings().removeClass('cur');

			}}>
				{JSON.stringify()}
				<div className="unit" ref="unit" style={{ "left": -290 * nowpage + "px" }}>
					{
						showUlLIs()
					}
				</div>
				<div className="pagenav" ref="pagenav">
					{
						showSpans()
					}
				</div>
			</div>
		);
	}
}

export default connect(
	({ picshow }) => ({
		images: picshow.info.images,
		nowalbum: picshow.nowalbum,
		nowidx: picshow.nowidx,
		nowid: picshow.nowid,
		info: picshow.info
	})
)(Smallpics);