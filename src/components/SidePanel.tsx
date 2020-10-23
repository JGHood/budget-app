import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import { push as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import ViewListOutlineIcon from 'mdi-react/ViewListOutlineIcon';
import CurrencyUsdCircleOutlineIcon from 'mdi-react/CurrencyUsdCircleOutlineIcon';
import CogOutlineIcon from 'mdi-react/CogOutlineIcon';

interface props {
    isOpen: boolean
}
export default function SidePanel(props: props) {

    return (
        <Menu isOpen={props.isOpen} disableAutoFocus noOverlay disableOverlayClick width={'15%'} pageWrapId="page-wrapper" outerContainerId="menu-outer-container">
            <NavLink activeClassName="bm-item-active" className="sidebar-nav-item" to="/form" onClick={()=>localStorage.setItem("path", "/form")}><CurrencyUsdCircleOutlineIcon className="bm-icon" /><span>New Purchases</span> </NavLink>
            <NavLink activeClassName="bm-item-active" to="/list" onClick={()=>localStorage.setItem("path", "/list")}><ViewListOutlineIcon className="bm-icon" />Purchase List </NavLink>
            <NavLink activeClassName="bm-item-active" to="/settings" onClick={()=>localStorage.setItem("path", "/settings")}><CogOutlineIcon className="bm-icon" />Settings </NavLink>
            <NavLink activeClassName="bm-item-active" to="/charts" onClick={()=>localStorage.setItem("path", "/charts")}><CogOutlineIcon className="bm-icon" />Charts </NavLink>
        </Menu>
    )
}
