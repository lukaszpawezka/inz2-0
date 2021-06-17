import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Button, Col, Comment, ConfigProvider, Input, List, message, Modal, Row, Tooltip } from 'antd';
import { eachDayOfInterval } from 'date-fns';
import { pl } from 'date-fns/locale';
import React, { createElement, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaComment } from 'react-icons/fa';
import { GrFormPrevious } from 'react-icons/gr';
import { MdShoppingBasket } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Nothing from '../components/Nothing';
import Page from '../components/Page';
import { addCategories, addComment, addOrder, addParentCategory, fetchCategories, fetchComments, fetchOrders, fetchProducts, removeCategories, removeParentCategory } from '../ducks/data';
import { formatAsCurrency } from '../utils/utils';

const Rental = ({ products, categoriesStack, parentCategoryStack, fetchCategories, addCategories, removeCategories, fetchProducts, orders, fetchOrders, addOrder, user, comments, fetchComments, addComment }) => {
    const [showProducts, setShowProduct] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [product, setProduct] = useState(null);
    const [commentVisible, setCommentsVisible] = useState(false);
    const dispatch = useDispatch();

    const { TextArea } = Input;

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

    const daysBetween = (date1, date2) =>
        Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

    const roundAccurately = (number, decimalPlaces) =>
        Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)

    const fullPrice = product ? roundAccurately(product.price * (daysBetween(canlendarState[0].startDate, canlendarState[0].endDate) + 1), 2) : null

    const success = () => {
        message.success({
            content: 'Produkt został dodany do koszyka',
            className: 'custom-class',
            style: {
                marginTop: '80vh',
            },
        });
    };


    const loginInfo = () => {
        message.info({
            content: 'Musisz się zalogować',
            className: 'custom-class',
            style: {
                marginTop: '80vh',
            },
        });
    };


    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [commentValue, setCommentValue] = useState('');

    const onCommentSubmit = (item) => {

        if (!commentValue) {
            return
        }
        const comment = {
            userId: user.details.id,
            message: commentValue,
            productId: item.id,
            commentDate: new Date().toISOString().substring(0, 10)
        }
        console.log('dupa', comment)
        addComment(comment)
        setCommentValue('')
    };

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];
    return (
        <Page>
            <div
                style={{
                    padding: '0 50px',
                    marginBottom: 40,
                    width: '100%',
                }}>

                {showCalendar ?
                    <div>
                        <div style={{
                            textAlign: 'center',
                            marginTop: 50,

                        }}>
                            <h1>Wskaż datę rezerwacji dla produktu: </h1>
                            <h1><b>{product.name}</b></h1>
                            <h1>Cena wynajmu: <b>{product.price}</b> zł/dzień</h1>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            marginTop: 50
                        }}>
                            <DateRange
                                style={{
                                    textAlign: 'center',
                                    width: 700
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

                        </div>
                        <div style={{
                            textAlign: 'center',
                            marginTop: 50
                        }}>
                            <h1>Suma: <b>{fullPrice}</b> zł</h1>
                        </div>
                        <div style={{
                            textAlign: 'center',
                        }}>
                            <Button shape="round"
                                onClick={() => {
                                    setShowCalendar(false)
                                }}
                                style={{
                                    width: 400,
                                    height: 70,
                                    fontSize: 30,
                                    marginTop: 50
                                }}>
                                <Link to="/rental">Powrót</Link>
                            </Button>
                            <Button style={{
                                width: 400,
                                height: 70,
                                fontSize: 30,
                                marginTop: 50,
                            }}
                                type="primary" shape="round"
                                disabled={isInArray(disabledDates, canlendarState[0].startDate)}
                                onClick={() => {
                                    const order = {
                                        userId: user.details.id,
                                        productId: product.id,
                                        product: product,
                                        daysBetween: daysBetween(canlendarState[0].startDate, canlendarState[0].endDate),
                                        price: fullPrice,
                                        dateFrom: canlendarState[0].startDate.toISOString().substring(0, 10),
                                        dateTo: canlendarState[0].endDate.toISOString().substring(0, 10),
                                        orderDate: new Date().toISOString().substring(0, 10)
                                    }
                                    addOrder(order)
                                    setShowCalendar(false)
                                    success()
                                }}>
                                Dodaj do koszyka
                            </Button>
                        </div>
                    </div>
                    :
                    <Row gutter={[16, 16]}>
                        <Col xs={5}>
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
                                        marginTop: 12,
                                        minHeight: '17vh'
                                    }} />
                            </ConfigProvider>
                        </Col>
                        <Col xs={16}>
                            <ConfigProvider renderEmpty={() =>
                                <div style={{
                                    marginTop: 100
                                }}>
                                    <Nothing description={'Brak produktów'} />
                                </div>}>
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
                                                            top: 45,
                                                            right: -100
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
                                                                        user.details ?
                                                                            fetchOrders(item.id).then(() => {
                                                                                setProduct(item)
                                                                                setShowCalendar(true)
                                                                            })
                                                                            :
                                                                            loginInfo()
                                                                    }}
                                                                />
                                                            </div>
                                                            <div style={{
                                                                textAlign: 'right',
                                                                marginTop: 5,
                                                                fontSize: 12
                                                            }}>
                                                                <Button style={{
                                                                    backgroundImage: 'linear-gradient(225deg, #b0e2ff, #2bb0fc)',
                                                                    border: 0,
                                                                    color: 'white',
                                                                    width: 45,
                                                                    height: 45
                                                                }}
                                                                    shape='circle'
                                                                    icon={<FaComment style={{ verticalAlign: '-0.125em', fontSize: 24 }} />}
                                                                    onClick={() => {
                                                                        if (user.details) {
                                                                            fetchComments(item.id)
                                                                            setCommentsVisible(true)
                                                                        } else
                                                                            loginInfo()
                                                                    }}
                                                                />
                                                            </div>
                                                            <Modal
                                                                centered
                                                                visible={commentVisible}
                                                                onOk={() => setCommentsVisible(false)}
                                                                onCancel={() => setCommentsVisible(false)}
                                                                width={1000}
                                                            >


                                                                <ConfigProvider renderEmpty={() => <Nothing description={'Brak komentarzy'} />}>
                                                                    <List
                                                                        dataSource={comments}
                                                                        pagination={{
                                                                            showSizeChanger: true,
                                                                            pageSizeOptions: ["5", "10", "15", "20"],
                                                                            position: "bottom"
                                                                        }}
                                                                        renderItem={commentItem => (
                                                                            <List.Item>
                                                                                <Comment
                                                                                    actions={actions}
                                                                                    author={commentItem.user.fullName}
                                                                                    content={
                                                                                        <p>
                                                                                            {commentItem.message}
                                                                                        </p>
                                                                                    }
                                                                                    datetime={
                                                                                        <Tooltip title={commentItem.commentDate}>
                                                                                            <span>{commentItem.commentDate}</span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                />
                                                                            </List.Item>
                                                                        )}
                                                                    />
                                                                    <div style={{
                                                                        marginTop: 20
                                                                    }}>
                                                                        <TextArea rows={4} onChange={e => setCommentValue(e.target.value)} value={commentValue} />

                                                                        <Button type="primary" onClick={() => {
                                                                            onCommentSubmit(item).then(() => {
                                                                            })
                                                                            fetchComments(item.id)
                                                                        }}>
                                                                            Dodaj komentarz
                                                                    </Button>
                                                                    </div>
                                                                </ConfigProvider>
                                                            </Modal>
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
    order: state.data.order,
    comments: state.data.comments
});

const mapDispatchToProps = {
    fetchCategories,
    addCategories,
    removeCategories,
    fetchProducts,
    addParentCategory,
    removeParentCategory,
    fetchOrders,
    addOrder,
    fetchComments,
    addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);