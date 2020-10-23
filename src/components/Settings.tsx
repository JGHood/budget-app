import React from 'react';
import { Card } from 'react-bootstrap';
import CogOutlineIcon from 'mdi-react/CogOutlineIcon';
import CreditCardOutlineIcon from 'mdi-react/CreditCardOutlineIcon';
import AccountCircleOutlineIcon from 'mdi-react/AccountCircleOutlineIcon';
import MonitorDashboardIcon from 'mdi-react/MonitorDashboardIcon';

export default function Settings(): JSX.Element {
    return (
        <div className="settings">

            <h1 className=" settings-header text-center"><CogOutlineIcon />Settings</h1>
            <div className="card-container text-center">
                <Card className="settings-card" style={{ width: '25%' }}>
                    <div className="icon-container"><CreditCardOutlineIcon size="4em" className="settings-icon" /></div>
                    <Card.Title className="text-center">
                        Purchase Methods
                </Card.Title>
                    <Card.Body className="text-center">
                        Modify your purchase methods
                </Card.Body>
                </Card>
                <Card className="settings-card" style={{ width: '25%' }}>
                    <div className="icon-container"><AccountCircleOutlineIcon size="4em" className="settings-icon" /></div>
                    <Card.Title className="text-center">
                        Purchasers
                </Card.Title>
                    <Card.Body className="text-center">
                        Add and remove purchasers
                </Card.Body>
                </Card>
                <Card className="settings-card" style={{ width: '25%' }}>
                    <div className="icon-container"><MonitorDashboardIcon size="4em" className="settings-icon" /></div>
                    <Card.Title className="text-center">
                        Theme
                </Card.Title>
                    <Card.Body className="text-center">
                        Change the application's color theme
                </Card.Body>
                </Card>
            </div>
            <div className="card-container-2 text-center">
                <Card className="settings-card" style={{ width: '100%' }}>
                    <div className="icon-container"><MonitorDashboardIcon size="4em" className="settings-icon" /></div>
                    <Card.Title className="text-center">
                        Theme
                </Card.Title>
                    <Card.Body className="text-center">
                        Change the application's color theme
                </Card.Body>
                </Card>
            </div>
        </div>
    )
}