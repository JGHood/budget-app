import React, { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import PlusIcon from 'mdi-react/PlusIcon';
import PurchaseForm from './PurchaseForm';
import { NavLink } from 'react-router-dom';

export default function NavBar(): JSX.Element {

    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <Navbar className="navbar" expand="lg">
                <Navbar.Brand>Budget</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="tabs" className="mr-auto">
                        <NavLink activeClassName="navbar-navlink-item-active" className="navbar-navlink-item" to="/form" onClick={() => localStorage.setItem("path", "/form")}>Submit Purchases</NavLink>
                        <NavLink activeClassName="navbar-navlink-item-active" className="navbar-navlink-item" to="/list" onClick={() => localStorage.setItem("path", "/list")}>Purchase List</NavLink>
                    </Nav>
                    <Button className="navbar-btn justify-content-end" onClick={() => setShowModal(true)}><PlusIcon className="plus-icon"/></Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal contentClassName="navbar-modal" centered onHide={() => { setShowModal(false); }} show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PurchaseForm />
                </Modal.Body>
            </Modal>
        </>
    )
}