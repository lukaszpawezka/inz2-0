import React from 'react'
import Page from '../components/Page'
import { Button } from 'antd';
import { Link } from "react-router-dom";
import homeBg from '../images/hero-bg-min.jpg';


const Home = () => {
    return (
        <Page contentStyle={{
            backgroundImage: `url(${homeBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            textAlign: 'center',
            height: '100vh',
            maxWidth: '100%'
        }}>
            <div>
                <h1 style={{
                    margin: 'auto',
                    padding: '50px 0',
                    color: 'white',
                    fontSize: '200px',
                    fontFamily: 'Impact',
                    textShadow: '0 0 30px #454545'
                }}>SportApp</h1>
                <Button type="primary" shape="round"
                    style={{
                        width: 400,
                        height: 70,
                        fontSize: 30,
                        marginTop: 50
                    }}>
                    <Link to="/rental">Przeglądaj produkty</Link>
                </Button>
            </div>
        </Page>
    )
}

export default Home
