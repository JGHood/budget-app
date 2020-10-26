import moment from 'moment';
import React, { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Purchase from './Purchase';
const Store = window.require('electron-store');

export const db = new Store();

interface DateTotals { [key: string]: number };

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];


const purchases: Purchase[] = db.get('purchases');
console.log('purchases', purchases);

/** Takes in past date and returns summed purchase total from past date through today */
const dailySum = (date: Date) => {
    let trackedDate = moment(date);
    const dateList: DateTotals = [];
    while (trackedDate <= moment()) {
        dateList[trackedDate.format('MM/DD/YYYY')] = 0;
        trackedDate = moment(trackedDate).add(1, 'days')

    }

    
    let index = 0
    Object.entries(dateList).map(([key, value]) => {
        let dateSum = 0;
        purchases.map((purchase) => {

            if (moment(purchase.purchaseDate).format('MM/DD/YYYY') === key) {
                if(purchase.cost) {
                    dateSum = dateSum + eval(purchase.cost)
                }
                console.log(dateSum);
            }
        })
        dateList[key] = dateSum;
    }

    )


}

export const LineGraph = () => {
    useEffect(() => {
        dailySum(new Date("10/1/2020"));
    })
    return (
        <ResponsiveContainer width="100%" minHeight="10rem">
            <LineChart

                data={data}
            >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis stroke="white" dataKey="name" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}