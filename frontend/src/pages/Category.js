import { Button, Input, message, Cascader } from 'antd';
import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { withAuth } from '../components/Auth';
import Page from '../components/Page';

  const success = () => {
    message.success({
        content: 'Produkt został pomyślnie dodany',
        className: 'custom-class',
        style: {
            marginTop: '80vh',
        },
    });
};

const options = [
    {
      value: 'Sporty drużynowe',
      label: 'Sporty drużynowe',
      children: [
      ],
    },
    {
      value: 'Rowery i części',
      label: 'Rowery i części',
    },
    {
        value: 'Siłownia i fitness',
        label: 'Siłownia i fitness',
    },
  ];
const Category = () => {

    return (
        <Page>
            <div style={{
                marginTasvcasop: 30,
                textAlign: 'center'
            }}>
                <h1><b>Dodawanie nowej kategorii:</b></h1>
            </div>
            <div style={{
                marginTop: 30,
                textAlign: 'center'
            }}>
                <h2>Nazwa:</h2>
                <Input placeholder="Nazwa:"></Input>
                <h2>Opcjonalny rodzic:</h2>
                <Cascader placeholder="Wskaż kategorie:" options={options} style={{width: '100%'}} />
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
                        success()
                    }}>
                    <Link to="/rental">Zapisz</Link>
                </Button>
            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Category));
