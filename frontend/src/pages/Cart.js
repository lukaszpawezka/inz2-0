import React from 'react'
import Page from '../components/Page'
import { withAuth } from '../components/Auth';

const Cart = () => {
    return (
        <Page>
            Koszyk zamówień
        </Page>
    )
}

export default withAuth(Cart);
