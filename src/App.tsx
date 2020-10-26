import React, { useEffect, useState } from 'react';
import './sass/App.scss';
import PurchaseForm from './components/PurchaseForm';
import PurchaseList from './components/PurchaseList';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import Charts from './components/Charts';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SidePanel from './components/SidePanel';
const Store = window.require('electron-store');

const defaultCategories = [
  "Gas",
  "Utilities",
  "Groceries",
  "Home Goods",
  "Pet Supplies",
  "Travel",
  "Rent",
  "Insurance",
  "Personal Spending",
  "Restaurants",
  "Other Bills",
  "Medical",
  "Misc.",
]
const defaults = {
  purchases: [],
  purchasers: [],
  categories: defaultCategories,
  dashboards: {
    dashboard: {}
  }
}
export const db = new Store({ defaults });

export default function App() {
  let path = localStorage.getItem("path");

  if(!path) {
    path = "/form"
  }

  const [isOpen, setIsOpen] = useState(false);
  const [displayTheme, setDisplayTheme] = useState<string>("dark-theme");

  return (
    <div className="charts">
      <div className={displayTheme}>
        <div className="app-container">
          <MemoryRouter initialEntries={[path]}>
            <NavBar />
            <div id="menu-outer-container">
              <SidePanel isOpen={isOpen} />
              <main id="page-wrapper">
                <Button onClick={() => setIsOpen((prev) => !prev)}>Open</Button>
                <div className="container-fluid">
                  <Switch>
                    <Route path="/form" exact component={PurchaseForm} />
                    <Route path="/list" component={PurchaseList} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/charts" component={Charts} />
                  </Switch>
                </div>

              </main>
            </div>
          </MemoryRouter>
        </div>
      </div>
    </div>
  );
}

