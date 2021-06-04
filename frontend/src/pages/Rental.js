import { Button, Col, ConfigProvider, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { formatAsCurrency } from '../utils/utils';
import { MdShoppingBasket } from 'react-icons/md';
import Page from '../components/Page';
import { fetchProducts } from '../ducks/data';
import Nothing from '../components/Nothing';

const Rental = ({products, fetchProducts}) => {

    useEffect(() => {
        if (!products.length) {
            fetchProducts();
        }
    }, []);

    return (
        <Page>
            <ConfigProvider renderEmpty={() => <Nothing description={'Brak produktów'} />}>
                <List
                    dataSource={products}
                    renderItem={item => (
                        <List.Item>
                            <Row gutter={[16, 16]} type='flex' style={{ width: '100%' }}>
                                <Col xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img style={{ width: '100%' }}
                                        src={`data:image/jpeg;base64, ${item.img}`}

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
        </Page>
    )
}

const mapStateToProps = state => ({
    products: state.data.products
});

const mapDispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);