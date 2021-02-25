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
                    <Nav.Link href="/Login">Login(Incomplete)</Nav.Link>
                    <Nav.Link href="/NewRequest">New Request</Nav.Link>
                    <Nav.Link href="/ClientList">Client List</Nav.Link>
                    <Nav.Link href="/Search">Search (Admin)</Nav.Link>
                    <Nav.Link href="/AddAgent">Add Agent (Admin)</Nav.Link>
                    <Nav.Link href="/AddCompany">Add Company (Admin)</Nav.Link>
                    <Nav.Link href="/ClientDetail">Client Detail (Agent)</Nav.Link>
                    <Nav.Link href="/CompanyDetail">Company Detail (Agent)</Nav.Link>
                    
                    


                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);