import React from 'react';
import './Navbar.css';
import { Navbar, Nav, } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
    console.log(props);
    return (
        <Navbar className="color-nav" variant="dark">
            <Navbar.Brand href="/" >Project Relo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">Admin:</Nav.Link>
                    <Nav.Link href="/AddAgent">Add Agent</Nav.Link>
                    <Nav.Link href="/AddCompany">Add Company</Nav.Link>
                    <Nav.Link href="/AgentDetail">Agent Detail</Nav.Link>
                    <Nav.Link href="/Search">Search</Nav.Link>
                    <Nav.Link href="/AdminCompanyDetail">Company Detail (Admin)</Nav.Link>
                    <Nav.Link href="/">{""}</Nav.Link>
                    <Nav.Link href="/">{""}</Nav.Link>
                    <Nav.Link href="/">{""}</Nav.Link>

                    <Nav.Link href="/Home-Agent">Agent:</Nav.Link>
                    <Nav.Link href="/NewRequest">New Request</Nav.Link>
                    <Nav.Link href="/ClientList">Client List</Nav.Link>
                    <Nav.Link href="/ClientDetail">Client Detail</Nav.Link>
                    <Nav.Link href="/CompanyDetail">Company Detail (Agent)</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);