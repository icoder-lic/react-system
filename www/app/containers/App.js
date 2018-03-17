import React from 'react';
import { connect } from "dva";
import { push } from "react-router-redux";

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import "./App.less";


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[this.props.k]}
                            style={{ lineHeight: '64px' }}
                            onClick={(e) => {
                                this.props.dispatch(push(e.item.props.root))
                            }}
                        >
                            <Menu.Item key="index" root="/">首页</Menu.Item>
                            <Menu.Item key="show" root="/show/table">场景一</Menu.Item>
                            <Menu.Item key="do" root="/do/form">场景二</Menu.Item>
                        </Menu>
                    </Header>
                    {
                        this.props.children
                    }
                </Layout>
            </div>
        );
    }
}
export default connect()(App);