import { Button, Col, ConfigProvider, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdShoppingBasket } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import Nothing from '../components/Nothing';
import Page from '../components/Page';
import { addCategories, addParentCategory, fetchCategories, fetchProducts, removeCategories, removeParentCategory } from '../ducks/data';
import { formatAsCurrency } from '../utils/utils';

const Rental = ({ products, categoriesStack, parentCategoryStack, fetchCategories, addCategories, removeCategories, fetchProducts }) => {

    // useEffect(() => {
    //     if (!products.length) {
    //         fetchProducts();
    //     }
    // }, []);
    const [needProducts, setNeedProduct] = useState(false);
    const dispatch = useDispatch();

    const currentCategories = categoriesStack[categoriesStack.length - 1];
    const currentParentCategory = parentCategoryStack[parentCategoryStack.length - 1];

    useEffect(() => {
        if (!categoriesStack.length) {
            fetchCategories();
            fetchProducts(null)
        }
        if (needProducts) {
            fetchProducts(currentParentCategory ? currentParentCategory.id : null)
            setNeedProduct(false)
        }
    }, [categoriesStack.length, needProducts, fetchCategories, fetchProducts, currentParentCategory]);

    return (
        <Page>
            <div
                style={{
                    padding: '0 50px',
                    maxWidth: 1600,
                    width: '100%',
                    margin: '0 auto'
                }}>
                <Row gutter={[16, 16]}>
                    <Col xs={8}>
                        <ConfigProvider renderEmpty={() => null}>

                            <List
                                header={categoriesStack.length > 1 ?
                                    <div
                                        style={{
                                            background: 'white',
                                            width: '100%',
                                            height: 25,
                                            margin: 0,
                                            padding: 0,
                                            fontWeight: 'bold'
                                        }}
                                        onClick={() => {
                                            removeParentCategory()(dispatch)
                                                .then(() => setNeedProduct(true))
                                            removeCategories()
                                        }}>
                                        <GrFormPrevious
                                            style={{
                                                verticalAlign: 'bottom',
                                                fontSize: 20
                                            }}
                                        />
                                        {currentParentCategory.name}
                                    </div>
                                    : null}
                                bordered
                                itemLayout="horizontal"
                                dataSource={currentCategories}
                                renderItem={item => (
                                    <List.Item onClick={() => {
                                        console.log(item)
                                        addParentCategory(item)(dispatch).then(() =>
                                            fetchProducts(categoriesStack.length > 0 ? item.id : null))
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
                                style={{ backgroundColor: 'white' }} />
                        </ConfigProvider>
                    </Col>
                    <Col xs={16}>
                        <ConfigProvider renderEmpty={() => <Nothing description={'Brak produktów'} />}>
                            <List
                                dataSource={products}
                                renderItem={item => (
                                    <List.Item>
                                        <Row gutter={[16, 16]} type='flex' style={{ width: '100%' }}>
                                            <Col xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img style={{ width: '100%' }}
                                                    src={`data:image/jpeg;base64, ${item.img}`}
                                                    alt='Brak'
                                                    onClick={e => {

                                                    }}
                                                />
                                            </Col>
                                            <Col xs={16}>
                                                <div style={{ width: '100%' }}>
                                                    <h3>{item.name}</h3>
                                                    <p style={{ color: 'gray' }}>{item.description}</p>
                                                    <p style={{
                                                        margin: 0,
                                                        color: 'black',
                                                        fontSize: 24,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {formatAsCurrency(item.price)}
                                                    </p>

                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: 0
                                                    }}>
                                                        <div style={{
                                                            textAlign: 'right',
                                                            fontSize: 12
                                                        }}>
                                                            <Button style={{
                                                                backgroundImage: 'linear-gradient(225deg, #45e9a9, #1da669)',
                                                                border: 0,
                                                                color: 'white',
                                                                width: 45,
                                                                height: 45
                                                            }}
                                                                shape='circle'
                                                                icon={<MdShoppingBasket style={{ verticalAlign: '-0.125em', fontSize: 24 }} />}
                                                                onClick={() => {

                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </ConfigProvider>
                    </Col>
                </Row>
            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
    products: state.data.products,
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

export default connect(mapStateToProps, mapDispatchToProps)(Rental);