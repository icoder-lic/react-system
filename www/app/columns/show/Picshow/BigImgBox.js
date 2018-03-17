import React from 'react';
import { connect } from "dva";

class BigImgBox extends React.Component {
	constructor(props) {
		super(props);
		//图片的地址
		this.src = "";
		this.state = {
			loaded: false
		}
	}

	shouldComponentUpdate(nextProps) {
		//如果nowid变化了，此时就必须info发生变化
		//如果nowid变化了，但是info没变，就说明info还在没有请求回来呢。
		if (nextProps.nowid != this.props.nowid) {
			return nextProps.info != this.props.info;
		}

		return true;
	}

	componentWillUpdate(nextProps) {
		if (!nextProps.images) return;
		//先用小图
		$(this.refs.bigimg).attr("src", `infoimages_small/${nextProps.nowid}/${nextProps.nowalbum}/${nextProps.images[nextProps.nowalbum][nextProps.nowidx]}`);
		//loading
		var image = new Image();
		image.src = `infoimages/${nextProps.nowid}/${nextProps.nowalbum}/${nextProps.images[nextProps.nowalbum][nextProps.nowidx]}`

		var self = this;
		image.onload = function () {
			//设置大图的src
			$(self.refs.bigimg).attr("src", image.src);
			//如果image的src和上一次一样，阻止渲染，为了防止死循环
			if (image.src == self.src) return;
			self.src = image.src;
			//隐藏loading图片
			self.setState({
				loaded: true
			});
		}

		//***************实现预先加载***************
		//此时要把图片队列链接起来
		const allarr = nextProps.images.inner.concat(nextProps.images.layouts, nextProps.images.real, nextProps.images.other);
		//从合并的数组中找到哪一张是我自己？此时这个序号就是总序号
		const zongxuhao = allarr.indexOf(nextProps.images[nextProps.nowalbum][nextProps.nowidx]);
		//循环终点
		const end = zongxuhao + 5 < allarr.length ? zongxuhao + 5 : allarr.length;
		//文件夹数组
		const dirarr = [].concat(
			new Array(nextProps.images.inner.length).fill("inner"),
			new Array(nextProps.images.layouts.length).fill("layouts"),
			new Array(nextProps.images.real.length).fill("real"),
			new Array(nextProps.images.other.length).fill("other")
		);

		// //预先加载后面5张
		for (var i = zongxuhao; i < end; i++) {
			var _image = new Image();
			_image.src = `infoimages/${nextProps.nowid}/${dirarr[i]}/${allarr[i]}`;
		}
		//***************实现预先加载***************

		//向外暴露两个数值
		this.zongxuhao = zongxuhao;
		this.zongshu = allarr.length;
	}

	render() {
		if (!this.props.images) return null;

		return (
			<div className="bigImgBox">
				<div className="inner">
					<img ref="bigimg" className="bigimg" />

					<div className="leftbtn" onClick={() => {
						this.props.dispatch({ "type": "picshow/goPrev" });
						//点击按钮的时候让文字出现
						this.setState({
							loaded: false
						})
					}}></div>

					<div className="rightbtn" onClick={() => {
						this.props.dispatch({ "type": "picshow/goNext" })
						//点击按钮的时候让文字出现
						this.setState({
							loaded: false
						})
					}}></div>

					{
						!this.state.loaded
							?
							<div className="loadtip"></div>
							:
							null
					}

					<div className="nobox">
						{this.zongxuhao}/{this.zongshu}
					</div>
				</div>
			</div>
		);
	}
}


export default connect(
	({ picshow }) => ({
		nowid: picshow.nowid,
		nowidx: picshow.nowidx,
		nowalbum: picshow.nowalbum,
		images: picshow.info.images,
		info: picshow.info
	})
)(BigImgBox);