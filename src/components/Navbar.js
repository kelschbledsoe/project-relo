import React from 'react';
import './Navbar.css';
import { Navbar, Nav, } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AmplifySignOut} from '@aws-amplify/ui-react'


const Navigation = (props) => {
    console.log(props);
    const url = window.location.href;
    if (url.includes("agent"))
    {
    return (
        <Navbar className="color-nav" variant="dark">
            <Navbar.Brand href="/" >Project Relo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/NewRequest">New Request</Nav.Link>
                    <Nav.Link href="/ClientList">Client List</Nav.Link>
                    <Nav.Link href='/AdditionalRequest'>Create Additional Mortgage Request</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <AmplifySignOut></AmplifySignOut>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
    }
    else{
        return(
            <Navbar className="color-nav" variant="dark">
            <Navbar.Brand href="/" >Project Relo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/AddAgent">Add Agent</Nav.Link>
                    <Nav.Link href="/AddCompany">Add Company</Nav.Link>
                    <Nav.Link href="/Search">Search</Nav.Link>
                    <Nav.Link href='/EditAgent'>Edit Agent</Nav.Link>
                    <Nav.Link href='/EditCompany'>Edit Company</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <Nav.Link>{' '}</Nav.Link>
                    <AmplifySignOut></AmplifySignOut>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}

export default withRouter(Navigation);