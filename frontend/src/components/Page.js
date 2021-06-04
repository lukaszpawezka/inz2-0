import { Layout, List, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { addCategories, fetchCategories, removeCategories, fetchProducts, addParentCategory, removeParentCategory } from '../ducks/data';

const { Header, Content, Footer, Sider } = Layout;

const Page = ({ children, categoriesStack, parentCategoryStack, fetchCategories, addCategories, removeCategories, fetchProducts }) => {
    const [needProducts, setNeedProduct] = useState(false);
    const dispatch = useDispatch();

    const currentCategories = categoriesStack[categoriesStack.length - 1];
    const currentParentCategory = parentCategoryStack[parentCategoryStack.length - 1];

    useEffect(() => {
        if (!categoriesStack.length) {
            fetchCategories();
            
        }
        if(needProducts) {
            fetchProducts(currentParentCategory ? currentParentCategory.id : null)
            setNeedProduct(false)
        }
    });

  
    return (
        <Layout>
            <Header>
                <Menu style={{
                    maxWidth: 1000,
                    margin: '0 auto'
                }}
                    theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/rental">Rental</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/about">About</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{
                padding: '0 50px',
                maxWidth: 1000,
                width: '100%',
                margin: '0 auto'
            }}>
                <Layout style={{ padding: '24px 0' }}>
                    <Sider width={200}>
                        <List
                            header={categoriesStack.length > 1 ?
                                <div
                                    style={{
                                        background: 'white'
                                    }}
                                    onClick={() => {
                            
                                        removeParentCategory()(dispatch).then(() => {
                                            setNeedProduct(true)
                                        }

                                        )
                                        removeCategories()
                                    }}>
                                    {currentParentCategory.name}
                                </div>
                                : null}
                            bordered
                            itemLayout="horizontal"
                            dataSource={currentCategories}
                            renderItem={item => (
                                <List.Item onClick={() => {

                                    addParentCategory(item)(dispatch).then(() =>{
                                        fetchProducts(categoriesStack.length > 0 ? item.id : null)
                                    })
                                    addCategories(item.childrens)


                                }}
                                    style={{
                                        background: 'white'
                                    }}>
                                    <div>
                                        {item.name}
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Sider>
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
    categoriesStack: state.data.categoriesStack,
    parentCategoryStack: state.data.parentCategoryStack
});

const mapDispatchToProps = {
    fetchCategories,
    addCategories,
    removeCategories,
    fetchProducts,
    addParentCategory,
    removeParentCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
