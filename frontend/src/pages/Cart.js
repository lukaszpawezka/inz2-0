import { Button, ConfigProvider, List } from 'antd';
import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
import { withAuth } from '../components/Auth';
import Nothing from '../components/Nothing';
import Page from '../components/Page';
import { createOrders } from '../ducks/data';

const Cart = ({ myOrders, createOrders }) => {
    return (
        <Page>
            <ConfigProvider renderEmpty={() => <Nothing description={'Brak produktów'} />}>
                <List
                    dataSource={myOrders}
                    renderItem={item => (
                        <List.Item>
                            {item.product.name} | {item.userId} | {item.productId}

                        </List.Item>
                    )}
                />
            </ConfigProvider>
            <Button
                type="primary"
                onClick={() => {
                    createOrders(myOrders)
                }}>
                Złóż zamówienie
                        </Button>
        </Page>
    )
}

const mapStateToProps = state => ({
    myOrders: state.data.myOrders
});

const mapDispatchToProps = {
    createOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Cart));
