import React, { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Purchase from './Purchase';
import moment from 'moment';
const Store = window.require('electron-store');

export const db = new Store();
interface DateSpendMap { date: string, "Daily Spend": number }

const purchases: Purchase[] = db.get('purchases');
console.log('purchases', purchases);


/** Takes in past date and returns summed purchase total from past date through today */
const calculateDailySpend = (date: Date) => {
    const dateList: DateSpendMap[] = [];
    let trackedDate = moment(date);
    trackedDate = moment(trackedDate).add(1, 'days');
    while (trackedDate <= moment()) {
        let dateSum = 0;
        purchases.map((purchase) => {

            if (moment(purchase.purchaseDate).format('MM/DD/YYYY') === trackedDate.format('MM/DD/YYYY')) {
                if (purchase.cost) {
                    console.log('test')
                    dateSum = dateSum + eval(purchase.cost)
                }
            }
        })
        dateList.push({ date: trackedDate.format('MM/DD/YY'), "Daily Spend": dateSum })
        trackedDate = moment(trackedDate).add(1, 'days')
    }
    db.set('daily-spend', dateList);
    return (dateList);
}

const dailySpendLast31 = () => {
 const oneMonthAgo = moment().subtract(31, 'days');
 const dateList = db.get("daily-spend")
}

const calculateMonthlySpend = (date: Date) => {
 const dailySpend = calculateDailySpend(date);
}

export const LineGraph = () => {
    const data = calculateDailySpend(new Date("9/1/2020"))
    return (
        <ResponsiveContainer width="100%" minHeight="10rem">
            <LineChart

                data={data}
            >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis stroke="white" dataKey="date" />
                <YAxis stroke="white" />
                <Tooltip formatter={(value, name) => (name === "Daily Spend") ? `$${value.toFixed(2)}` : value.toLocaleString()} contentStyle={{ backgroundColor: "black" }} />
                <Legend />
                <Line type="monotone" dataKey="Daily Spend" activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}