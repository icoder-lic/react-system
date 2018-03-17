import React from "react";

export default class SetCols extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        var self = this;
        //实现拖拽排序
        $("#ul1 , #ul2").sortable({
            connectWith: ".connectedSortable" ,
            //当sort发生的时候做的事情
            stop : function(){
                var arr = [];
                $(self.refs.ul1).find("li").each(function(){
                    arr.push($(this).data("e"));
                });
                self.props.setTempCols(arr);
            }
        }).disableSelection();
    }
    render(){
        const dictionary = {
            "id" : "id",
            "title" : "小区名称",
            "images" : "缩略图",
            "decoration" : "装修",
            "type":"建筑类型",
            "direction":"朝向",
            "elevator":"有无电梯",
            "price":"售价",
            "area":"区域",
            "saledate":"挂牌日期",
            "buydate":"购买日期",
            "builddate":"建筑日期",
            "room":"户型",
            "floor":"楼层",
            "sq":"面积",
            "property":"产权"
        }

        return <div className="mymodal">
            <h3>当前列</h3>
            <ul ref="ul1" id="ul1" className="connectedSortable">
                {
                    this.props.cols.map((item,index)=>{
                        return <li key={index} data-e={item}>
                            {dictionary[item]}
                        </li>
                    })
                }
            </ul>
            <h3>未显示的列</h3>
            <ul ref="ul2" id="ul2" className="connectedSortable">
                {
                    Object.keys(dictionary).filter(item=>{
                        return !this.props.cols.includes(item);
                    }).map((item, index) => {
                        return <li key={index} data-e={item}>
                            {dictionary[item]}
                        </li>
                    })
                }
            </ul>
        </div>
    }
}