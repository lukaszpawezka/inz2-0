import { Dropdown, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { AiOutlineLogout } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../ducks/auth';

const { Header, Content, Footer } = Layout;

const Page = ({ children, currentPath, user, logout }) => {
    const getSelectedKey = () => {
        let selectedKey = currentPath.substring(1);
        selectedKey = selectedKey === '' ? 'home' : selectedKey;
        return selectedKey;
    }
    const [selectedKey, setSelectedKey] = useState(getSelectedKey());
    return (
        <Layout>
            <Header>
                <Menu style={{
                    maxWidth: 900,
                    margin: '0 auto'
                }}
                    theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]}
                    onClick={e => setSelectedKey(e.key)} selectedKeys={[selectedKey]}>
                    <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="rental"><Link to="/rental">Rental</Link></Menu.Item>
                    <Menu.Item key="about"><Link to="/about">About</Link></Menu.Item>
                    <Menu.Item key='settings' style={{ float: 'right', backgroundColor: 'transparent' }}>
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link style={{}} to='' onClick={logout}><AiOutlineLogout style={{ verticalAlign: '-0.125em' }} /> Wyloguj</Link>
                                </Menu.Item>
                            </Menu>
                        }>
                            {user.authenticated ?
                                <a>
                                    <Avatar name={user.details.fullName} size='40' round={true} />
                                </a>
                                : <></>
                            }
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{
                padding: '0 50px',
                maxWidth: 1000,
                width: '100%',
                margin: '0 auto'
            }}>
                <Layout style={{ padding: '24px 0' }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

const mapStateToProps = state => ({
    currentPath: state.router.location.pathname,
    user: state.auth.user
});

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
