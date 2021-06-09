import { Button, Col, ConfigProvider, List, Row } from 'antd';
import { eachDayOfInterval } from 'date-fns';
import { pl } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { GrFormPrevious } from 'react-icons/gr';
import { MdShoppingBasket } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import Nothing from '../components/Nothing';
import Page from '../components/Page';
import { addCategories, addOrder, addParentCategory, fetchCategories, fetchOrders, fetchProducts, removeCategories, removeParentCategory } from '../ducks/data';
import { formatAsCurrency } from '../utils/utils';

const Rental = ({ products, categoriesStack, parentCategoryStack, fetchCategories, addCategories, removeCategories, fetchProducts, orders, fetchOrders, addOrder, user }) => {
    const [showProducts, setShowProduct] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [canlendarState, setCanlendarState] = useState([{
        startDate: today,
        endDate: today,
        key: 'selection',
    }]);

    const currentCategories = categoriesStack[categoriesStack.length - 1];
    const currentParentCategory = parentCategoryStack[parentCategoryStack.length - 1];

    useEffect(() => {
        if (!categoriesStack.length) {
            fetchCategories();
            fetchProducts(null)
        }
        if (showProducts) {
            fetchProducts(currentParentCategory ? currentParentCategory.id : null)
            setShowProduct(false)
        }
    }, [categoriesStack.length, showProducts, fetchCategories, fetchProducts, currentParentCategory]);

    const getDisabledDates = () => {
        let disableDates = []
        orders.forEach(order => {
            disableDates = disableDates.concat(eachDayOfInterval({ start: new Date(order.dateFrom), end: new Date(order.dateTo) }))
        })
        return disableDates
    }
    const disabledDates = getDisabledDates();

    const isInArray = (array, value) =>
        !!array.find(item => item.getTime() === value.getTime());

    return (
        <Page>
            <div
                style={{
                    padding: '0 50px',
                    width: '100%',
                }}>

                {showCalendar ?
                    <div style={{
                        textAlign: 'center',
                        marginTop: 16
                    }}>
                        <DateRangePicker
                            style={{
                                textAlign: 'center'
                            }}
                            onChange={item => setCanlendarState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={canlendarState}
                            direction="horizontal"
                            disabledDates={disabledDates}
                            locale={pl}
                        />
                        <Button
                            type="primary"
                            disabled={isInArray(disabledDates, canlendarState[0].startDate)}
                            onClick={() => {
                                const order = {
                                    userId: user.details.id,
                                    productId: product.id,
                                    product: product,
                                    dateFrom: canlendarState[0].startDate.toISOString().substring(0, 10),
                                    dateTo: canlendarState[0].endDate.toISOString().substring(0, 10)
                                }
                                //console.log(order)
                                addOrder(order)
                                setShowCalendar(false)
                            }}>
                            Dodaj do koszyka
                        </Button>
                    </div>
                    :
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
                                                    .then(() => setShowProduct(true))
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
                                    style={{
                                        backgroundColor: 'white',
                                        marginTop: 12
                                    }} />
                            </ConfigProvider>
                        </Col>
                        <Col xs={16}>
                            <ConfigProvider renderEmpty={() => <Nothing description={'Brak produktów'} />}>
                                <List
                                    dataSource={products}
                                    pagination={{
                                        showSizeChanger: true,
                                        pageSizeOptions: ["5", "10", "15", "20"],
                                        position: "bottom"
                                    }}
                                    renderItem={item => (
                                        <List.Item>
                                            <Row gutter={[16, 16]} type='flex' style={{ width: '100%', maxHeight: 200 }}>
                                                <Col xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }}
                                                        src={`data:image/jpeg;base64, ${item.img}`}
                                                        alt='Brak'
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
                                                                        fetchOrders(item.id).then(() => {
                                                                            setProduct(item)
                                                                            setShowCalendar(true)
                                                                        })
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
                }
            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    products: state.data.products,
    categoriesStack: state.data.categoriesStack,
    parentCategoryStack: state.data.parentCategoryStack,
    orders: state.data.orders,
    order: state.data.order
});

const mapDispatchToProps = {
    fetchCategories,
    addCategories,
    removeCategories,
    fetchProducts,
    addParentCategory,
    removeParentCategory,
    fetchOrders,
    addOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);