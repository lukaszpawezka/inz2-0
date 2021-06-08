import React from 'react'
import Page from '../components/Page'
import { withAuth } from '../components/Auth';


const About = () => {
    return (
        <Page>
            About
        </Page>
    )
}

export default withAuth(About);
