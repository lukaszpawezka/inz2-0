import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
import { withAuth } from '../components/Auth';
import Page from '../components/Page';
import { Button, Input } from 'antd';
import { Link } from "react-router-dom";

const User = ({ user }) => {

    return (
        <Page>
            <div style={{
                marginTop: 30,
                textAlign: 'center'
            }}>
                <h1><b>Twój profil:</b></h1>
            </div>
            <div style={{
                marginTop: 30,
                textAlign: 'center'
            }}>
                <Input defaultValue={user.details.fullName}></Input>
                <Input defaultValue={user.details.pesel}></Input>
                <Input defaultValue={user.details.adress}></Input>
                <Input defaultValue={user.details.city}></Input>
                <Input defaultValue={user.details.mail}></Input>

            </div>
            <div style={{
                marginTop: 40,
                marginBottom: 40
            }}>
                <Input defaultValue={user.details.name}></Input>
                <Input.Password defaultValue={user.details.name} />
            </div>
            <div style={{
                textAlign: 'center'
            }}>

                <Button  shape="round"
                    style={{
                        width: 400,
                        height: 70,
                        fontSize: 30,
                        marginTop: 10
                    }}
                    onClick={() => {
                    }}>
                    <Link to="/rental">Powrót</Link>
                </Button>
                <Button type="primary" shape="round"
                    style={{
                        width: 400,
                        height: 70,
                        fontSize: 30,
                        marginTop: 10
                    }}
                    onClick={() => {
                    }}>
                    <Link to="/rental">Dodaj produkt</Link>
                </Button>
            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(User));
