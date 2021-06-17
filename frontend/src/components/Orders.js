import { Col, ConfigProvider, List, Row, DatePicker } from 'antd';
import React, { useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
import { fetchOrders } from '../ducks/data';
import { withAuth } from './Auth';
import Nothing from './Nothing';
import Page from './Page';


const Orders = ({ orders, fetchOrders }) => {

    const { RangePicker } = DatePicker;

    useEffect(() => {
        fetchOrders()
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
                <div style={{
                    marginTop: 30,
                    textAlign: 'center'
                }}>
                    <h2>Okres czasowy wyszukiwania zamówień: </h2>
                    <RangePicker style={{
                        width: '80%'
                    }}/>
                </div>
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
                                        <h3><b>Klient:</b> {item.user.fullName}</h3>
                                    </div>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
                <div style={{textAlign: 'center'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Orders));
