import React from "react";
import moment from "moment";

export const id = {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    sorter: true
}
export const title = {
    title: '小区名称',
    dataIndex: 'title',
    key: 'title',
}
export const images = {
    title: '缩略图',
    dataIndex: 'images',
    key: 'images',
    render(text, record) {
        return <div data-img={record.id}>
            <img className="avatar_images" src={`/infoimages_small/${record.id}/inner/${record.images.inner[0]}`} data-id={record.id} alt="" />
        </div>
    }
}
export const area = {
    title: '区域',
    dataIndex: 'area',
    key: 'area',
    render(text, record, index) {
        return `${text}-${record.region}`
    }
}
export const decoration = {
    title: '装修',
    dataIndex: 'decoration',
    key: 'decoration',
}
export const type = {
    title: '建筑类型',
    dataIndex: 'type',
    key: 'type',
}
export const direction = {
    title: '朝向',
    dataIndex: 'direction',
    key: 'direction',
}
export const elevator = {
    title: '有无电梯',
    dataIndex: 'elevator',
    key: 'elevator',
}
export const floor = {
    title: '楼层',
    dataIndex: 'floor',
    key: 'floor',
    render(text, record, index) {
        return `${text}层/共${record.totalFloor}层`
    }
}
export const room = {
    title: '户型',
    dataIndex: 'room',
    key: 'room',
    render(text, record, index) {
        return `${text}室${record.hall}厅${record.toilet}卫`
    }
}
export const property = {
    title: '产权',
    dataIndex: 'property',
    key: 'property',
}
export const sq = {
    title: '面积(平方)',
    dataIndex: 'sq',
    key: 'sq',
    sorter: true
}
export const price = {
    title: '售价(万元)',
    dataIndex: 'price',
    key: 'price',
    sorter: true
}
export const builddate = {
    title: '建筑日期',
    dataIndex: 'builddate',
    key: 'builddate',
    render(text, record, index) {
        return `${moment(Number(text)).format("YYYY年MM月")}`
    },
    sorter: true
}
export const saledate = {
    title: '挂牌日期',
    dataIndex: 'saledate',
    key: 'saledate',
    render(text, record, index) {
        return `${moment(Number(text)).format("YYYY年MM月")}`
    },
    sorter: true
}
export const buydate = {
    title: '购买日期',
    dataIndex: 'buydate',
    key: 'buydate',
    render(text, record, index) {
        return `${moment(Number(text)).format("YYYY年MM月")}`
    },
    sorter: true
}