import { Button, Col, ConfigProvider, List, Row, message } from 'antd';
import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { withAuth } from '../components/Auth';
import Nothing from '../components/Nothing';
import Page from '../components/Page';
import { clearCart, createOrders, removeCartItem } from '../ducks/data';


const Cart = ({ myOrders, createOrders, clearCart, removeCartItem }) => {

    const roundAccurately = (number, decimalPlaces) =>
        Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)

    const fullCartPrice = () => {
        let fullPrice = 0
        myOrders.forEach(order => {
            fullPrice += order.price
        })
        return roundAccurately(fullPrice, 2)
    }
    const success = () => {
        message.success({
          content: 'Zamówienie zostało złożone',
          className: 'custom-class',
          style: {
            marginTop: '80vh',
          },
        });
      };

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
                        marginTop: 20
                    }}
                    dataSource={myOrders}
                    renderItem={item => (
                        <List.Item>
                            <Row gutter={[16, 16]} type='flex' style={{ width: '100%', maxHeight: 200 }}>
                                <Col xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img style={{ width: 200, height: 200, objectFit: 'contain' }}
                                        src={`data:image/jpeg;base64, ${item.product.img}`}
                                        alt='Brak'
                                    />
                                </Col>
                                <Col xs={12}>
                                    <div style={{ width: '100%' }}>
                                        <h1> {item.product.name} </h1>
                                        <h2>Data od: {item.dateFrom}</h2>
                                        <h2>Data do: {item.dateTo}</h2>
                                        <h2>Cena: {item.price} zł</h2>
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        top: 55,
                                        right: 0
                                    }}>
                                        <div style={{
                                            textAlign: 'right',
                                            fontSize: 12
                                        }}>
                                            <Button style={{
                                                backgroundImage: 'linear-gradient(225deg, #ba1818, #e84f4d)',
                                                border: 0,
                                                color: 'white',
                                                width: 45,
                                                height: 45
                                            }}
                                                shape='circle'
                                                icon={<MdDelete style={{ verticalAlign: '-0.125em', fontSize: 24 }} />}
                                                onClick={() => {
                                                    removeCartItem(item);
                                                }}
                                            />
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />

            </ConfigProvider>
            <div style={{
                textAlign: 'center',
                paddingTop: 20
            }}>
                {!myOrders.length ?

                    <Button type="primary" shape="round"
                        style={{
                            width: 400,
                            height: 70,
                            fontSize: 30,
                            marginTop: 50
                        }}>
                        <Link to="/rental">Przeglądaj produkty</Link>
                    </Button>
                    :
                    <div>
                        <div>
                            <h1>Suma: <b>{fullCartPrice()}</b> zł</h1>
                        </div>
                        <Button type="primary" shape="round"
                            style={{
                                width: 400,
                                height: 70,
                                fontSize: 30,
                                marginTop: 10
                            }}
                            onClick={() => {
                                createOrders(myOrders)
                                clearCart()
                                success()
                            }}>
                            <Link to="/rental">Złóż zamówienie</Link>
                        </Button>
                    </div>
                }

            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
    myOrders: state.data.myOrders
});

const mapDispatchToProps = {
    createOrders,
    clearCart,
    removeCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Cart));
