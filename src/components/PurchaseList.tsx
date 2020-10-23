import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { dateFilter, textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import Purchase from './Purchase';
import EmoticonFrownIcon from 'mdi-react/EmoticonFrownIcon';
import EmoticonSadIcon from 'mdi-react/EmoticonSadIcon';
import EmoticonNeutralIcon from 'mdi-react/EmoticonNeutralIcon';
import EmoticonHappyIcon from 'mdi-react/EmoticonHappyIcon';
import EmoticonExcitedIcon from 'mdi-react/EmoticonExcitedIcon';
const Store = window.require('electron-store');

export default function PurchaseList(): JSX.Element {

    const [showPurchaseDate, setShowPurchaseDate] = useState(true);
    const [showCost, setShowCost] = useState(true);
    const [showVendor, setShowVendor] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [showCategory, setShowCategory] = useState(true);
    const [showSubcategory, setShowSubcategory] = useState(false);
    const [showPurchaseMethod, setShowPurchaseMethod] = useState(false);
    const [showPurchaseHappiness, setShowPurchaseHappiness] = useState(false);
    const [showPurchaser, setShowPurchaser] = useState(false);
    const [showFilters, setShowFilters] = useState(false);



    const db = new Store();
    var purchases: Purchase[] = db.get('purchases');

    const showTextFilters = () => {
        if (showFilters) {
            return textFilter()
        } else return null;
    }

    const showNumberFilters = () => {
        if (showFilters) {
            //@ts-ignore
            return numberFilter()
        } else return null;
    }

    const showDateFilters = () => {
        if (showFilters) {
            //@ts-ignore
            return dateFilter()
        } else return null;
    }

    const dateFormatter = (cell: any) => {
        return (<div>{moment(cell).format("MM/DD/YYYY").toString()}</div>)
    }
    const costFormatter = (cell: any) => {
        return (<div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cell)}</div>)
    }

    const satisfactionFormatter = (cell: any) => {
        if (cell <= 20) { return <EmoticonFrownIcon color="#b30000" /> }
        if (cell >= 21 && cell <= 40) { return <EmoticonSadIcon color="#ff6666" /> }
        if (cell >= 41 && cell <= 60) { return <EmoticonNeutralIcon color="#ffcc33" /> }
        if (cell >= 61 && cell <= 80) { return <EmoticonHappyIcon color="#99e699" /> }
        if (cell >= 81 && cell <= 100) { return <EmoticonExcitedIcon color="#00cc66" /> }
    }
    const { SearchBar, ClearSearchButton } = Search;
    const defaultSorted = [{
        dataField: 'purchaseDate',
        order: 'desc',
    }];
    const columns = [{
        dataField: 'purchaseDate',
        text: 'Purchase Date',
        sort: true,
        hidden: !showPurchaseDate,
        formatter: dateFormatter,
        filter: showDateFilters()

    }, {
        dataField: 'cost',
        text: 'Cost',
        sort: true,
        hidden: !showCost,
        formatter: costFormatter,
        filter: showNumberFilters()
    }, {
        dataField: 'category',
        text: 'Category',
        hidden: !showCategory,
        sort: true,
        filter: showTextFilters()
    }, {
        dataField: 'vendor',
        text: 'Vendor',
        hidden: !showVendor,
        sort: true,
        filter: showTextFilters()
    }, {
        dataField: 'subcategory',
        text: 'Subcategory',
        hidden: !showSubcategory,
        sort: true,
        filter: showTextFilters()
    }, {
        dataField: 'purchaseMethod',
        text: 'Purchase Method',
        hidden: !showPurchaseMethod,
        sort: true,
        filter: showTextFilters()
    }, {
        dataField: 'purchaser',
        text: 'Purchaser',
        hidden: !showPurchaser,
        sort: true,
        filter: showTextFilters()
    }, {
        dataField: 'description',
        text: 'Description',
        hidden: !showDescription,
        sort: true,
        filter: showTextFilters()
    }, {
        dataField: 'purchaseHappiness',
        text: 'Satisfaction',
        sort: true,
        hidden: !showPurchaseHappiness,
        align: 'center',
        formatter: satisfactionFormatter,

    }
    ];

    const sizePerPageOptionRenderer = ({

        text, page, onSizePerPageChange
    }) => (
            <li
                key={text}
                role="presentation"
                className="dropdown-item"
            >
                <a
                    href="#"
                    role="menuitem"
                    data-page={page}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        onSizePerPageChange(page);
                    }}
                >
                    {text}
                </a>
            </li>
        );

    const options = {
        sizePerPageOptionRenderer
    };

    return (
        <div className="purchase-list">
            <ToolkitProvider
                keyField="id"
                data={purchases}
                // @ts-ignore
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <div className="row purchase-filters">
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <ClearSearchButton className="clear" {...props.searchProps} />
                                </div>
                                <Form.Switch className="filter-toggle" id={Math.random().toString()} checked={showFilters} onChange={() => setShowFilters(prev => !prev)} label="Show filters" />
                                <Accordion>
                                    <Accordion.Toggle as={Button} eventKey="0">
                                        Toggle Columns
                                </Accordion.Toggle>
                                    <Accordion.Collapse className="toggle-columns" eventKey="0">
                                        <div className="row">
                                            <div className="col">
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showPurchaseDate} onChange={() => setShowPurchaseDate(prev => !prev)} label="Date" />
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showCost} onChange={() => setShowCost(prev => !prev)} label="Cost" />
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showCategory} onChange={() => setShowCategory(prev => !prev)} label="Category" />
                                            </div>
                                            <div className="col">
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showVendor} onChange={() => setShowVendor(prev => !prev)} label="Vendor" />
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showSubcategory} onChange={() => setShowSubcategory(prev => !prev)} label="Subcategory" />
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showPurchaseMethod} onChange={() => setShowPurchaseMethod(prev => !prev)} label="Method" />
                                            </div>
                                            <div className="col">
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showPurchaser} onChange={() => setShowPurchaser(prev => !prev)} label="Purchaser" />
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showDescription} onChange={() => setShowDescription(prev => !prev)} label="Description" />
                                                <Form.Switch className="column-toggles" id={Math.random().toString()} checked={showPurchaseHappiness} onChange={() => setShowPurchaseHappiness(prev => !prev)} label="Satisfaction" />
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <hr />
                            </div>
                            <BootstrapTable
                                parentClassName="table"
                                pagination={paginationFactory(options)}
                                filter={filterFactory()}
                                filterPosition="top"
                                defaultSortDirection="desc"
                                {...props.baseProps}
                            /> 
                        </div>
                    )
                }
            </ToolkitProvider> 
        </div>
    )
}