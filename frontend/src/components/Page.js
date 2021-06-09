import { Dropdown, Layout, Menu, Button } from 'antd';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { AiOutlineLogout } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../ducks/auth';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu

const Page = ({ children, currentPath, user, logout, contentStyle, data }) => {
    const getSelectedKey = () => {
        let selectedKey = currentPath.substring(1);
        selectedKey = selectedKey === '' ? 'home' : selectedKey;
        return selectedKey;
    }
    const [selectedKey, setSelectedKey] = useState(getSelectedKey());
    return (
        <Layout style={{
            minHeight: 950,

        }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu style={{
                    maxWidth: 1500,
                    margin: '0 auto'
                }}
                    theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]}
                    onClick={e => setSelectedKey(e.key)} selectedKeys={[selectedKey]}>
                    <Menu.Item key="home"><Link to="/">SportApp</Link></Menu.Item>
                    <Menu.Item key="rental"><Link to="/rental">Wypożyczalnia</Link></Menu.Item>
                    <Menu.Item key="about"><Link to="/about">O nas</Link></Menu.Item>

                    <Menu.Item key="cart"><Link to="/cart">{`Koszyk zamówień ${data.myOrders.length > 0 ? '(' + data.myOrders.length + ')' : ''}`} </Link></Menu.Item>
                    <SubMenu key="sub1" title="Panel administracyjny">
                        <SubMenu key="categoryCRUD" title="Kategorie">
                            <Menu.Item key="addCategory">Dodaj nową</Menu.Item>
                            <Menu.Item key="editCategory">Edytuj</Menu.Item>
                            <Menu.Item key="deleteCategory">Usuń</Menu.Item>
                        </SubMenu>
                        <SubMenu key="productCRUD" title="Produkty">
                            <Menu.Item key="addProduct">Dodaj nowy</Menu.Item>
                            <Menu.Item key="updateProduct">Edytuj</Menu.Item>
                            <Menu.Item key="deleteProduct">Usuń</Menu.Item>
                        </SubMenu>
                    </SubMenu>

                    <Menu.Item key='settings' style={{ float: 'right', backgroundColor: 'transparent' }}>
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link style={{}} to='' onClick={logout}><AiOutlineLogout style={{ verticalAlign: '-0.125em' }} /> Wyloguj</Link>
                                </Menu.Item>
                            </Menu>
                        }>
                            {user.authenticated ?
                                <Button style={{
                                    background: 'none',
                                    border: 'none'
                                }}>
                                    <Avatar name={user.details.fullName} size='40' round={true} />
                                </Button>
                                : <></>
                            }
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{
                margin: '64px auto 0',
                padding: '0 24px',
                width: '100%',
                maxWidth: 1600,
                ...contentStyle
            }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

const mapStateToProps = state => ({
    currentPath: state.router.location.pathname,
    user: state.auth.user,
    data: state.data
});

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
