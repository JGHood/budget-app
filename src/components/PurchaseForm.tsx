import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Purchase from './Purchase';
import { db } from '../App';
import { v4 as uuidv4 } from 'uuid';

const Store = window.require('electron-store');

export default function PurchaseForm(): JSX.Element {
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [cost, setCost] = useState<any>();
    const [description, setDescription] = useState<string>();
    const [vendor, setVendor] = useState<string>();
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [category, setCategory] = useState<string>();
    const [subcategory, setSubcategory] = useState<string>();
    const [purchaseMethod, setPurchaseMethod] = useState<string>();
    const [purchaseHappiness, setPurchaseHappiness] = useState<any>(50);
    const [purchaser, setPurchaser] = useState<string>();
    var purchases: Purchase[] = db.get('purchases');
    console.log(purchases)
    var categories = db.get('categories');
    let alphabeticalCategories = categories;
    if (categories) {
        alphabeticalCategories = categories.sort((a: string, b: string) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });
    }

    function isNumber(n: any) {
        return !isNaN(n - 0);
    }

    const handleSubmit = (event: any) => {
        setDisableSubmitButton(true);
        setAttemptedSubmit(true);
        if (description && vendor && purchaseDate && category && purchaseMethod && cost && isNumber(cost)) {

            const purchase: Purchase = {
                id: uuidv4(),
                description: description,
                vendor: vendor,
                purchaseDate: purchaseDate,
                cost: cost,
                category: category,
                subcategory: subcategory,
                purchaseMethod: purchaseMethod,
                purchaseHappiness: purchaseHappiness,
                purchaser: purchaser
            }

            if (purchases) {
                db.set('purchases', purchases.concat(purchase)).then(setDisableSubmitButton(false));
                
            }
            else {
                db.set('purchases', [purchase]).then(setDisableSubmitButton(false));
            }
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            setDisableSubmitButton(false);
        }
    }

    return (
        <div className="container purchase-form">
            <Form onSubmit={handleSubmit}>
            <Form.Label className="purchase-form-label">Purchase Description*</Form.Label>
            <Form.Control className="form-item" type="input" isInvalid={attemptedSubmit && !description} isValid={attemptedSubmit && !!description} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a brief description of purchase..." />
            {attemptedSubmit && !description && <div className="form-text-warning">Please provide a brief description of your purchase.</div>}

            <Form.Row>
                <div className="col">
                    <Form.Label className="purchase-form-label">Purchased From*</Form.Label>
                    <Form.Control isInvalid={attemptedSubmit && !vendor} isValid={attemptedSubmit && !!vendor} value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Enter vendor name..." type="input" />
                    {attemptedSubmit && !vendor && <div className="form-text-warning">Please provide the vendor for this purchase.</div>}
                </div>
                <div className="col">
                    <Form.Label className="purchase-form-label">Purchaser</Form.Label>
                    <Form.Control as="select" isValid={attemptedSubmit} value={purchaser} onChange={(e) => setPurchaser(e.target.value)}>
                        <option key='blankChoice' hidden>Select a Purchaser (optional)</option>
                        <option>{null}</option>
                        <option>James Hood</option>
                        <option>Kristen Hood</option>
                    </Form.Control>
                </div>
            </Form.Row>

            <Form.Row>
                <div className="col">
                    <Form.Label className="purchase-form-label">Cost*</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control isInvalid={attemptedSubmit && (!cost || !isNumber(cost))} isValid={attemptedSubmit && !!cost} value={cost} onChange={
                            (e) => setCost(e.target.value)} placeholder="Enter cost..." type="progress" />
                    </InputGroup>
                    {attemptedSubmit && !cost && <div className="form-text-warning">Please enter the cost of this purchase.</div>}
                    {attemptedSubmit && !isNumber(cost) && cost && <div className="form-text-warning">Cost must be a valid number.</div>}
                </div>
                <div className="col date-col">
                    <Form.Label className="purchase-form-label">Date of Purchase*</Form.Label>
                    <Form.Row>
                        <DatePicker
                            //@ts-ignore
                            onChange={(date) => setPurchaseDate(date)}
                            selected={purchaseDate}
                            className="date-picker"
                            calendarClassName="date-picker-calendar"
                        />
                    </Form.Row>
                </div>
            </Form.Row>

            <Form.Row>
                <div className="col">
                    <Form.Label className="purchase-form-label">Category*</Form.Label>
                    <Form.Control as="select" htmlSize={4} isInvalid={attemptedSubmit && !category} isValid={attemptedSubmit && !!category} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option key='blankChoice' hidden>Select a Category</option>
                        {alphabeticalCategories.map((category: string) => { return (<option>{category}</option>) })}
                    </Form.Control>
                    {attemptedSubmit && !category && <div className="form-text-warning">Please select a category.</div>}
                </div>
                <div className="col">
                    <Form.Label className="purchase-form-label">Purchase Method*</Form.Label>
                    <Form.Control htmlSize={4} as="select" isInvalid={attemptedSubmit && !purchaseMethod} isValid={attemptedSubmit && !!purchaseMethod} value={purchaseMethod} onChange={(e) => setPurchaseMethod(e.target.value)}>
                        <option key='blankChoice' hidden>Select a Purchase Method</option>
                        <option>Cash</option>
                        <option>Kristen Discover</option>
                        <option>James Discover</option>
                        <option>American Express</option>
                        <option>Chase Debit Card</option>
                        <option>Other</option>

                    </Form.Control>
                    {attemptedSubmit && !purchaseMethod && <div className="form-text-warning">Please select a purchase method.</div>}
                </div>
            </Form.Row>

            <Form.Label className="purchase-form-label">Subcategory</Form.Label>
            <Form.Control className="form-item" type="input" isValid={attemptedSubmit} value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="Add your own subcategory (optional)..." />

            <Form.Label>Happiness with Purchase</Form.Label>
            <div className="row p-0 m-0">
                <div className="col">0</div>
                <div className="col">1</div>
                <div className="col">2</div>
                <div className="col">3</div>
                <div className="col">4</div>
                <div className="col">5</div>
                <div className="col">6</div>
                <div className="col">7</div>
                <div className="col">8</div>
                <div className="col">9</div>
                <div className="row">
                    <div className="col text-center">10</div>
                </div>
            </div>
            <Form.Control custom type="range" value={purchaseHappiness} onChange={/*@ts-ignore*/
                (e) => setPurchaseHappiness(e.target.value)} />
            <Form.Row>
                <Button type="submit" disabled={disableSubmitButton}>Submit form</Button>
            </Form.Row>

            </Form>

        </div >
    );
}
