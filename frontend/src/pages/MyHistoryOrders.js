import { Button, Col, ConfigProvider, List, Row } from 'antd';
import React, { useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { withAuth } from '../components/Auth';
import Nothing from '../components/Nothing';
import Page from '../components/Page';
import { fetchOrders } from '../ducks/data';


const MyHistoryOrders = ({ orders, fetchOrders }) => {

    useEffect(() => {
        fetchOrders(null, true)
    }, [fetchOrders]);

    return (
        <Page>
            <ConfigProvider renderEmpty={() =>
                <div style={{
                    marginTop: 300,
                    marginBottom: 40,
                }}>
                    <Nothing description={'Brak produktów'} />
                </div>}>
                <List
                    style={{
                        marginTop: 30
                    }}
                    dataSource={orders}
                    renderItem={item => (
                        <List.Item>
                            <Row type='flex' style={{ width: '100%', maxHeight: 200 }}>
                                <Col xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img style={{ width: 150, height: 150, objectFit: 'contain' }}
                                        src={`data:image/jpeg;base64, ${item.product.img}`}
                                        alt='Brak'
                                    />
                                </Col>
                               
                                <Col xs={6}>
                                    <div style={{ width: '100%' }}>
                                        <h3> <b>{item.product.name}</b> </h3>
                                        <h3><b>Cena wypożyczenia:</b> {item.price} zł</h3>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div style={{ width: '100%' }}>
                                        <h3><b>Od:</b> {item.dateFrom}</h3>
                                        <h3><b> Do:</b> {item.dateTo}</h3>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div style={{ width: '100%' }}>
                                        <h3><b>Data zamówienia:</b> {item.orderDate}</h3>
                                    </div>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
                <div style={{textAlign: 'center'}}>
                <Button type="primary" shape="round"
                    style={{
                        width: 400,
                        height: 70,
                        fontSize: 30,
                        marginTop: 30
                    }}>
                    <Link to="/rental">Przeglądaj produkty</Link>
                </Button>
                </div>

            </ConfigProvider>
            <div style={{
                textAlign: 'center',
                paddingTop: 20
            }}>
            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
    orders: state.data.orders
});

const mapDispatchToProps = {
    fetchOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(MyHistoryOrders));
